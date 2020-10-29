export default {
  title: 'Knowledge Area',
  name: 'knowledgeArea',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Thumbnail Image',
      name: 'thumbnailImage',
      type: 'imageField',
      description: 'This image will appear next to the title of the Knowledge Area.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Illustration',
      name: 'illustration',
      type: 'imageField',
      description: 'This illustration appears as an overlay over the content.',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
  ],
};
