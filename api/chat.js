/**
 * KAROLINE · Haute Mer & Ultra-Luxury Advisory
 * Vercel Serverless Function: AI Concierge (Gemini 2.5 Flash)
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { message, history, lang = 'en' } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message parameter is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  if (!apiKey) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY not configured on serverless environment. Operating in local mode.',
      fallback: true
    });
  }

  const systemPrompt = `You are Karoline AI Executive Concierge, the ultra-luxury private client advisor for KAROLINE Haute Mer & Maritime Advisory.
You represent Carolina ("Karoline"), a senior maritime strategist holding a Master of Science in International Business & Finance from Florida International University (FIU Chapman Graduate School in Miami, FL).
Her signature expertise spans:
1. Mercury Marine high-performance outboard propulsion (Verado V12 600hp multi-engine rigging, OEM yacht builder integrations, and commercial dealer networks in the Americas).
2. Ultra-luxury superyacht market entry (Lürssen, Benetti, Sanlorenzo, Fraser, Burgess) and UHNWI marketing across Monaco, Cannes, and Miami boat shows.
3. Cross-border marine finance, vessel OpEx modeling (the 10% running cost rule), flag state fiscal optimization (Cayman, Malta, Marshall Islands), and charter yield syndication.

TONE & DEMEANOR:
- Highly refined, sophisticated, executive, discreet, and authoritative.
- Speak in the language used by the user: English, Spanish, or French.
- Keep responses concise (2 to 3 polished paragraphs with elegant bullet points).
- Offer to connect them directly with Karoline via the "Book Strategy Call" or VIP WhatsApp concierge (+1 305-555-0199).`;

  try {
    const contents = [];

    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        contents.push({
          role: h.role === 'bot' ? 'model' : 'user',
          parts: [{ text: h.text }]
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents,
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 600
        }
      })
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(502).json({ error: 'Gemini API Error', details: errText });
    }

    const data = await geminiRes.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Handler Error:', error);
    return res.status(500).json({ error: 'Internal concierge assistant error.' });
  }
}
