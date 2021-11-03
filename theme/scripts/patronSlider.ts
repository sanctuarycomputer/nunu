import * as rangeSlider from "nouislider";

export default (function () {
  const PatronSlider = {
    SELECTORS: {
      sliderContainer: "[data-patron-slider-container]",
      handle: ".noUi-handle",
      patreonLink: "[data-patreon-link]",
      copy: "[data-patreon-copy]"
    },
    START_VALUE: 5,
    PATREON_LEVELS: {
      5: {
        href: 'https://www.patreon.com/join/index_space/checkout?rid=7795091',
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public."
      },
      10: {
        href: 'https://www.patreon.com/join/index_space/checkout?rid=7795092',
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also support our ongoing programming at Index."
      },
      15: {
        href: 'https://www.patreon.com/join/index_space/checkout?rid=7849151',
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also support our ongoing programming at Index."
      },
      20: {
        href: 'https://www.patreon.com/join/index_space/checkout?rid=7836923',
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also help sustain our programming at Index."
      },
      25: {
        href: 'https://www.patreon.com/join/index_space/checkout?rid=7849152',
        copy: "You'll get access to our community Discord, Arena, Time Exchange, member-only events, and our archived talks earlier than the public. You'll also help sustain our programming at Index."
      },
    },

    init() {
      const slider = rangeSlider.create(
        document.querySelector(PatronSlider.SELECTORS.sliderContainer),
        {
          start: [PatronSlider.START_VALUE],
          connect: true,
          range: {
            min: PatronSlider.START_VALUE,
            max: 25,
          },
          step: 5,
        }
      )


      document
        .querySelector(PatronSlider.SELECTORS.handle)
        .setAttribute("data-before", `$${PatronSlider.START_VALUE}`);

      document
        .querySelector(PatronSlider.SELECTORS.patreonLink)
        .setAttribute("href", PatronSlider.PATREON_LEVELS[PatronSlider.START_VALUE].href);

      document
        .querySelector(PatronSlider.SELECTORS.copy).textContent = PatronSlider.PATREON_LEVELS[PatronSlider.START_VALUE].copy

      document
        .querySelector(PatronSlider.SELECTORS.handle)
        .setAttribute("data-after", `Monthly`);

      slider.on("update", function (event) {
        const value = parseInt(event.toString())

        document
          .querySelector(PatronSlider.SELECTORS.handle)
          .setAttribute("data-before", `$${value}`);

        document
          .querySelector(PatronSlider.SELECTORS.copy).textContent = PatronSlider.PATREON_LEVELS[value].copy

        document
          .querySelector(PatronSlider.SELECTORS.patreonLink)
          .setAttribute("href", PatronSlider.PATREON_LEVELS[value].href);
      });
    },

    bindEventListeners() {},
  };

  PatronSlider.init();
})();
