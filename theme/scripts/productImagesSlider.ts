import Splide from '@splidejs/splide';

new Splide( '.ProductImagesSlider', {
	pagination: false,
	easing: 'linear',
	arrows: false,
	focus: 'center',
	perPage: 1.35,
	trimSpace: false,
} ).mount();
