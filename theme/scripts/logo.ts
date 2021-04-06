import getRandomInt from './utils/getRandomInt';

// Alphabet array, minus characters in 'Index'
const ALPHABET = ['a', 'b', 'c', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];

// Medium breakpoint
const breakpointIsMdUp = 900;
let windowWidth = 0;

export default (function() {
  const Logo = {
    SELECTORS: {
      logoText: "[data-logo-text]",
      logoTextMobile: "[data-logo-text-mobile]",
    },
    CONSTANTS: {
      index: 'index'
    },

    init() {
      const logoEl: HTMLElement = document.querySelector(Logo.SELECTORS.logoText);
      const logoElMobile: HTMLElement = document.querySelector(Logo.SELECTORS.logoTextMobile);

      Logo.bindEventListeners(logoEl);
      Logo.bindEventListenersToMobileLogo(logoElMobile);
    },

    bindEventListeners(logoEl: HTMLElement) {
      logoEl.addEventListener('mouseenter', () => Logo.randomizeLogo(logoEl));
      logoEl.addEventListener('mouseleave', () => Logo.resetLogo(logoEl));
    },

    bindEventListenersToMobileLogo(logoEl: HTMLElement) {
      window.addEventListener('resize', () => Logo.randomizeLogoOnInterval(logoEl));
    },

    randomizeLogo(logoEl: HTMLElement): any {
      const randomCharIndex = getRandomInt(0, 4);
      const randomAlphabetIndex = getRandomInt(0, ALPHABET.length - 1);

      const indexArr = (Logo.CONSTANTS.index).split("");
      indexArr[randomCharIndex] = ALPHABET[randomAlphabetIndex];

      logoEl.innerHTML = indexArr.join("");
    },

    randomizeLogoOnInterval(logoEl: HTMLElement) {  
      windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      // const randomizeLogoOnIntervalFunc = setInterval(Logo.randomizeLogo(logoEl), 2000);  
      // setInterval(() => {
      //   Logo.randomizeLogo(logoEl)
      // }, 2000);


      // if (windowWidth < breakpointIsMdUp) {
      //   // const randomizeLogoOnIntervalFunc = setInterval(Logo.randomizeLogo(logoEl), 2000); 

      //   setInterval(() => {
      //     Logo.randomizeLogo(logoEl)
      //   }, 2000);
      // } else {  
      //   // clearInterval(randomizeLogoOnIntervalFunc);
      // }

    },

    resetLogo(logoEl: HTMLElement) {
      logoEl.innerHTML = Logo.CONSTANTS.index;
    }
  };

  Logo.init();
})();

