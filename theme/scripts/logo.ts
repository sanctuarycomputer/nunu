import getRandomInt from './utils/getRandomInt';

// Alphabet array, minus characters in 'Index'
const ALPHABET = ['a', 'b', 'c', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];

export default (function() {
  const Logo = {
    SELECTORS: {
      logoText: "[data-logo-text]",
    },
    CONSTANTS: {
      index: 'index'
    },

    init() {
      const logoEl: HTMLElement = document.querySelector(Logo.SELECTORS.logoText);
      Logo.bindEventListeners(logoEl);
    },

    bindEventListeners(logoEl: HTMLElement) {
      logoEl.addEventListener('mouseenter', () => Logo.randomizeLogo(logoEl));
      logoEl.addEventListener('mouseleave', () => Logo.resetLogo(logoEl))
    },

    randomizeLogo(logoEl: HTMLElement) {
      const randomCharIndex = getRandomInt(0, 4);
      const randomAlphabetIndex = getRandomInt(0, ALPHABET.length - 1);

      const indexArr = (Logo.CONSTANTS.index).split("");
      indexArr[randomCharIndex] = ALPHABET[randomAlphabetIndex];

      logoEl.innerHTML = indexArr.join("");
    },

    resetLogo(logoEl: HTMLElement) {
      logoEl.innerHTML = Logo.CONSTANTS.index;
    }
  };

  Logo.init();
})();

