module.exports = {
  content: ['debug/example.html'],
  css: ['debug/purge-please.css'],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          const theMatches = content.match(/(?:[A-Za-z0-9]|-|_|:|<|>|@)+/g) || [];
          console.log({ content, theMatches });
          return theMatches;
        }
      },
      extensions: ['html'],
    },
  ],
};

/* RESULT:
{
  content: '<div class=":hover--opacity:40">this is a test</div>',
  theMatches: [
      '<div',
      'class',
      ':hover--opacity:40',
      '>this',
      'is',
      'a',
      'test<',
      'div>'
  ]
}
*/
