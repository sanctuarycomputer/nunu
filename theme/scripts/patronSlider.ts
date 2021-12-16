import * as rangeSlider from "nouislider";
import getNextSibling from "./utils/getNextSibling";

const TIER_PRICES = [5, 10, 15, 20, 25];

export default (function () {
  const PatronSlider = {
    SELECTORS: {
      slider: "[data-patron-slider]",
      handle: ".noUi-handle",
      pips: ".noUi-marker",
      pipsValue: ".noUi-value",
      patronTierLink: "[data-patron-tier-link]",
      patronTierDescription: "[data-patron-tier-description]",
      patronTierName: "[data-patron-tier-name]",
    },
    START_VALUE: 15,
    MONTHLY: "Monthly",
    PATRON_TIERS: {
      "5": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7795091",
        description:
          "You'll get access to our community Discord, Arena, Time Exchange, patron-only events, and our archived talks earlier than the public.",
        name: "Community Patron",
      },
      "10": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7795092",
        description:
          "You'll get access to our community Discord, Arena, Time Exchange, patron-only events, and our archived talks earlier than the public. You'll also support our ongoing programming at Index.",
        name: "Supporter Patron",
      },
      "15": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7849151",
        description:
          "You'll get access to our community Discord, Arena, Time Exchange, patron-only events, and our archived talks earlier than the public. You'll also support our ongoing programming at Index.",
        name: "Supporter Patron+",
      },
      "20": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7836923",
        description:
          "You'll get access to our community Discord, Arena, Time Exchange, patron-only events, and our archived talks earlier than the public. You'll also help sustain our programming at Index.",
        name: "Sustaining Patron",
      },
      "25": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7849152",
        description:
          "You'll get access to our community Discord, Arena, Time Exchange, patron-only events, and our archived talks earlier than the public. You'll also help sustain our programming at Index.",
        name: "Sustaining Patron+",
      },
    },

    SLIDER: null,

    init: async () => {
      const slider = document.querySelector(PatronSlider.SELECTORS.slider);
      if (!slider) return;

      // Initialize noUiSlider instance.
      PatronSlider.SLIDER = rangeSlider.create(slider as HTMLElement, {
        // Start with the slider at this value.
        start: [PatronSlider.START_VALUE],
        // Add this many notches along the slider.
        step: Object.keys(PatronSlider.PATRON_TIERS).length,
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
            if (TIER_PRICES.includes(value)) {
              return 1;
            } else {
              // Render a pip.
              return -1;
            }
          },
        },
      });

      // Selectors for copywriting elements.
      const handle = document.querySelector(PatronSlider.SELECTORS.handle);
      const patronTierLink = document.querySelector(
        PatronSlider.SELECTORS.patronTierLink
      );
      const tierCopywriting = document.querySelector(
        PatronSlider.SELECTORS.patronTierDescription
      );
      const patronTierName = document.querySelector(
        PatronSlider.SELECTORS.patronTierName
      );

      await PatronSlider.initializeCopy({
        handle,
        patronTierLink,
        tierCopywriting,
        patronTierName,
      });

      PatronSlider.bindEventListeners({
        handle,
        patronTierLink,
        tierCopywriting,
        patronTierName,
      });
    },

    /**
     * Initialize copywriting elements.
     */
    async initializeCopy({
      handle,
      patronTierLink,
      tierCopywriting,
      patronTierName,
    }) {
      // Used to set the content of our slider handle
      handle.setAttribute("data-before", `$${PatronSlider.START_VALUE}`);
      // Used to set the content of our drag handle.
      handle.setAttribute("data-after", PatronSlider.MONTHLY);

      patronTierLink.setAttribute(
        "href",
        PatronSlider.PATRON_TIERS[PatronSlider.START_VALUE].href
      );

      tierCopywriting.textContent =
        PatronSlider.PATRON_TIERS[PatronSlider.START_VALUE].description;

      patronTierName.textContent =
        PatronSlider.PATRON_TIERS[PatronSlider.START_VALUE].name;
    },

    bindEventListeners({
      handle,
      patronTierLink,
      tierCopywriting,
      patronTierName,
    }) {
      const pips = document.querySelectorAll(PatronSlider.SELECTORS.pips);

      // When the slider hits a notch, even before the mouse click is released.
      PatronSlider.SLIDER.on("update", function (event) {
        const sliderValue = parseInt(event.toString());

        handle.setAttribute("data-before", `$${sliderValue}`);

        tierCopywriting.textContent =
          PatronSlider.PATRON_TIERS[sliderValue].description;

        patronTierName.textContent =
          PatronSlider.PATRON_TIERS[sliderValue].name;

        patronTierLink.setAttribute(
          "href",
          PatronSlider.PATRON_TIERS[sliderValue].href
        );
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
