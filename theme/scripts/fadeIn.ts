import isInViewport from './utils/isInViewport';

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
      )

      if (!gridItems) {
        return;
      } else {
        document.addEventListener("scroll", () => {
          FadeIn.activate(gridItems);
        });      
      }
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
