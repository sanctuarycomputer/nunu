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

      const patronsList = document.querySelector(
        PatronsList.SELECTORS.patronsList
      );

      // Map patrons data and render the list item template for each.
      patronsList.innerHTML = allPatronsData.map(PatronsList.renderPatronListItem).join('');
    },

    async fetchPatrons() {
      return fetch("https://api.index-space.org/api/pals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(handleFetchJSONResponse)
    },

    /**
     * Render a single patron list item.
     * Here we are using a template literal. This is a great way to create
     * HTML templates without the complexity of the shadow DOM.
     */
    renderPatronListItem({ name, tier, badge }) {
      return `<li class="AllPatrons__ListItem">
        <div class="AllPatrons__ListItem__inner relative flex items-center py1_25 md:py_75 xs:pr0">
          <div class="flex mr1_25 md:mr2_5 z-1">
            <!-- <img class="AllPatrons__ListItem__image fit-contain w100 h100 radius-sm" sizes="(min-width: 56.25rem) 64w, 55w" srcset="{{img_src_55w}} 55w, {{img_src_64w}} 64w" src="{{ img_src_55w }}" alt="{{ image_alt }}"/> -->
            <div class="AllPatrons__ListItem__image fit-contain w100 h100 radius-sm"></div>
          </div>
          <div class="flex flex-col md:flex-row items-center justify-between col-12 z-1">
            <span class="AllPatrons__ListItem__body sans-light-sm sans-serif mb_625 md:mb0 col-12 md:col-6">${name}</span>
            <span class="sans-xs uppercase sans-serif md:pl2 md:pt_2125 col-12 md:col-6 flex flex-col md:items-end">${tier}</span>
          </div>
        </div>
      </li>`
    }
  };

  PatronsList.init();
})();
