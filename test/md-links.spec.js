const mdLinks = require('../mdLinks');

describe('mdLinks', () => {
  it('should reject promise if path does not exist and validate is undefine', () => mdLinks('./esta/ruta/noexiste.md').catch((error) => {
    expect(error).toBe('No existe la ruta');
  }));
  it('should reject promise if path does not exist and validate is true', () => mdLinks('./esta/ruta/noexiste.md', true).catch((error) => {
    expect(error).toBe('No existe la ruta');
  }));
  it('should reject promise if file does not md', () => mdLinks('./test_files/file2.txt').catch((error) => {
    expect(error).toBe('El archivo no es md');
  }));
  it('debería resolver un arreglo de longitud 3 para un archivo .md con 3 links', () => mdLinks('./test_files/file3.md').then((result) => {
    expect(result.length).toBe(3);
  }));
  it('debería resolver un arreglo de longitud 3 para una carpeta con un archivo .md con 3 links', () => mdLinks('./test_files', true).then((result) => {
    expect(result.length).toBe(5);
  }));
});
