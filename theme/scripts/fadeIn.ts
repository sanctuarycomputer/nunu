import isInViewport from './utils/isInViewport';
import * as _throttle from 'lodash.throttle';

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

      if (!gridItems.length) return; 

      FadeIn.bindEventListeners(gridItems);    
    },

    bindEventListeners(gridItems: Element[]) {
      window.addEventListener("DOMContentLoaded", () => {
        FadeIn.activate(gridItems);
      });

      document.addEventListener("scroll", _throttle(() => 
        FadeIn.activate(gridItems), 15)
      );
    },
    
    activate(gridItems: Element[]) {
      gridItems.forEach((gridItem) => {
        if (isInViewport(gridItem, 2)) {
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
