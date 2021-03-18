import isInViewport from './utils/isInViewport';

export default (function() {
  const FadeIn = {
    SELECTORS: {
      homeGridItem: "[data-home-grid-item]",
      collectionGridItem: "[data-collection-grid-item]",
    },
    ATTRIBUTES: {
      fadeIn: "data-fade-in",
    },

    init() {
      //Fade in activated by scroll
      const homeGridItems = [].slice.call(
        document.querySelectorAll(FadeIn.SELECTORS.homeGridItem)
      )

      //Fade in activated by page load, then by scroll
      const collectionGridItems = [].slice.call(
        document.querySelectorAll(FadeIn.SELECTORS.collectionGridItem)
      )

      if (!homeGridItems || !collectionGridItems) {
        return;
      } else {
        FadeIn.bindEventListeners();    
      }
    },

    bindEventListeners() {
      const homeGridItems = [].slice.call(
        document.querySelectorAll(FadeIn.SELECTORS.homeGridItem)
      )
      const collectionGridItems = [].slice.call(
        document.querySelectorAll(FadeIn.SELECTORS.collectionGridItem)
      )
      
      if (homeGridItems) {
        document.addEventListener("scroll", () => {
          FadeIn.activate(homeGridItems);
        });  
      };

      if (collectionGridItems) {
        window.addEventListener("load", () => {
          FadeIn.activate(collectionGridItems);
        });

        document.addEventListener("scroll", () => {
          FadeIn.activate(collectionGridItems);
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
