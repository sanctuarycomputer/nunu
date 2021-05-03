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
				classes: {
					arrows: 'splide__arrows--override',
					arrow : 'splide__arrow--override',
				},
				speed: 800,
				type: 'loop',
				pagination: false,
				arrows: true,
				focus: 'center',
				perPage: 1.35,
				trimSpace: false
			}).mount();
		}
	};

	ProductImageSlider.init();
})();

// import Splide from '@splidejs/splide';

// export default(function() {
// 	const ProductImageSlider = {
// 		SELECTORS: {
// 			productImageSlider: "[data-product-image-slider]",
// 			courseImageSlider: "[data-course-image-slider]"
// 		},

// 		init() {
// 			const courseImageSlider: HTMLElement = document.querySelector(ProductImageSlider.SELECTORS.courseImageSlider);

// 			const productImageSlider: HTMLElement = document.querySelector(ProductImageSlider.SELECTORS.productImageSlider);

// 			if (!courseImageSlider || !productImageSlider) return;

// 			if (courseImageSlider) {
// 				ProductImageSlider.setupLeftAlignSlider(courseImageSlider);
// 			}

// 			if (productImageSlider) {
// 				ProductImageSlider.setupCenteredSlider(productImageSlider);
// 			}
// 		},

// 		setupCenteredSlider(slider: HTMLElement) {
// 			new Splide(slider, {
// 				classes: {
// 					arrows: 'splide__arrows--override',
// 					arrow : 'splide__arrow--override',
// 				},
// 				speed: 800,
// 				type: 'loop',
// 				pagination: false,
// 				arrows: true,
// 				focus: 'center',
// 				perPage: 1.35,
// 				trimSpace: false
// 			}).mount();
// 		},

// 		setupLeftAlignSlider(slider: HTMLElement) {
// 			new Splide(slider, {
// 				classes: {
// 					arrows: 'splide__arrows--override',
// 					arrow : 'splide__arrow--override',
// 				},
// 				speed: 800,
// 				type: 'loop',
// 				pagination: false,
// 				arrows: true,
// 				focus: 'center',
// 				perPage: 1.35,
// 				trimSpace: false
// 			}).mount();
// 		},

// 	};
	

// 	ProductImageSlider.init();
// })();