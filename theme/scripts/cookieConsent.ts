
export default (function() {
  const CookieConsent = {
    SELECTORS: {
      cookieConsent: "[data-cookie-consent]",
    },
    ATTRIBUTES: {
      hasConsented: 'data-cookie-has-consented',
      cookieConsentKey: 'cookie-consent'
    },

    init() {
      const cookieConsent = document.querySelector(CookieConsent.SELECTORS.cookieConsent);

      if (CookieConsent.hasConsented()) {
        CookieConsent.hideCookieConsent(cookieConsent);
      } else {
        CookieConsent.bindEventListeners(cookieConsent);
        CookieConsent.showCookieConsent(cookieConsent);
      }
    },

    bindEventListeners(consentEl: Element) {
      consentEl.addEventListener('click', () => CookieConsent.handleConsent(consentEl))
    },

    hasConsented() {
      return localStorage.getItem(CookieConsent.ATTRIBUTES.cookieConsentKey);
    },

    handleConsent(consentEl: Element) {
      localStorage.setItem(CookieConsent.ATTRIBUTES.cookieConsentKey, `${Date.now()}`);
      CookieConsent.hideCookieConsent(consentEl);
    },

    hideCookieConsent(consentEl: Element) {
      consentEl.setAttribute(CookieConsent.ATTRIBUTES.hasConsented, "true");
    },

    showCookieConsent(consentEl: Element) {
      consentEl.setAttribute(CookieConsent.ATTRIBUTES.hasConsented, "false");
    }
  };

  CookieConsent.init();
})();

