import Splide from '@splidejs/splide';

export default(function() {
	const ProductImageSlider = {
		SELECTORS: {
			imageSlider: "[data-product-image-slider]"
		},

		init() {
			const slider: HTMLElement = document.querySelector(ProductImageSlider.SELECTORS.imageSlider);

			if (!slider) return;

			ProductImageSlider.setup(slider);
		},

		setup(slider: HTMLElement) {
			new Splide(slider, {
				speed: 800,
				type: 'loop',
				pagination: false,
				arrows: false,
				autoWidth: true,
				waitForTransition: false,
			}).mount();
		}
	};

	ProductImageSlider.init();
})();
