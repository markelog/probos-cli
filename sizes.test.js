const sizes = require('./sizes');

test('test the size without root', () => {
  const result = sizes(undefined, ['./sizes.fixtures.js']);
  expect(result).toEqual({
    'sizes.fixtures.js': {
      gzip: 37,
      size: 21
    }
  });
});

test('test the size with root', () => {
  const result = sizes(__dirname, ['./sizes.fixtures.js']);
  expect(result).toEqual({
    'sizes.fixtures.js': {
      gzip: 37,
      size: 21
    }
  });
});
