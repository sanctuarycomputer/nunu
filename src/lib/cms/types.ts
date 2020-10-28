import * as t from 'io-ts';

export type HomePage = t.TypeOf<typeof HomePage>;
export const HomePage = t.type({
  title: t.string,
});
