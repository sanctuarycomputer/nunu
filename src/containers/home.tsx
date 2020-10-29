import { RouteComponentProps } from 'react-router-dom';
import { fetchHomePage } from 'state/slices/pages';

import { HomePage } from 'lib/cms';

import ContainerBase from 'lib/containerBase';

export type Props = RouteComponentProps<{}>;

class Home extends ContainerBase<Props, HomePage, typeof import('views/home').default> {
  model = fetchHomePage();
  view = import('views/home');
}

export default Home;
