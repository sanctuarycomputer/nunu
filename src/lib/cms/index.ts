import Sanity from './config';
import Queries from './queries';

export const Pages = {
  fetchHomePage() {
    return Sanity.fetch(Queries.home);
  },
};

export { HomePage, Image, ImageCrop, ImageDimensions, KnowledgeArea } from './types';
