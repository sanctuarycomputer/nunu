import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('homePage')
        .title('Home Page')
        .child(S.document().title('Home Page').schemaType('homePage').documentId('_homePage')),
    ]);
