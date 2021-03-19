import isInViewport from './utils/isInViewport';
import throttle from './utils/throttle';

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

        const activateFadeIn = (gridItems) => {
          FadeIn.activate(gridItems)
        }

        const throttleScroll = throttle(activateFadeIn, 150);
        
        document.addEventListener("scroll", throttleScroll);
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
