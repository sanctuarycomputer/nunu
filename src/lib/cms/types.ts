import * as t from 'io-ts';

export type Block = t.TypeOf<typeof Block>;
export const Block = t.type({
  _key: t.string,
  _type: t.string,
  markDefs: t.array(t.string),
  style: t.string,
  children: t.array(
    t.partial({ _key: t.string, _type: t.string, marks: t.array(t.string), text: t.string })
  ),
});

export type HomePage = t.TypeOf<typeof HomePage>;
export const HomePage = t.type({
  title: t.string,
});

export type Image = t.TypeOf<typeof Image>;
export const Image = t.type({
  id: t.string,
  src: t.string,
  alt: t.string,
  caption: t.string,
});

export type ImageCrop = t.TypeOf<typeof ImageCrop>;
export const ImageCrop = t.type({
  bottom: t.union([t.number, t.undefined]),
  left: t.union([t.number, t.undefined]),
  top: t.union([t.number, t.undefined]),
  right: t.union([t.number, t.undefined]),
});

export type ImageDimensions = t.TypeOf<typeof ImageDimensions>;
export const ImageDimensions = t.type({
  width: t.number,
  height: t.number,
});

export type KnowledgeArea = t.TypeOf<typeof KnowledgeArea>;
export const KnowledgeArea = t.type({
  title: t.string,
  thumbnailImage: Image,
  illustration: Image,
  content: t.array(Block),
});
