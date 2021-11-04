import * as rangeSlider from "nouislider";
import getNextSibling from "./utils/getNextSibling";

export default (function () {
  const PatronSlider = {
    SELECTORS: {
      sliderContainer: "[data-patron-slider-container]",
      handle: ".noUi-handle",
      patreonLink: "[data-patreon-link]",
      copy: "[data-patreon-copy]",
      patreonTier: "[data-patreon-tier]",
      pips: ".noUi-marker",
      pipsValue: ".noUi-value",
    },
    START_VALUE: 15,
    MONTHLY: "Monthly",
    PATREON_LEVELS: {
      "5": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7795091",
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public.",
        patreonTier: "Community Member",
      },
      "10": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7795092",
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also support our ongoing programming at Index.",
        patreonTier: "Supporter Member",
      },
      "15": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7849151",
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also support our ongoing programming at Index.",
        patreonTier: "Supporter Member+",
      },
      "20": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7836923",
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also help sustain our programming at Index.",
        patreonTier: "Sustaining Member",
      },
      "25": {
        href: "https://www.patreon.com/join/index_space/checkout?rid=7849152",
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also help sustain our programming at Index.",
        patreonTier: "Sustaining Member+",
      },
    },

    SLIDER: null,

    init() {
      PatronSlider.SLIDER = rangeSlider.create(
        document.querySelector(PatronSlider.SELECTORS.sliderContainer),
        {
          start: [PatronSlider.START_VALUE],
          step: Object.keys(PatronSlider.PATREON_LEVELS).length,
          range: {
            min: 5,
            max: 25,
          },
          pips: {
            mode: rangeSlider.PipsMode.Steps,
            filter: (value) => {
              if ([5, 10, 15, 20, 25].indexOf(value) > -1) {
                return 1;
              }
              return -1;
            },
          },
        }
      );

      const handle = document.querySelector(PatronSlider.SELECTORS.handle);
      const patreonLink = document.querySelector(
        PatronSlider.SELECTORS.patreonLink
      );
      const tierCopywriting = document.querySelector(
        PatronSlider.SELECTORS.copy
      );
      const patreonTierName = document.querySelector(
        PatronSlider.SELECTORS.patreonTier
      );

      handle.setAttribute("data-before", `$${PatronSlider.START_VALUE}`);

      patreonLink.setAttribute(
        "href",
        PatronSlider.PATREON_LEVELS[PatronSlider.START_VALUE].href
      );

      tierCopywriting.textContent =
        PatronSlider.PATREON_LEVELS[PatronSlider.START_VALUE].copy;

      patreonTierName.textContent =
        PatronSlider.PATREON_LEVELS[PatronSlider.START_VALUE].patreonTier;

      handle.setAttribute("data-after", PatronSlider.MONTHLY);

      PatronSlider.bindEventListeners();
    },

    bindEventListeners() {
      const pips = document.querySelectorAll(PatronSlider.SELECTORS.pips);
      const handle = document.querySelector(PatronSlider.SELECTORS.handle);
      const patreonLink = document.querySelector(
        PatronSlider.SELECTORS.patreonLink
      );
      const tierCopywriting = document.querySelector(
        PatronSlider.SELECTORS.copy
      );
      const patreonTierName = document.querySelector(
        PatronSlider.SELECTORS.patreonTier
      );

      // Handle clicks on "pips", or notches, on the slider.
      const handlePipClick = (e) => {
        const valueEl = getNextSibling(
          e.target,
          PatronSlider.SELECTORS.pipsValue
        );
        var value = Number(valueEl.getAttribute("data-value"));
        PatronSlider.SLIDER.set(value);
      };

      PatronSlider.SLIDER.on("update", function (event) {
        const sliderValue = parseInt(event.toString());
        handle.setAttribute("data-before", `$${sliderValue}`);
        tierCopywriting.textContent =
          PatronSlider.PATREON_LEVELS[sliderValue].copy;
        patreonTierName.textContent =
          PatronSlider.PATREON_LEVELS[sliderValue].patreonTier;
        patreonLink.setAttribute(
          "href",
          PatronSlider.PATREON_LEVELS[sliderValue].href
        );
      });

      for (var i = 0; i < pips.length; i++) {
        pips[i].addEventListener("click", (e) => handlePipClick(e));
      }
    },
  };

  PatronSlider.init();
})();
