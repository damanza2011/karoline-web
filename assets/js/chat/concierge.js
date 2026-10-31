/**
 * KAROLINE · Haute Mer & Ultra-Luxury Advisory
 * AI Executive Concierge (Trilingual Nautical & Financial Engine)
 */

import { store } from '../core/store.js';

export class KarolineConcierge {
  constructor() {
    this.launcher = document.querySelector('#chat-launcher');
    this.box = document.querySelector('#chat-box');
    this.closeBtn = document.querySelector('#chat-close-btn');
    this.messagesContainer = document.querySelector('#chat-messages');
    this.input = document.querySelector('#chat-input');
    this.sendBtn = document.querySelector('#chat-send-btn');
    this.suggestionsContainer = document.querySelector('#chat-suggestions');

    this.isOpen = false;
    this.history = [];

    this.bindEvents();
    this.renderWelcome();
  }

  bindEvents() {
    if (this.launcher) {
      this.launcher.addEventListener('click', () => this.toggle());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.handleSend());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });
    }

    store.subscribe((state) => {
      // Re-render suggestions if language changes
      this.renderSuggestions();
    });

    this.renderSuggestions();
  }

  open() {
    if (this.box) {
      this.box.classList.add('open');
      this.isOpen = true;
      if (this.input) this.input.focus();
    }
  }

  close() {
    if (this.box) {
      this.box.classList.remove('open');
      this.isOpen = false;
    }
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  renderWelcome() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = '';
    const welcomeText = store.getTranslation('chat.welcome');
    this.appendMessage('bot', welcomeText);
  }

  renderSuggestions() {
    if (!this.suggestionsContainer) return;
    const pills = store.getTranslation('chat.pills');
    if (!Array.isArray(pills)) return;

    this.suggestionsContainer.innerHTML = pills.map(p => `
      <button class="lux-pill" data-query="${p}">${p}</button>
    `).join('');

    this.suggestionsContainer.querySelectorAll('.lux-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        if (query) {
          if (!this.isOpen) this.open();
          this.sendMessage(query);
        }
      });
    });
  }

  appendMessage(role, text) {
    if (!this.messagesContainer) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-lux-msg ${role}`;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    msgDiv.innerHTML = `
      <div class="chat-lux-bubble">${formattedText}</div>
      <span class="chat-lux-time">${time}</span>
    `;

    this.messagesContainer.appendChild(msgDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    this.history.push({ role, text });
  }

  async handleSend() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text) return;

    this.input.value = '';
    await this.sendMessage(text);
  }

  async sendMessage(userText) {
    this.appendMessage('user', userText);

    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'chat-lux-msg bot';
    typingDiv.innerHTML = `<div class="chat-lux-bubble" style="color: #94A3B8;"><em>Accessing Monaco & Miami maritime intelligence...</em></div>`;
    this.messagesContainer.appendChild(typingDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: this.history,
          lang: store.getState().currentLang
        })
      });

      if (res.ok) {
        const data = await res.json();
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();
        this.appendMessage('bot', data.reply);
        return;
      }
    } catch (e) {
      // Local fallback activated
    }

    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    const localReply = this.generateLocalMaritimeReply(userText);
    this.appendMessage('bot', localReply);
  }

  generateLocalMaritimeReply(query) {
    const q = query.toLowerCase();
    const lang = store.getState().currentLang;

    // Mercury Marine & Propulsion
    if (q.includes('mercury') || q.includes('motor') || q.includes('propulsion') || q.includes('v12') || q.includes('verado')) {
      if (lang === 'es') {
        return `⚓ **Especialidad en Motores & Ecosistema Mercury Marine:**\n\n• **Mercury Verado V12 (600 HP):** Asesoramos a constructores y astilleros en la arquitectura de popa para montajes cuádruples y quíntuples en embarcaciones de 45ft a 70ft.\n• **Estrategia Comercial OEM:** Hemos reestructurado redes de distribuidores marinos en el sur de la Florida y el Caribe, logrando un **+38% de incremento en penetración comercial**.\n• **Optimización Operativa:** Análisis de costos de combustible, telemetría digital SmartCraft y reducción de tiempos de servicio para flotas de alquiler y tenders de superyates.`;
      } else if (lang === 'fr') {
        return `⚓ **Expertise Propulsion & Écosystème Mercury Marine :**\n\n• **Mercury Verado V12 (600 CH) :** Conseil aux chantiers sur l'architecture de tableau arrière pour configurations quadruples et quintuples sur unités de 45 à 70 pieds.\n• **Déploiement Commercial OEM :** Restructuration des réseaux de concessionnaires en Floride et Caraïbes avec **+38% de parts de marché**.\n• **Efficacité Opérationnelle :** Analyse des coûts de carburant, télémétrie SmartCraft et maintenance prédictive pour tenders de superyachts.`;
      } else {
        return `⚓ **Mercury Marine Propulsion & Commercial Strategy:**\n\n• **Mercury Verado V12 (600 HP):** Technical and commercial advisory for multi-engine transom rigging (quad and quint setups) on 45ft to 70ft luxury center consoles and superyacht chase boats.\n• **OEM Builder Network:** Restructured dealer territories across South Florida and the Caribbean, driving **+38% market penetration**.\n• **Lifecycle Efficiency:** SmartCraft digital telemetry integration and OpEx optimization for high-performance charter tenders.`;
      }
    }

    // FIU Miami & Academic Background
    if (q.includes('fiu') || q.includes('florida') || q.includes('master') || q.includes('education') || q.includes('estudio') || q.includes('universidad')) {
      if (lang === 'es') {
        return `🎓 **Trayectoria Académica & Credenciales FIU Miami:**\n\n• **Florida International University (FIU):** Maestría en Ciencias en Negocios y Finanzas Internacionales (Chapman Graduate School of Business), Miami, FL.\n• **Enfoque Cuantitativo:** Modelación financiera transfronteriza, valoración de activos de capital náutico y fusiones/adquisiciones marítimas.\n• **Conexión Estratégica:** Miami es el epicentro náutico de las Américas, permitiendo articular alianzas con astilleros europeos (Mónaco, Italia, Alemania) e inversionistas en EE.UU.`;
      } else if (lang === 'fr') {
        return `🎓 **Parcours Académique & Références FIU Miami :**\n\n• **Florida International University (FIU) :** Master en Affaires et Finance Internationales à la Chapman Graduate School of Business (Miami, Floride).\n• **Rigueur Financière :** Modélisation d'actifs maritimes, valorisation de superyachts et structuration fiscale transfrontalière.\n• **Pôle Stratégique :** Connexion directe entre le dynamisme nautique de Miami et le prestige méditerranéen (Monaco, Côte d'Azur).`;
      } else {
        return `🎓 **Academic Credentials & FIU Miami Background:**\n\n• **Florida International University (FIU):** Master of Science in International Business & Finance at the prestigious Chapman Graduate School of Business in Miami, FL.\n• **Maritime Quantitative Rigor:** Cross-border financial modeling, superyacht asset valuation, and M&A advisory.\n• **Strategic Gateway:** Leveraging Miami as the premier yachting capital of the Americas connecting Monaco, Fort Lauderdale, and the Caribbean.`;
      }
    }

    // Charter Yield & Yacht ROI Calculator
    if (q.includes('roi') || q.includes('charter') || q.includes('calculator') || q.includes('calculadora') || q.includes('rendimiento') || q.includes('opex')) {
      if (lang === 'es') {
        return `📊 **Ingeniería Financiera en Charter y Costos OpEx:**\n\n• **Regla del 10%:** En superyates tradicionales, el costo operativo anual ronda el 10% al 12% del valor de construcción del barco (tripulación, marina, seguro, mantenimiento).\n• **Generación de Rendimiento:** Un yate de 40m a 60m con 10 a 14 semanas de charter comercial al año puede absorber el 100% de su OpEx y generar entre **$450.000 y $1.200.000 USD netos** para el armador.\n• Prueba nuestro **Simulador Interactivo de ROI** en la sección superior para calcular tus cifras exactas.`;
      } else if (lang === 'fr') {
        return `📊 **Modélisation Financière Charter & OpEx :**\n\n• **Règle des 10% :** Les charges annuelles d'un yacht représentent environ 10% à 12% de sa valeur patrimoniale.\n• **Optimisation Locative :** Avec 10 à 14 semaines de charter par an en Méditerranée ou aux Caraïbes, un navire peut neutraliser son OpEx et générer **450 000$ à 1 200 000$ USD nets**.\n• Utilisez notre **Calculateur Interactif de ROI** ci-dessus pour ajuster votre projet.`;
      } else {
        return `📊 **Maritime Financial Modeling & Charter Yield:**\n\n• **The 10% OpEx Benchmark:** Annual running expenses for a superyacht typically average 10% to 12% of the vessel's capital acquisition cost.\n• **Commercial Offset:** Booking 10 to 14 charter weeks per season in the Mediterranean or Caribbean can fully cover OpEx while returning **$450,000 to $1,200,000 USD in net operating yield**.\n• Explore our **Interactive Yacht ROI Engine** above for bespoke vessel projections.`;
      }
    }

    // Booking a Consultation
    if (q.includes('book') || q.includes('agendar') || q.includes('cita') || q.includes('reunion') || q.includes('call') || q.includes('rdv') || q.includes('contact')) {
      if (lang === 'es') {
        return `📅 **Agendar una Sesión de Consultoría Confidencial:**\n\nPuedes programar una sesión estratégica de 30 minutos directamente con Karoline:\n1. Haz clic en el botón superior **"Agendar Sesión"**.\n2. O contáctala directamente por **WhatsApp VIP Concierge** al [+1 (305) 555-0199](https://wa.me/13055550199).\n\nLas sesiones están disponibles en inglés, español y francés.`;
      } else if (lang === 'fr') {
        return `📅 **Réserver une Séance de Conseil Confidentielle :**\n\nVous pouvez planifier un entretien stratégique de 30 minutes avec Karoline :\n1. Cliquez sur le bouton supérieur **"Réserver un Entretien"**.\n2. Ou contactez directement le **WhatsApp VIP Concierge** au [+1 (305) 555-0199](https://wa.me/13055550199).\n\nÉchanges disponibles en français, anglais et espagnol.`;
      } else {
        return `📅 **Schedule a Confidential Strategic Briefing:**\n\nYou may reserve a 30-minute private consultation directly with Karoline:\n1. Click the **"Book Strategy Call"** button in the header.\n2. Or connect directly via **VIP WhatsApp Concierge** at [+1 (305) 555-0199](https://wa.me/13055550199).\n\nConsultations conducted seamlessly in English, Spanish, or French.`;
      }
    }

    // Default High-Luxury Response
    if (lang === 'es') {
      return `Con gusto. En **KAROLINE Advisory**, asesoramos a astilleros de élite, marcas de propulsión de alto rendimiento (Mercury Marine) e inversionistas náuticos entre Miami y Mónaco.\n\nPuedes consultarme sobre:\n1. Arquitectura de motores Mercury Verado V12 y optimización de flotas.\n2. Modelación de retorno de inversión (ROI) y contratos de charter de superyates.\n3. Estrategias de captación para compradores de ultra alto patrimonio (UHNWI).\n4. O agendar una llamada de consultoría privada con Karoline.`;
    } else if (lang === 'fr') {
      return `Avec plaisir. Au sein de **KAROLINE Advisory**, nous accompagnons les chantiers d'élite, les leaders de la motorisation haute performance (Mercury Marine) et les investisseurs privés entre Miami et Monaco.\n\nVous pouvez m'interroger sur :\n1. La motorisation Mercury Verado V12 et la gestion de flotte.\n2. Le rendement locatif en charter et la fiscalité de pavillon.\n3. L'acquisition de clientèle UHNWI lors des grands salons nautiques.\n4. La prise de rendez-vous pour un entretien stratégique avec Karoline.`;
    } else {
      return `With pleasure. At **KAROLINE Advisory**, we deliver executive strategy for elite yacht builders, high-performance propulsion leaders (Mercury Marine), and private maritime investors across Miami and Monaco.\n\nYou may explore:\n1. Mercury Verado V12 propulsion architecture and OEM builder integration.\n2. Superyacht financial modeling, OpEx benchmarks, and charter yields.\n3. UHNWI marketing campaigns for Fort Lauderdale and Monaco boat shows.\n4. Scheduling a private advisory briefing directly with Karoline.`;
    }
  }
}
