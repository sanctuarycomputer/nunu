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

      allPatronsData = [
        ...allPatronsData,
        { name: "Jake Hobart" },
        { name: "Sam Taylor" },
        { name: "Megumi Tanaka" },
        { name: "Angeline Meitzler" },
        { name: "Jacob Heftmann" },
        { name: "Udit Desai" },
        { name: "Manhattan Hydraulics" },
        { name: "XXIX" },
        { name: "Elie Anderson" },
      ];

      if (!allPatronsData.length) return;

      allPatronsData.map(({ name }) => {
        if (!name) return;

        const element = document.createElement("li");
        element.className = "ListItem sans-light-sm sans-serif";
        element.innerText = name;
        patronsList.appendChild(element);
      });
    },

    async fetchPatrons() {
      return fetch("https://api.index-space.org/api/pals", {
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
