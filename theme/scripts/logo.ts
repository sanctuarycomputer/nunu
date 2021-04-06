import getRandomInt from './utils/getRandomInt';

// Alphabet array, minus characters in 'Index'
const ALPHABET = ['a', 'b', 'c', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'y', 'z'];

// Medium breakpoint
const breakpointIsMdUp = 900;

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
      window.addEventListener('resize', () => Logo.randomizeLogoOnInterval(logoElMobile));
    },

    randomizeLogo(logoEl: HTMLElement) {
      console.log('randomize logo ran')
      const randomCharIndex = getRandomInt(0, 4);
      const randomAlphabetIndex = getRandomInt(0, ALPHABET.length - 1);

      const indexArr = (Logo.CONSTANTS.index).split("");
      indexArr[randomCharIndex] = ALPHABET[randomAlphabetIndex];

      logoEl.innerHTML = indexArr.join("");
    },

    checkBreakpointAndRandomizeLogo() {
      // check isMobile
      // if isMobile  {

      Logo.setInterval = setInterval(() => {
            Logo.randomizeLogo(logoEl)
            }, 2000);
//here's my thing,every 2 secs, call it for me

    }  else {
      Logo.clearInterval()

    }
    },


    isMobile() {
      //checks breakpoint 
      //if mobile, randomize Logo, otherwise return 

      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if width < breakpointIsMdUp {
        return true
      } 

      return false
    }

    clearInterval() {
      check, if Logo.setInterval
      then clearInterval(Logo.setInterval)
    }

    resetLogo(logoEl: HTMLElement) {
      logoEl.innerHTML = Logo.CONSTANTS.index;
    }
  };

  Logo.init();
})();


// document.addEventListener("scroll", _throttle(() => 
// FadeIn.activate(gridItems), 15)

//mozilla docs - to-do

// 