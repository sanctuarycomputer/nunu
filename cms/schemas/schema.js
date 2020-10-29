import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

/** Pages */
import HomePage from './pages/homePage';

/** References */
import KnowledgeArea from './references/knowledgeArea';

/** Fields */
import ImageField from './fields/imageField';
import PortableText from './fields/portableText';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    /** Pages */
    HomePage,

    /** References */
    KnowledgeArea,

    /** Fields */
    ImageField,
    PortableText,
  ]),
});
