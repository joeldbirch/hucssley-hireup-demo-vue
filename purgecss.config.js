module.exports = {
  content: ['dist/index.html', 'dist/js/*.js'],
  css: ['dist/css/*.css'],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/(?:[A-Za-z0-9]|-|_|:|<|>|@)+/g) || [];
        }
      },
      extensions: ['html', 'js'],
    },
  ],
};
