import React, { FC } from 'react';
import { Props as ContainerProps } from 'containers/home';
import { HomePage } from 'lib/cms';
import Page from 'elements/Page';

type Props = ContainerProps & {
  model: HomePage;
};

const HomeView: FC<Props> = (props) => {
  const { model } = props;
  const { title } = model;

  return <Page>{title}</Page>;
};

export default HomeView;
