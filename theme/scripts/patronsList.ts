import handleFetchJSONResponse from "./utils/handleFetchJSONResponse";

export default (function () {
  const PatronsList = {
    SELECTORS: {
      patronsList: "[data-patrons-list]",
    },

    init: async () => {
      await PatronsList.initializeCopy();
    },

    async initializeCopy() {
      const allPatronsData = await PatronsList.fetchPatrons();

      console.log(allPatronsData);

      const patronsList = document.querySelector(
        PatronsList.SELECTORS.patronsList
      );

      // Map patrons data and render the list item template for each.
      patronsList.innerHTML = allPatronsData
        .map(PatronsList.renderPatronListItem)
        .join("");
    },

    async fetchPatrons() {
      return fetch(
        "https://cors-anywhere.herokuapp.com/https://api.index-space.org/api/pals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(handleFetchJSONResponse);
    },

    /**
     * Render a single patron list item.
     * Here we are using a template literal. This is a great way to create
     * HTML templates without the complexity of the shadow DOM.
     */
    renderPatronListItem({ name }) {
      return `
        <li class="ListItem sans-light-sm sans-serif">
          ${name}
        </li>`;
    },
  };

  PatronsList.init();
})();
