import * as Sentry from "@sentry/browser";
import handleFetchJSONResponse from "./utils/handleFetchJSONResponse";

export default (function () {
  const PatronsList = {
    SELECTORS: {
      patronsList: "[data-patrons-list]",
    },

    init: async () => {
      const patronsList = document.querySelector(
        PatronsList.SELECTORS.patronsList
      );

      if (!patronsList) return;

      await PatronsList.initializeCopy(patronsList);
    },

    async initializeCopy(patronsList: Element) {
      let allPatronsData = await PatronsList.fetchPatrons();

      allPatronsData.map(({ name }) => {
        const element = document.createElement("li");
        element.className = "ListItem sans-light-sm sans-serif";
        element.innerText = name;
        patronsList.appendChild(element);
      });
    },

    async fetchPatrons() {
      return fetch("https://api.index-space.org/api/pal", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleFetchJSONResponse)
        .catch((err) => {
          Sentry.captureException(err);
          return [];
        });
    },

    /**
     * Render a single patron list item.
     * Here we are using a template literal. This is a great way to create
     * HTML templates without the complexity of the shadow DOM.
     */
    renderPatronListItem({ name }) {
      const element = document.createElement("li");
      element.className = "ListItem sans-light-sm sans-serif";
      element.innerText = name;
      return element;
    },
  };

  PatronsList.init();
})();
