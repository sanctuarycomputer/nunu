export default (function() {
  const PageTransition = {
    CONSTANTS: {
      fadeIn: 'fade-in'
    },

    init() {
      PageTransition.bindEventListeners();
    },

    bindEventListeners() {
      window.addEventListener('DOMContentLoaded', PageTransition.fadeIn)
    },

    fadeIn() {
      const body = document.body;
      body.classList.add(PageTransition.CONSTANTS.fadeIn);
    }
  };

  PageTransition.init();
})();

