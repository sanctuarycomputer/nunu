import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

/** Pages */
import HomePage from './pages/homePage';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    /** Pages */
    HomePage,
  ]),
});
