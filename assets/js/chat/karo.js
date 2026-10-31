/**
 * KAROLINE · Haute Mer & Ultra-Luxury Advisory
 * AI Advisor Engine: KARO (Inspired by Salma & Specialized for Yachting & Propulsion)
 */

import { store } from '../core/store.js';

const KB = [
  {
    id: 'greet',
    keys: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hey', 'hello', 'hi', 'bonjour', 'salut', 'que tal', 'saludos'],
    es: 'Hola, soy KARO, la asesora digital de KAROLINE. Puedo informarte sobre asignación de slots en astilleros soberanos, ingeniería de motores Mercury Marine Verado V12, el buque insignia de 115m o agendar una consulta privada con Carolina bajo estricto NDA. ¿Por dónde deseas comenzar?',
    en: 'Hello, I am KARO, digital advisor at KAROLINE. I can assist you with build slot allocations at elite European shipyards, Mercury Marine Verado V12 engineering, our 115M flagship vessel, or booking a confidential briefing with Carolina under strict NDA. Where shall we begin?',
    fr: 'Bonjour, je suis KARO, conseillère digitale chez KAROLINE. Je peux vous renseigner sur l\'allocation de créneaux de cale sèche, l\'ingénierie Mercury Marine Verado V12, notre navire amiral de 115m ou organiser un entretien privé sous accord de confidentialité. Par quoi souhaitez-vous commencer ?',
    chips: [
      { label: '⚓ Buque Insignia 115M', action: 'flagship' },
      { label: '🏛️ Top 10 Astilleros', action: 'shipyards' },
      { label: '⚡ Mercury Verado V12', action: 'mercury' },
      { label: '📅 Agendar Cita NDA', action: 'booking' }
    ]
  },
  {
    id: 'flagship',
    keys: ['flagship', 'insignia', 'buque insignia', 'project sovereign', '115m', 'sovereign', 'barco principal', 'yate insignia'],
    es: 'Project Sovereign es nuestro proyecto insignia de 115 metros de arquitectura naval pura en acero y aluminio. Diseñado en estrecha relación con Lürssen y Feadship, cuenta con propulsión híbrida diésel-eléctrica, 6.500 millas náuticas de autonomía, helipuerto comercial y hangar para dos chase boats de 50 pies con cuádruple motorización Mercury Verado V12 de 600HP. El avance de reserva de dique está al 75% para entrega en 2027.',
    en: 'Project Sovereign is our 115-meter flagship megayacht engineered with Northern European masters (Lürssen / Feadship). Features eco-diesel hybrid propulsion, 6,500 NM range, fully certified commercial helipad, and twin 50ft chase boats rigged with quad Mercury Verado V12 600HP outboards. Dry-dock slot is 75% committed for Q4 2027 delivery.',
    fr: 'Le Project Sovereign est notre navire amiral de 115 mètres conçu avec les maîtres d\'Europe du Nord (Lürssen / Feadship). Doté d\'une propulsion hybride diesel-électrique, d\'une autonomie de 6 500 milles nautiques, d\'un héliport certifié et d\'un garage pour deux chase boats équipés de quatre Mercury Verado V12 600 CH. Le créneau de cale sèche est réservé à 75% pour livraison 2027.',
    chips: [
      { label: '📄 Ver Ficha Técnica', action: 'view_flagship' },
      { label: '💰 Rendimiento Chárter', action: 'calculator' },
      { label: '📅 Solicitar Slot Dique', action: 'booking' }
    ]
  },
  {
    id: 'shipyards',
    keys: ['astillero', 'astilleros', 'shipyard', 'shipyards', 'chantiers', 'lurssen', 'feadship', 'oceanco', 'benetti', 'sanlorenzo', 'amels', 'abeking', 'mangusta', 'westport'],
    es: 'Gestionamos relaciones directas con los 10 mejores astilleros y líderes de propulsión del planeta:\n\n1. Lürssen (Alemania · 85-180m+)\n2. Feadship (Holanda · 50-110m+)\n3. Oceanco (Holanda · 80-127m+)\n4. Benetti (Italia · 35-108m+)\n5. Sanlorenzo (Italia · 30-73m+)\n6. Amels / Damen (Holanda · 55-90m+)\n7. Abeking & Rasmussen (Alemania · 60-120m+)\n8. Mercury Marine High-Performance (USA · V12 600HP)\n9. Mangusta / Baglietto (Italia · 38-55m+)\n10. Westport (USA · 38-52m)\n\n¿Deseas filtrar por país o consultar disponibilidad de dique seco?',
    en: 'We maintain sovereign advisory relationships with the world\'s top 10 shipyards:\n\n1. Lürssen (Germany)\n2. Feadship (Netherlands)\n3. Oceanco (Netherlands)\n4. Benetti (Italy)\n5. Sanlorenzo (Italy)\n6. Amels / Damen (Netherlands)\n7. Abeking & Rasmussen (Germany)\n8. Mercury Marine V12 (USA)\n9. Mangusta / Baglietto (Italy)\n10. Westport (USA)\n\nWould you like to review delivery lead times or build slot escrows?',
    fr: 'Nous entretenons des relations directes avec les 10 plus grands chantiers navals du monde :\n\n1. Lürssen (Allemagne)\n2. Feadship (Pays-Bas)\n3. Oceanco (Pays-Bas)\n4. Benetti (Italie)\n5. Sanlorenzo (Italie)\n6. Amels / Damen (Pays-Bas)\n7. Abeking & Rasmussen (Allemagne)\n8. Mercury Marine V12 (USA)\n9. Mangusta / Baglietto (Italie)\n10. Westport (USA)\n\nSouhaitez-vous consulter les disponibilités de cale sèche ?',
    chips: [
      { label: '🔍 Filtrar Portafolio', action: 'filter_portfolio' },
      { label: '⚡ Motores Mercury V12', action: 'mercury' },
      { label: '📅 Consultar Slot', action: 'booking' }
    ]
  },
  {
    id: 'mercury',
    keys: ['mercury', 'v12', 'verado', 'motor', 'motores', 'propulsion', 'fueraborda', 'outboard', '600hp', 'chase boat', 'tender'],
    es: 'Carolina es especialista en propulsión marina Mercury Marine en Miami. El Verado V12 de 7.6 litros y 600 HP es la mayor innovación naval moderna: cuenta con caja de cambios automática de 2 velocidades y embase direccionable independiente (el motor no gira, solo el embase inferior). Permite montajes cuádruples y quíntuples de hasta 3.000 HP con joystick para tender y chase boats de superyates sin ocupar espacio en la sala de máquinas.',
    en: 'Carolina specializes in high-performance Mercury Marine propulsion in Miami. The naturally aspirated 7.6L V12 600HP Verado features a revolutionary steerable gearcase and a 2-speed automatic transmission. The powerhead remains stationary while the lower gearcase pivots, offering ultra-maneuverable joystick control, quad/quint rigging up to 3,000HP, and unmatched cockpit space on luxury mega-tenders.',
    fr: 'Carolina est spécialiste de la motorisation Mercury Marine à Miami. Le Verado V12 7.6L de 600 CH est une révolution : embase orientable indépendante et boîte automatique 2 vitesses. La tête motrice reste fixe pendant que l\'embase pivote, offrant une manœuvrabilité exceptionnelle par joystick pour les tenders et chase boats jusqu\'à 3 000 CH en montage quintuple.',
    chips: [
      { label: '📘 Dossier Mercury V12', action: 'mercury_dossier' },
      { label: '🚤 Ver Buque Insignia', action: 'flagship' },
      { label: '📅 Asesoría Técnica', action: 'booking' }
    ]
  },
  {
    id: 'taxes',
    keys: ['impuestos', 'fiscal', 'tax', 'taxes', 'bandera', 'flag', 'miami', 'monaco', 'dubai', 'flibs', 'delaware', 'caiman'],
    es: 'Estructuramos adquisiciones náuticas para maximizar el beneficio fiscal y la discreción patrimonial:\n\n• Florida: Tope máximo de impuesto marítimo (Sales Tax Cap de $18.000 USD sin importar el valor del buque).\n• Mónaco & Francia: Exención comercial francesa para deducir IVA en operaciones de chárter.\n• Dubái: Cero impuestos sobre ganancias de capital y zonas francas marítimas exclusivas para armadores.\n• Banderas: Caimán, Islas Marshall y Malta para anonimato fiduciario bajo SPVs.',
    en: 'We structure cross-border yacht acquisitions across prime financial corridors:\n\n• Florida: $18,000 USD maximum marine sales tax cap regardless of vessel price.\n• Monaco & French Riviera: Commercial exemption regimes for VAT deduction in charter operations.\n• Dubai: 0% capital gains tax and dedicated maritime free zones for sovereign owners.\n• Flag states: Cayman Islands, Marshall Islands, and Malta for maximum discretion through SPVs.',
    fr: 'Nous optimisons la fiscalité maritime sur les trois grands corridors mondiaux :\n\n• Floride : Plafond fiscal des ventes à 18 000 USD (Sales Tax Cap), quel que soit le prix du yacht.\n• Monaco & Côte d\'Azur : Régime d\'exonération commerciale française de TVA pour le charter.\n• Dubaï : Exonération d\'impôt sur les plus-values et zones franches maritimes souveraines.\n• Pavillons : Îles Caïmans, Îles Marshall et Malte via des sociétés SPV dédiées.',
    chips: [
      { label: '🏛️ Corredores Globales', action: 'corridors' },
      { label: '📊 Calculadora Rendimiento', action: 'calculator' },
      { label: '📅 Consulta Fiduciaria', action: 'booking' }
    ]
  },
  {
    id: 'calculator',
    keys: ['calculadora', 'roi', 'charter', 'chárter', 'rendimiento', 'inversion', 'yield', 'costo', 'gastos', 'opex'],
    es: 'Nuestra calculadora interactiva de ROI y Chárter modela el flujo de caja neto de un superyate: ingresos por semanas de alquiler (tarifas de $350k a $1.8M/semana), costos operativos de tripulación, combustible, seguro P&I y atraque en puertos clave. El rendimiento neto proyectado para un 80m-115m ronda entre el 11% y el 15.5% anual.',
    en: 'Our Yacht ROI & Charter Yield Calculator models net operating income: seasonal charter rates ($350k to $1.8M/week), OpEx breakdown (crew, fuel, P&I insurance, Monaco/Miami berthing fees), yielding net annual returns between 11% and 15.5%.',
    fr: 'Notre calculateur de rendement charter modélise les flux nets : revenus de location (350k à 1.8M€/semaine) et charges opérationnelles (équipage, carburant, assurance P&I, places de port). Les rendements nets se situent entre 11% et 15.5% par an.',
    chips: [
      { label: '📊 Abrir Calculadora', action: 'open_calculator' },
      { label: '⚓ Buque Insignia 115M', action: 'flagship' },
      { label: '📅 Discutir Modelo OpEx', action: 'booking' }
    ]
  },
  {
    id: 'advisor',
    keys: ['carolina', 'karoline', 'quien es', 'fiu', 'estudios', 'experiencia', 'perfil', 'nosotros', 'quienes son'],
    es: 'Carolina (Karoline) es Estratega Principal en Negocios y Finanzas Internacionales graduada con honores de Florida International University (FIU Chapman Graduate School of Business). Combina su formación en finanzas transfronterizas con amplia experiencia técnica en propulsión marina Mercury Marine en Miami y relaciones de alto nivel con astilleros del norte de Europa y el Mediterráneo.',
    en: 'Carolina (Karoline) is Managing Principal & Maritime Strategist, holding a Master\'s in International Business & Finance from Florida International University (FIU Chapman Graduate School). She bridges transatlantic marine finance, Mercury Marine propulsion expertise in Miami, and direct senior advisory with leading European shipyards.',
    fr: 'Carolina (Karoline) est Stratège Principale en Finance et Affaires Internationales, diplômée de Florida International University (FIU Chapman School). Elle associe ingénierie de motorisation Mercury Marine à Miami, conseil financier transfrontalier et accès exclusif aux chantiers navals de prestige.',
    chips: [
      { label: '📜 Ver Credenciales', action: 'view_why' },
      { label: '📅 Agendar Cita Privada', action: 'booking' },
      { label: '💬 WhatsApp Directo', action: 'whatsapp' }
    ]
  },
  {
    id: 'booking',
    keys: ['cita', 'agendar', 'contacto', 'mandato', 'reunion', 'booking', 'contact', 'rendez-vous', 'call', 'telefono', 'whatsapp'],
    es: 'Las consultas con Carolina se llevan a cabo bajo estricto acuerdo de no divulgación (NDA). Las reuniones presenciales se coordinan en Brickell Avenue (Miami), el Yacht Club de Mónaco o Dubái Harbour. Puedes abrir el formulario confidencial ahora o conectar directamente vía WhatsApp.',
    en: 'Consultations with Carolina are conducted strictly under bilateral Non-Disclosure Agreements (NDA). In-person briefings can be scheduled in Miami (Brickell), Monaco (Yacht Club), or Dubai Harbour. You can submit your mandate request or connect via private WhatsApp.',
    fr: 'Les consultations avec Carolina s\'effectuent sous accord bilatéral de non-divulgation (NDA). Les rencontres privées sont organisées à Miami (Brickell), au Yacht Club de Monaco ou à Dubaï Harbour. Vous pouvez soumettre votre mandat ou la joindre par WhatsApp privé.',
    chips: [
      { label: '📅 Abrir Formulario NDA', action: 'open_booking_modal' },
      { label: '📱 WhatsApp Privado', action: 'whatsapp' },
      { label: '⚓ Buque Insignia', action: 'flagship' }
    ]
  }
];

export class KaroChatController {
  constructor() {
    this.fab = document.querySelector('#chatFab');
    this.panel = document.querySelector('#chatPanel');
    this.closeBtn = document.querySelector('#chatCloseBtn');
    this.messagesContainer = document.querySelector('#chatMessages');
    this.chipsContainer = document.querySelector('#chatChips');
    this.input = document.querySelector('#chatInput');
    this.sendBtn = document.querySelector('#chatSendBtn');
    this.tabBtns = document.querySelectorAll('.chat-tab');
    this.views = {
      chat: document.querySelector('#chatView'),
      concierge: document.querySelector('#conciergeView')
    };

    this.isOpen = false;
    this.activeTab = 'chat';
    this.isTyping = false;

    this.init();
  }

  init() {
    // Bind open / close
    if (this.fab) {
      this.fab.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Bind tab switching
    this.tabBtns.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = tab.getAttribute('data-tab');
        this.switchTab(target);
      });
    });

    // Bind send input
    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleUserSend();
      });

      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleUserSend();
        }
      });
    }

    // Area cards in Concierge view
    document.querySelectorAll('.area-card[data-action]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const action = card.getAttribute('data-action');
        this.handleChipAction(action);
      });
    });

    // Listen to store language change
    store.subscribe(() => {
      if (this.messagesContainer && this.messagesContainer.children.length <= 1) {
        this.renderInitialGreeting();
      }
    });

    // Render initial message
    this.renderInitialGreeting();
  }

  open() {
    if (this.panel) {
      this.panel.removeAttribute('hidden');
      this.isOpen = true;
      if (this.fab) this.fab.setAttribute('hidden', '');
      if (this.input) this.input.focus();
    }
  }

  close() {
    if (this.panel) {
      this.panel.setAttribute('hidden', '');
      this.isOpen = false;
      if (this.fab) this.fab.removeAttribute('hidden');
    }
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  switchTab(tabName) {
    this.tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) btn.classList.add('is-active');
      else btn.classList.remove('is-active');
    });

    if (tabName === 'chat') {
      if (this.views.chat) this.views.chat.removeAttribute('hidden');
      if (this.views.concierge) this.views.concierge.setAttribute('hidden', '');
      if (this.chipsContainer) this.chipsContainer.style.display = 'flex';
      const inputBar = document.querySelector('.chat-input-bar');
      if (inputBar) inputBar.style.display = 'flex';
    } else if (tabName === 'concierge') {
      if (this.views.chat) this.views.chat.setAttribute('hidden', '');
      if (this.views.concierge) this.views.concierge.removeAttribute('hidden');
      if (this.chipsContainer) this.chipsContainer.style.display = 'none';
      const inputBar = document.querySelector('.chat-input-bar');
      if (inputBar) inputBar.style.display = 'none';
    } else if (tabName === 'calculator') {
      this.close();
      const calcEl = document.querySelector('#inversion') || document.querySelector('#calculator');
      if (calcEl) calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  renderInitialGreeting() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = '';
    const greetObj = KB.find(k => k.id === 'greet');
    const lang = store.getState().currentLang || 'es';
    const text = greetObj[lang] || greetObj.es;
    this.appendBotMessage(text, greetObj.chips);
  }

  appendUserMessage(text) {
    if (!this.messagesContainer) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--user';
    msg.innerHTML = `
      <div class="chat-bubble">${escapeHtml(text)}</div>
      <span class="chat-time">${this.getTimeString()}</span>
    `;
    this.messagesContainer.appendChild(msg);
    this.scrollToBottom();
  }

  appendBotMessage(text, chips = []) {
    if (!this.messagesContainer) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--bot';
    msg.innerHTML = `
      <div class="chat-bubble">${formatReply(text)}</div>
      <span class="chat-time">${this.getTimeString()}</span>
    `;
    this.messagesContainer.appendChild(msg);
    this.renderChips(chips);
    this.scrollToBottom();
  }

  renderTypingIndicator() {
    if (!this.messagesContainer) return null;
    const typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg--bot typing-indicator-el';
    typing.innerHTML = `
      <div class="chat-bubble">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(typing);
    this.scrollToBottom();
    return typing;
  }

  renderChips(chips = []) {
    if (!this.chipsContainer) return;
    this.chipsContainer.innerHTML = '';
    if (!chips || chips.length === 0) return;

    chips.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'chat-chip' + (c.action === 'booking' || c.action === 'whatsapp' ? ' gold' : '');
      btn.textContent = c.label;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleChipAction(c.action, c.label);
      });
      this.chipsContainer.appendChild(btn);
    });
  }

  handleChipAction(action, label = '') {
    if (action === 'open_booking_modal' || action === 'booking') {
      const modal = document.querySelector('#booking-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      this.appendUserMessage(label || 'Quiero agendar una cita confidencial.');
      this.simulateReply('booking');
    } else if (action === 'whatsapp') {
      window.open('https://wa.me/13055550199?text=Hola%20Carolina%2C%20vengo%20del%20portal%20KAROLINE%20y%20deseo%20una%20consulta%20confidencial.', '_blank');
    } else if (action === 'view_flagship' || action === 'flagship') {
      this.appendUserMessage(label || 'Cuéntame del buque insignia de 115m');
      this.simulateReply('flagship');
      const flagshipSec = document.querySelector('#proyecto') || document.querySelector('#flagship-spotlight');
      if (flagshipSec) flagshipSec.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'open_calculator' || action === 'calculator') {
      this.appendUserMessage(label || 'Quiero ver el modelado de rendimiento chárter');
      this.simulateReply('calculator');
      const calcSec = document.querySelector('#inversion') || document.querySelector('#calculator');
      if (calcSec) calcSec.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'filter_portfolio' || action === 'shipyards') {
      this.appendUserMessage(label || 'Mostrar los 10 astilleros de élite');
      this.simulateReply('shipyards');
      const portSec = document.querySelector('#portafolio') || document.querySelector('#shipyards');
      if (portSec) portSec.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'mercury' || action === 'mercury_dossier') {
      this.appendUserMessage(label || 'Explicar propulsión Mercury Marine V12');
      this.simulateReply('mercury');
    } else if (action === 'view_why') {
      this.appendUserMessage(label || 'Ver credenciales de Carolina');
      this.simulateReply('advisor');
      const whySec = document.querySelector('#nosotros') || document.querySelector('#about');
      if (whySec) whySec.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'corridors') {
      this.appendUserMessage(label || 'Detallar ventajas fiscales en Miami y Mónaco');
      this.simulateReply('taxes');
    }
  }

  handleUserSend() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text || this.isTyping) return;

    this.input.value = '';
    this.appendUserMessage(text);
    this.matchAndReply(text);
  }

  matchAndReply(userInput) {
    this.isTyping = true;
    const typingIndicator = this.renderTypingIndicator();
    const query = userInput.toLowerCase();
    const lang = store.getState().currentLang || 'es';

    // Find best match in Knowledge Base
    let bestMatch = KB.find(entry => {
      return entry.keys.some(k => query.includes(k));
    });

    if (!bestMatch) {
      bestMatch = {
        es: `Comprendo su consulta respecto a "${userInput}". Como asesora estratégica de KAROLINE, puedo coordinar un estudio personalizado con Carolina respecto a especificaciones navales, auditoría de dique seco o motorización Mercury V12. ¿Desea que agendemos una llamada confidencial?`,
        en: `I understand your interest regarding "${userInput}". As KAROLINE\'s strategic digital advisor, I can coordinate a customized study with Carolina regarding build slot allocations, naval specifications, or Mercury V12 propulsion. Shall we book a confidential call?`,
        fr: `Je comprends votre demande concernant "${userInput}". En tant que conseillère KAROLINE, je peux organiser une étude personnalisée avec Carolina concernant les créneaux de cale sèche ou la motorisation Mercury V12. Souhaitez-vous un rendez-vous confidentiel ?`,
        chips: [
          { label: '📅 Agendar Cita Confidencial', action: 'booking' },
          { label: '⚓ Ver Buque Insignia', action: 'flagship' },
          { label: '🏛️ Ver 10 Astilleros', action: 'shipyards' }
        ]
      };
    }

    const replyText = bestMatch[lang] || bestMatch.es;
    const chips = bestMatch.chips || [];

    setTimeout(() => {
      if (typingIndicator) typingIndicator.remove();
      this.isTyping = false;
      this.appendBotMessage(replyText, chips);
    }, 550);
  }

  simulateReply(entryId) {
    this.isTyping = true;
    const typingIndicator = this.renderTypingIndicator();
    const match = KB.find(k => k.id === entryId) || KB[0];
    const lang = store.getState().currentLang || 'es';
    const text = match[lang] || match.es;

    setTimeout(() => {
      if (typingIndicator) typingIndicator.remove();
      this.isTyping = false;
      this.appendBotMessage(text, match.chips);
    }, 450);
  }

  getTimeString() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatReply(str) {
  return str.replace(/\n/g, '<br>');
}
