/**
 * KAROLINE · Haute Mer & Ultra-Luxury Advisory
 * Core Reactive Store with Trilingual Sync
 */

import { TRANSLATIONS } from '../i18n/translations.js';

class KarolineStore {
  constructor() {
    this.subscribers = new Set();
    this.state = this.loadState();
  }

  loadState() {
    let savedLang = 'en';
    try {
      savedLang = localStorage.getItem('karoline_lang') || 'en';
      if (!['en', 'es', 'fr'].includes(savedLang)) {
        savedLang = 'en';
      }
    } catch (e) {
      savedLang = 'en';
    }

    return {
      currentLang: savedLang,
      calculator: {
        vesselTier: 'tier2', // 130ft Superyacht Quint Mercury V12
        weeksBooked: 10,
        weeklyRate: 180000
      },
      isBookingModalOpen: false,
      isChatOpen: false
    };
  }

  getState() {
    return this.state;
  }

  setState(partial) {
    this.state = { ...this.state, ...partial };
    this.persist();
    this.notify();
  }

  persist() {
    try {
      localStorage.setItem('karoline_lang', this.state.currentLang);
    } catch (e) {
      console.warn('Storage warning', e);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const cb of this.subscribers) {
      cb(this.state);
    }
  }

  setLanguage(lang) {
    if (!['en', 'es', 'fr'].includes(lang)) return;
    this.setState({ currentLang: lang });
  }

  getTranslation(path) {
    const keys = path.split('.');
    let current = TRANSLATIONS[this.state.currentLang];
    for (const k of keys) {
      if (!current || current[k] === undefined) {
        // Fallback to English
        let fallback = TRANSLATIONS['en'];
        for (const fb of keys) {
          if (!fallback || fallback[fb] === undefined) return path;
          fallback = fallback[fb];
        }
        return fallback;
      }
      current = current[k];
    }
    return current;
  }

  // --- Yacht ROI Calculator Logic ---
  calculateYachtROI() {
    const { vesselTier, weeksBooked, weeklyRate } = this.state.calculator;

    let annualOpEx = 0;
    if (vesselTier === 'tier1') {
      // 38-50ft Day Cruiser Quad Mercury Outboards
      annualOpEx = 85000;
    } else if (vesselTier === 'tier2') {
      // 130ft (40m) High Performance Superyacht Quint Mercury V12
      annualOpEx = 620000;
    } else if (vesselTier === 'tier3') {
      // 200ft (60m) Megayacht Heavy Diesels
      annualOpEx = 1950000;
    }

    const grossRevenue = weeksBooked * weeklyRate;
    // Standard management & brokerage fees on charter (15%)
    const netCharterIncome = grossRevenue * 0.85;
    const netYield = netCharterIncome - annualOpEx;

    return {
      annualOpEx,
      grossRevenue,
      netYield
    };
  }
}

export const store = new KarolineStore();
