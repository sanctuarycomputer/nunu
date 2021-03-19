import isInViewport from './utils/isInViewport';
import throttle from 'lodash/throttle';

export default (function() {
  const FadeIn = {
    SELECTORS: {
      gridItem: "[data-grid-item]",
    },
    ATTRIBUTES: {
      fadeIn: "data-fade-in",
    },

    init() {
      const gridItems = [].slice.call(
        document.querySelectorAll(FadeIn.SELECTORS.gridItem)
      );

      if (!gridItems) {
        return;
      } else {
        FadeIn.bindEventListeners();    
      }
    },

    bindEventListeners() {
      const gridItems = [].slice.call(
        document.querySelectorAll(FadeIn.SELECTORS.gridItem)
      )

      if (gridItems) {
        window.addEventListener("load", () => {
          FadeIn.activate(gridItems);
        });

        document.addEventListener("scroll", () => {
          throttle(FadeIn.activate(gridItems), 150);
        });

      };

    },
    
    activate(gridItems: Element[]) {
      gridItems.forEach((gridItem) => {
        if (isInViewport(gridItem)) {
          gridItem.setAttribute(
            FadeIn.ATTRIBUTES.fadeIn,
            "true"
          );
        }
      });
    },
  };

  FadeIn.init();
  return FadeIn;
})();
