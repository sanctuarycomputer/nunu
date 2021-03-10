
import * as Sentry from "@sentry/browser";

import jsonp from './utils/jsonp';
import validateEmail from './utils/validateEmail';

const TIMEOUT_INTERVAL = 3000;
const SUBSCRIBE_URL = "https://nyc.us3.list-manage.com/subscribe/post-json?u=1a2ff75e095034fc6d0c19ef5&amp;id=64aa34c740";

const generateSubscribeUrl = (email: string) =>`${SUBSCRIBE_URL}&EMAIL=${email}`;

export default (function() {
  const EmailSubscribe = {
    SELECTORS: {
      container: "[data-email-subscribe-container]",
      input: "[data-email-subscribe-input]",
      submit: "[data-email-subscribe-submit]",
    },
    ATTRIBUTES: {
      emailSubscribeState: "data-subscribe-state"
    },
    CONSTANTS: {
      error: 'error',
      success: 'success',
      successMessage: 'You\'re in! Thanks',
      defaultPlaceholder: 'SIGNUP FOR EMAILS',
      submitText: '&#x2710;',
      loading: '...'
    },

    init() {
      const emailSubscribe: HTMLElement = document.querySelector(EmailSubscribe.SELECTORS.container);
      EmailSubscribe.bindEventListeners(emailSubscribe);
    },

    bindEventListeners(emailSubscribe: HTMLElement) {
      const emailSubscribeSubmit: HTMLElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.submit);
      const emailSubscribeInput: HTMLElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.input);

      if (!emailSubscribeSubmit || !emailSubscribeInput) return;

      emailSubscribeSubmit.addEventListener("click", () => {
        EmailSubscribe.handleSubscribe(emailSubscribe);
      });

      emailSubscribeInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          EmailSubscribe.handleSubscribe(emailSubscribe);
        }
      });
    },

    handleSubscribe(emailSubscribe: HTMLElement) {
      const email = (emailSubscribe.querySelector(EmailSubscribe.SELECTORS.input) as HTMLInputElement).value;

      if (!email || !validateEmail(email)) {
        return EmailSubscribe.showError(emailSubscribe);
      }

      const subscribeUrl = generateSubscribeUrl(email);

      // Start Loading
      EmailSubscribe.startLoading(emailSubscribe);

      return new Promise(() => {
        jsonp(subscribeUrl, "c", (err, data) => {
          if (err) {
            Sentry.captureException(err);
            EmailSubscribe.showError(emailSubscribe);
          } else if (data.result !== "success") {
            if (data.msg.includes("subscribed")) {
              EmailSubscribe.showSuccess(emailSubscribe);
            } else {
              Sentry.captureException(err);
              EmailSubscribe.showError(emailSubscribe);
            }
          } else {
            EmailSubscribe.showSuccess(emailSubscribe);
          }
        });
      });
    },

    resetEmailSubscribe(emailSubscribe: HTMLElement) {
      const emailSubscribeInput: HTMLInputElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.input);
      const emailSubscribeSubmit: HTMLInputElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.submit);

      emailSubscribeInput.value = "";
      emailSubscribeInput.placeholder = EmailSubscribe.CONSTANTS.defaultPlaceholder;

      emailSubscribeSubmit.value = EmailSubscribe.CONSTANTS.submitText;

      emailSubscribe.removeAttribute(EmailSubscribe.ATTRIBUTES.emailSubscribeState);
    },

    startLoading(emailSubscribe: HTMLElement) {
      const emailSubscribeSubmit: HTMLInputElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.submit);

      emailSubscribeSubmit.value = EmailSubscribe.CONSTANTS.loading;
    },

    showError(emailSubscribe: HTMLElement) {
      emailSubscribe.setAttribute(EmailSubscribe.ATTRIBUTES.emailSubscribeState, EmailSubscribe.CONSTANTS.error);

      setTimeout(() => EmailSubscribe.resetEmailSubscribe(emailSubscribe), TIMEOUT_INTERVAL);
    },

    showSuccess(emailSubscribe: HTMLElement) {
      const emailSubscribeInput: HTMLInputElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.input);
      const emailSubscribeSubmit: HTMLInputElement = emailSubscribe.querySelector(EmailSubscribe.SELECTORS.submit);

      emailSubscribe.setAttribute(EmailSubscribe.ATTRIBUTES.emailSubscribeState, EmailSubscribe.CONSTANTS.success);

      emailSubscribeInput.value = "";
      emailSubscribeInput.placeholder = EmailSubscribe.CONSTANTS.successMessage;

      emailSubscribeSubmit.value = "";

      setTimeout(() => EmailSubscribe.resetEmailSubscribe(emailSubscribe), TIMEOUT_INTERVAL);
    }
  };

  EmailSubscribe.init();
})();

