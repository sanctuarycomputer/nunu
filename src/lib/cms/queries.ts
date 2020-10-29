const knowledgeArea = `{
  'id': _id,
  _type,
  _key,
  title,
  content,
  'thumbnailImage': {
    'src': thumbnailImage.asset->url,
    'caption': thumbnailImage.caption,
    'alt': thumbnailImage.alt
  },
  'illustration': {
    'src': illustration.asset->url,
    'caption': illustration.caption,
    'alt': illustration.alt
  }
}`;

export default {
  /*
   * Pages
   */
  home: `*[_type == 'homePage' && _id == '_homePage'][0] {
    title,
    _type
  }`,

  /*
   * References
   */
  knowledgeAreas: `*[_type == 'knowledgeArea'][] ${knowledgeArea}`,
};
