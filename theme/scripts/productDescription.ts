export default(function() {
	const ProductDescription = {
		SELECTORS: {
			tab: "[data-product-description-tab]",
      content: "[data-product-description-content]",
      tabsWrapper: ".ProductDescription__tabs",
      nav: ".Nav"
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

			if (!tabs && !tabbedContent && !tabsWrapper && !navs) return;
      
      window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
          ProductDescription.scrollHandler(tabs, tabbedContent, tabsWrapper, navs);
        });
      })
		},

		scrollHandler(tabs: HTMLElement[], tabbedContent: HTMLElement[], tabsWrapper: HTMLElement, navs: HTMLElement[]) {
      const tabsWrapperHeight = tabsWrapper.offsetHeight;
      const activeNav = navs.find((elem) => {
        if (elem.style.display != 'none') return elem;
      })
      const height = tabsWrapperHeight + activeNav.offsetHeight;

      tabbedContent.forEach((elem, index) => {
        if (index == 0) {
          if (window.scrollY < elem.offsetTop + elem.offsetHeight - height) {
            tabs[index].classList.add(
              "ProductDescription__button--active"
            );
          } else {
            tabs[index].classList.remove(
              "ProductDescription__button--active"
            );
          }
        } else if (index == tabbedContent.length - 1) {
          if (window.scrollY >= tabbedContent[index-1].offsetTop + tabbedContent[index-1].offsetHeight - height) {
            tabs[index].classList.add(
              "ProductDescription__button--active"
            );
          } else {
            tabs[index].classList.remove(
              "ProductDescription__button--active"
            );
          }
        } else {
          if (
            window.scrollY >= elem.offsetTop &&
            window.scrollY < elem.offsetTop + elem.offsetHeight - height
          ) {
            tabs[index].classList.add(
              "ProductDescription__button--active"
            );
          } else {
            tabs[index].classList.remove(
              "ProductDescription__button--active"
            );
          }
        }
      });
		}
	};

	ProductDescription.init();
})();