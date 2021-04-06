import * as _throttle from 'lodash.throttle';
import getRandomInt from './utils/getRandomInt';
import isMobile from './utils/isMobile';

// Alphabet array, minus characters in 'Index'
const ALPHABET = ['a', 'b', 'c', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];

export default (function() {
  const Logo = {
    SELECTORS: {
      logoText: "[data-logo-text]",
      logoTextMobile: "[data-logo-text-mobile]",
    },
    CONSTANTS: {
      index: 'index'
    },
    STATE: {
      setInterval: null
    },

    init() {
      const logoEl: HTMLElement = document.querySelector(Logo.SELECTORS.logoText);
      const logoElMobile: HTMLElement = document.querySelector(Logo.SELECTORS.logoTextMobile);
      Logo.bindEventListeners(logoEl, logoElMobile);
    },

    bindEventListeners(logoEl: HTMLElement, logoElMobile: HTMLElement) {
      logoEl.addEventListener('mouseenter', () => Logo.randomizeLogo(logoEl));
      logoEl.addEventListener('mouseleave', () => Logo.resetLogo(logoEl));
      window.addEventListener('DOMContentLoaded', () => Logo.checkBreakpointAndRandomizeLogo(logoElMobile));
      window.addEventListener('resize', () => Logo.checkBreakpointAndRandomizeLogo(logoElMobile));
    },

    checkBreakpointAndRandomizeLogo(logoElMobile: HTMLElement) {
      if (isMobile) {
        Logo.STATE.setInterval = setInterval(() => {
          Logo.randomizeLogo(logoElMobile)
          }, 2000);  
      } else {
        Logo.clearInterval();
      };

    },

    randomizeLogo(logoEl: HTMLElement) {
      const randomCharIndex = getRandomInt(0, 4);
      const randomAlphabetIndex = getRandomInt(0, ALPHABET.length - 1);

      const indexArr = (Logo.CONSTANTS.index).split("");
      indexArr[randomCharIndex] = ALPHABET[randomAlphabetIndex];

      logoEl.innerHTML = indexArr.join("");
    },

    clearInterval() {
      if (Logo.STATE.setInterval) {
        clearInterval(Logo.STATE.setInterval)
      }

      return;
    },

    resetLogo(logoEl: HTMLElement) {
      logoEl.innerHTML = Logo.CONSTANTS.index;
    },
  };

  Logo.init();
})();
