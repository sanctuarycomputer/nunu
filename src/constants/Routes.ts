import { RouteObject } from '../types/index';
import Config from 'lib/config';

import Home from 'pages/Home';
import Styleguide from 'pages/Styleguide';

const RouteMap: Record<string, RouteObject> = {
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

export const ROUTES = Config.DEVELOPMENT
  ? Object.values(RouteMap)
  : Object.values(RouteMap).filter((route) => !route.dev);

export default RouteMap;
