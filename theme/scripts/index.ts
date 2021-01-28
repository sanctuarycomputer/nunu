import "../styles/index.scss";
const navMenuButton = document.getElementById('nav-menu-button');
const navCloseMenuButton = document.getElementById('nav-close-menu-button');
const navMobileMenu = document.getElementById('nav-mobile-menu');

const openMenu = () => {
  navMobileMenu.classList.remove('opacity-0', 'events-none');
  navMobileMenu.classList.add('opacity-1', 'events-all');
};

const closeMenu = () => {
  navMobileMenu.classList.remove('opacity-1', 'events-all');
  navMobileMenu.classList.add('opacity-0', 'events-none');
};

navMenuButton.addEventListener('click', openMenu);
navCloseMenuButton.addEventListener('click', closeMenu);
