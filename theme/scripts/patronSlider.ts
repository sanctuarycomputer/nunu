import * as rangeSlider from "nouislider";
import getNextSibling from "./utils/getNextSibling";

const TIER_PRICES = [5, 10, 15, 20, 25];

const START_VALUE = 15;

const MONTHLY = "Monthly";

const PATRON_TIERS = {
  "5": {
    href: "https://www.patreon.com/join/index_space/checkout?rid=7795091",
  },
  "10": {
    href: "https://www.patreon.com/join/index_space/checkout?rid=7795092",
  },
  "15": {
    href: "https://www.patreon.com/join/index_space/checkout?rid=7849151",
  },
  "20": {
    href: "https://www.patreon.com/join/index_space/checkout?rid=7836923",
  },
  "25": {
    href: "https://www.patreon.com/join/index_space/checkout?rid=7849152",
  },
};

export default (function () {
  const PatronSlider = {
    SELECTORS: {
      slider: "[data-patron-slider]",
      handle: ".noUi-handle",
      pips: ".noUi-marker",
      pipsValue: ".noUi-value",
      patronTierLink: "[data-patron-tier-link]",
    },

    SLIDER: null,

    init: async () => {
      const slider = document.querySelector(PatronSlider.SELECTORS.slider);
      if (!slider) return;

      // Initialize noUiSlider instance.
      PatronSlider.SLIDER = rangeSlider.create(
        document.querySelector(PatronSlider.SELECTORS.slider),
        {
          // Start with the slider at this value.
          start: [START_VALUE],
          // Add this many notches along the slider.
          step: Object.keys(PATRON_TIERS).length,
          range: {
            min: 5,
            max: 25,
          },
          // Options for notches along the slider, called "pips"
          pips: {
            mode: rangeSlider.PipsMode.Steps,
            filter: (value) => {
              // If a slider value is not in our list of values,
              // do not render a pip for that value.
              return TIER_PRICES.includes(value) ? 1 : -1;
            },
          },
        }
      );

      // Selectors for copywriting elements.
      const handle = document.querySelector(PatronSlider.SELECTORS.handle);
      const patronTierLink = document.querySelector(
        PatronSlider.SELECTORS.patronTierLink
      );

      await PatronSlider.initializeCopy({
        handle,
        patronTierLink,
      });

      PatronSlider.bindEventListeners({
        handle,
        patronTierLink,
      });
    },

    /**
     * Initialize copywriting elements.
     */
    async initializeCopy({ handle, patronTierLink }) {
      // Used to set the content of our slider handle
      handle.setAttribute("data-before", `$${START_VALUE}`);
      // Used to set the content of our drag handle.
      handle.setAttribute("data-after", MONTHLY);

      patronTierLink.setAttribute("href", PATRON_TIERS[START_VALUE].href);
    },

    bindEventListeners({ handle, patronTierLink }) {
      const pips = document.querySelectorAll(PatronSlider.SELECTORS.pips);

      // When the slider hits a notch, even before the mouse click is released.
      PatronSlider.SLIDER.on("update", function (event) {
        const sliderValue = parseInt(event.toString());

        handle.setAttribute("data-before", `$${sliderValue}`);

        patronTierLink.setAttribute("href", PATRON_TIERS[sliderValue].href);
      });

      // Listen for clicks on our pips
      pips.forEach((pip) => {
        pip.addEventListener("click", PatronSlider.handlePipClick);
      });
    },

    // Handle clicks on "pips", or notches, on the slider.
    handlePipClick(e) {
      const valueEl = getNextSibling(
        e.target,
        PatronSlider.SELECTORS.pipsValue
      );
      let value = Number(valueEl.getAttribute("data-value"));
      PatronSlider.SLIDER.set(value);
    },
  };

  PatronSlider.init();
})();
