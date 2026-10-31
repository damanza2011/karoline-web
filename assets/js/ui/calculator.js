/**
 * KAROLINE · Haute Mer & Ultra-Luxury Advisory
 * Interactive Yacht ROI & Charter Yield Engine
 */

import { store } from '../core/store.js';

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export class YachtCalculatorController {
  constructor() {
    this.vesselSelect = document.querySelector('#calc-vessel-select');
    this.weeksRange = document.querySelector('#calc-weeks-range');
    this.weeksValDisplay = document.querySelector('#calc-weeks-val');
    this.rateInput = document.querySelector('#calc-rate-input');

    this.opexDisplay = document.querySelector('#calc-opex-display');
    this.grossDisplay = document.querySelector('#calc-gross-display');
    this.netDisplay = document.querySelector('#calc-net-display');

    this.bindEvents();
    this.update();
  }

  bindEvents() {
    if (this.vesselSelect) {
      this.vesselSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        let defaultRate = 180000;
        if (val === 'tier1') defaultRate = 35000;
        else if (val === 'tier2') defaultRate = 180000;
        else if (val === 'tier3') defaultRate = 450000;

        if (this.rateInput) this.rateInput.value = defaultRate;

        store.setState({
          calculator: {
            ...store.getState().calculator,
            vesselTier: val,
            weeklyRate: defaultRate
          }
        });
        this.update();
      });
    }

    if (this.weeksRange && this.weeksValDisplay) {
      this.weeksRange.addEventListener('input', (e) => {
        const weeks = parseInt(e.target.value, 10);
        this.weeksValDisplay.textContent = `${weeks} weeks / an`;
        store.setState({
          calculator: {
            ...store.getState().calculator,
            weeksBooked: weeks
          }
        });
        this.update();
      });
    }

    if (this.rateInput) {
      this.rateInput.addEventListener('input', (e) => {
        const rate = parseFloat(e.target.value) || 0;
        store.setState({
          calculator: {
            ...store.getState().calculator,
            weeklyRate: rate
          }
        });
        this.update();
      });
    }

    store.subscribe(() => {
      this.update();
    });
  }

  update() {
    const { annualOpEx, grossRevenue, netYield } = store.calculateYachtROI();

    if (this.opexDisplay) {
      this.opexDisplay.textContent = formatUSD(annualOpEx);
    }
    if (this.grossDisplay) {
      this.grossDisplay.textContent = formatUSD(grossRevenue);
    }
    if (this.netDisplay) {
      this.netDisplay.textContent = formatUSD(netYield);
      if (netYield >= 0) {
        this.netDisplay.style.color = '#34D399'; // Positive Emerald
      } else {
        this.netDisplay.style.color = '#F59E0B'; // Amber OpEx absorb
      }
    }
  }
}
