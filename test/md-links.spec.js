const mdLinks = require('../mdLinks');

describe('mdLinks', () => {
  it(
    'should reject promise if path does not exist and validate is undefine',
    () => mdLinks('./esta/ruta/noexiste.md').catch((error) => {
      expect(error.message).toBe('Path does no exist.');
    }),
  );
  it(
    'should reject promise if path does not exist and validate is true',
    () => mdLinks('./esta/ruta/noexiste.md', true).catch((error) => {
      expect(error.message).toBe('Path does no exist.');
    }),
  );
  it('should reject promise if file does not md', () => mdLinks('./test_files/file2.txt').catch((error) => {
    expect(error.message).toBe('File is not have an valid extention.');
  }));
  it(
    'Should return an array of length 3 for a valid file with 3 links',
    () => mdLinks('./test_files/file3.md').then((result) => {
      expect(result.length).toBe(3);
    }),
  );
  it(
    'should return an array of length 5 for a file folder with 5 links in total',
    () => mdLinks('./test_files', true).then((result) => {
      expect(result.length).toBe(5);
    }),
  );
});
