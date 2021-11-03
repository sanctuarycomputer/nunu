export default (function () {
  const PatronSlider = {
    SELECTORS: {
      rangeContainer: "[data-range-container]",
      range: "[data-range-input]",
      bubble: "[data-range-output]",
      outputValue: "[data-range-output-value]"
    },
    STATE: {
      setIntervalId: null,
    },

    init() {
      const rangeContainer: HTMLElement = document.querySelector(
        PatronSlider.SELECTORS.rangeContainer
      );
      const range: HTMLElement = rangeContainer.querySelector(
        PatronSlider.SELECTORS.range
      );
      const bubble: HTMLElement = rangeContainer.querySelector(
        PatronSlider.SELECTORS.bubble
      );
      PatronSlider.bindEventListeners(range, bubble);
      PatronSlider.setBubble(range, bubble);
    },

    bindEventListeners(range: HTMLElement, bubble: HTMLElement) {
      range.addEventListener("input", () => {
        PatronSlider.setBubble(range, bubble);
      });
    },

    setBubble(range, bubble) {
      const val = range.value;
      const min = range.min ? range.min : 0;
      const max = range.max ? range.max : 100;
      const newVal = Number(((val - min) * 100) / (max - min));
      bubble.querySelector(
        PatronSlider.SELECTORS.outputValue
      ).innerHTML = val;

      // Sorta magic numbers based on size of the native UI thumb
      bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    },
  };

  PatronSlider.init();
})();
