
const purgecss = require("@fullhuman/postcss-purgecss");
const autoprefixer = require("autoprefixer");

BasementExtractor = (content) => content.match(/[A-Za-z0-9-_:\/]+/g) || [];

module.exports = {
  plugins: [
    autoprefixer,
    ...(process.env.NODE_ENV === "production"
      ? [
          purgecss({
            content: ["./**/*.liquid", "./**/*.ts"],
            extractors: [
              {
                extractor: BasementExtractor,
                extensions: ["liquid"]
              }
            ]
          })
        ]
      : [])
  ]
};
