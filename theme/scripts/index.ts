import "../styles/index.scss";
const navOpenMenuButton = document.getElementById('nav-open-menu-button');
const navCloseMenuButton = document.getElementById('nav-close-menu-button');
const navMobileMenu = document.getElementById('nav-mobile-menu');

const openMenu = () => {
  navMobileMenu.classList.add('MobileNav__menu--active');
};

const closeMenu = () => {
  navMobileMenu.classList.remove('MobileNav__menu--active');
};

navOpenMenuButton.addEventListener('click', openMenu);
navCloseMenuButton.addEventListener('click', closeMenu);
