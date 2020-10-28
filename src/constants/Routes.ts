import { RouteObject } from '../types/index';

import Home from 'pages/Home';
import Styleguide from 'pages/Styleguide';

const RouteMap: { [id: string]: RouteObject } = {
  HOME: {
    path: '/',
    component: Home,
    exact: true,
  },
  STYLEGUIDE: {
    path: '/styleguide',
    component: Styleguide,
    exact: true,
    dev: true,
  },
};

export const ROUTES =
  process.env.NODE_ENV === 'development'
    ? Object.values(RouteMap)
    : Object.values(RouteMap).filter((route) => !route.dev);

export default RouteMap;
