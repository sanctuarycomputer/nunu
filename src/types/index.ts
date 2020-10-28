import React from 'react';

export type RouteObject = {
  path: string;
  component?: React.FC;
  exact?: boolean;
  dev?: boolean;
};
