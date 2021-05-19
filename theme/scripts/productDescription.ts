// Pixel value that's added to the height of the sticky header
// and used to check which section is within the page that lead to best experience
const STICKY_HEIGHT_BUFFER = 16;

export default(function() {
	const ProductDescription = {
		SELECTORS: {
			tab: "[data-product-description-tab]",
      content: "[data-product-description-content]",
      tabsWrapper: "[data-product-description-tabs-wrapper]",
      nav: "[data-nav]"
		},
    CLASSES: {
      activeTab: "ProductDescription__button--active"
    },

		init() {
			const tabs = [].slice.call(
        document.querySelectorAll(ProductDescription.SELECTORS.tab)
      );

      const tabbedContent = [].slice.call(
        document.querySelectorAll(ProductDescription.SELECTORS.content)
      );

      const tabsWrapper: HTMLElement = document.querySelector(ProductDescription.SELECTORS.tabsWrapper);

      const navs = [].slice.call(
        document.querySelectorAll(ProductDescription.SELECTORS.nav)
      );

			if (!tabs || !tabbedContent || !tabsWrapper || !navs) return;

      let height = ProductDescription.getStickyHeight(tabsWrapper, navs);
      window.addEventListener('resize', () => {
        height = ProductDescription.getStickyHeight(tabsWrapper, navs);
      })
      
      window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
          ProductDescription.scrollHandler(tabs, tabbedContent, height);
        });
      })
		},

    getStickyHeight(tabsWrapper: HTMLElement, navs: HTMLElement[]): number {
      const tabsWrapperHeight = tabsWrapper.offsetHeight;
      const activeNav = navs.find((elem) => {
        if (elem.offsetHeight !== 0) return elem;
      })
      return tabsWrapperHeight + activeNav.offsetHeight + STICKY_HEIGHT_BUFFER;
    },

    toggleActiveStyling(isActive: boolean, tab: HTMLElement) {
      if (isActive) {
        tab.classList.add(
          ProductDescription.CLASSES.activeTab
         );
      } else {
        tab.classList.remove(
          ProductDescription.CLASSES.activeTab
        );
      }
    },

		scrollHandler(tabs: HTMLElement[], tabbedContent: HTMLElement[], height: number) {
      tabbedContent.forEach((elem, index) => {
        const offsetTop = elem.offsetTop;
        const offsetHeight = elem.offsetHeight;
        const offsetBottom = offsetTop + offsetHeight;
        let isActive = true;
        
        if (index == 0) {
          isActive = window.scrollY < offsetBottom - height;
        } else if (index == tabbedContent.length - 1) {
          isActive = window.scrollY >= tabbedContent[index-1].offsetTop + tabbedContent[index-1].offsetHeight - height
        } else {
          isActive = window.scrollY >= offsetTop - STICKY_HEIGHT_BUFFER && window.scrollY < offsetBottom - height
        }

        ProductDescription.toggleActiveStyling(isActive, tabs[index]);
      });
		}
	};

	ProductDescription.init();
})();
