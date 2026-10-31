/**
 * KAROLINE · Haute Mer & Ultra-Luxury Advisory
 * Application Bootstrap & Trilingual DOM Engine
 */

import { store } from './core/store.js';
import { YachtCalculatorController } from './ui/calculator.js';
import { KarolineConcierge } from './chat/concierge.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sub-Controllers
  const calculator = new YachtCalculatorController();
  const concierge = new KarolineConcierge();

  // 2. Trilingual Language Switcher Logic
  const langButtons = document.querySelectorAll('.lang-btn');

  function updateActiveLangButtons(activeLang) {
    langButtons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === activeLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function applyTranslations() {
    const state = store.getState();
    const currentLang = state.currentLang;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = store.getTranslation(key);
      if (text && typeof text === 'string') {
        el.innerHTML = text;
      }
    });

    // Update all input placeholders with data-i18n-plh
    document.querySelectorAll('[data-i18n-plh]').forEach(el => {
      const key = el.getAttribute('data-i18n-plh');
      const text = store.getTranslation(key);
      if (text && typeof text === 'string') {
        el.setAttribute('placeholder', text);
      }
    });

    updateActiveLangButtons(currentLang);
    document.documentElement.lang = currentLang;
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = btn.getAttribute('data-lang');
      store.setLanguage(selected);
      applyTranslations();
      concierge.renderWelcome();
      showLuxuryToast(
        selected === 'fr' ? 'Langue actualisée' : (selected === 'es' ? 'Idioma actualizado' : 'Language Updated'),
        selected === 'fr' ? 'Français activé pour KAROLINE' : (selected === 'es' ? 'Español activado para KAROLINE' : 'English activated for KAROLINE')
      );
    });
  });

  // Apply initial translations
  applyTranslations();

  // 3. VIP Discovery Call Modal Logic
  const modalOverlay = document.querySelector('#booking-modal');
  const openModalBtns = document.querySelectorAll('[data-action="open-booking"]');
  const closeModalBtns = document.querySelectorAll('[data-action="close-booking"]');
  const bookingForm = document.querySelector('#booking-form');

  function openBookingModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBookingModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeBookingModal();
    });
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeBookingModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeBookingModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#booking-name')?.value || 'Client';
      const email = document.querySelector('#booking-email')?.value || '';
      const company = document.querySelector('#booking-company')?.value || '';
      const service = document.querySelector('#booking-service')?.value || '';
      const notes = document.querySelector('#booking-notes')?.value || '';

      closeBookingModal();

      showLuxuryToast(
        'Briefing Request Received',
        `Thank you ${name}. Karoline\'s executive office will confirm your calendar availability shortly.`
      );

      // WhatsApp VIP Concierge Bridge
      const waMsg = `⚜️ *CONFIDENTIAL MARITIME ADVISORY REQUEST · KAROLINE*\n\n` +
        `*Principal:* ${name}\n` +
        `*Organization/Vessel:* ${company}\n` +
        `*Email:* ${email}\n` +
        `*Service Area:* ${service}\n` +
        `*Context:* ${notes}\n\n` +
        `_Dispatched via karoline-web executive portal._`;

      const waUrl = `https://wa.me/13055550199?text=${encodeURIComponent(waMsg)}`;
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 1000);
    });
  }

  // 4. Hero Action Shortcuts
  const heroCtaPrimary = document.querySelector('#hero-cta-primary');
  if (heroCtaPrimary) {
    heroCtaPrimary.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal();
    });
  }

  const heroCtaSecondary = document.querySelector('#hero-cta-secondary');
  if (heroCtaSecondary) {
    heroCtaSecondary.addEventListener('click', (e) => {
      e.preventDefault();
      concierge.open();
    });
  }

  // 5. Flagship Interactive Gallery Switcher (like Salman Cangrejo Azul)
  const flagshipMainImg = document.querySelector('#flagship-main-img');
  const flagshipCaptionTitle = document.querySelector('#flagship-caption-title');
  const flagshipSlideIndex = document.querySelector('#flagship-slide-index');
  const thumbBtns = document.querySelectorAll('.gallery-thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newSrc = btn.getAttribute('data-img-src');
      const newCaption = btn.getAttribute('data-img-caption');
      const newIndex = btn.getAttribute('data-index');

      if (flagshipMainImg && newSrc) {
        flagshipMainImg.style.opacity = '0.4';
        setTimeout(() => {
          flagshipMainImg.src = newSrc;
          flagshipMainImg.style.opacity = '1';
        }, 180);
      }
      if (flagshipCaptionTitle && newCaption) {
        flagshipCaptionTitle.textContent = newCaption;
      }
      if (flagshipSlideIndex && newIndex) {
        flagshipSlideIndex.textContent = newIndex;
      }

      thumbBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  // 6. Interactive Shipyard & Fleet Filter Bar (like Salman portfolio filters)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const shipyardCards = document.querySelectorAll('.shipyard-gallery-card');
  const countBadge = document.querySelector('#shipyards-count-badge');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filterVal = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        let visibleCount = 0;
        shipyardCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filterVal === 'all' || category.includes(filterVal)) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transition = 'opacity 0.35s ease, transform 0.4s ease';
            }, 30);
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        if (countBadge) {
          const state = store.getState();
          const lang = state.currentLang;
          if (lang === 'fr') {
            countBadge.textContent = `${visibleCount} Chantiers Affichés`;
          } else if (lang === 'es') {
            countBadge.textContent = `${visibleCount} Astilleros Mostrados`;
          } else {
            countBadge.textContent = `${visibleCount} Shipyards Shown`;
          }
        }
      });
    });
  }

  // 7. Toast Notification Service
  function showLuxuryToast(title, message) {
    let container = document.querySelector('.toast-luxury-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-luxury-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-lux';
    toast.innerHTML = `
      <div style="font-size: 1.3rem; color: #D4AF37;">⚜️</div>
      <div>
        <div style="font-size: 0.92rem; font-weight: 800; color: #FFFFFF; font-family: var(--font-display);">${title}</div>
        <div style="font-size: 0.8rem; color: #CBD5E1;">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  console.log('⚜️ [KAROLINE] Ultra-Luxury Maritime Portal successfully mounted in trilingual mode.');
});
