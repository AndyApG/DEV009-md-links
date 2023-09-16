const mdLinks = require('../md-links.js');


describe('mdLinks', () => {
  it('should reject promise if path does not exist', () => {
    return mdLinks('./esta/ruta/noexiste.md').catch((error)=>{
      expect(error).toBe('No existe la ruta');
    })
  });
  it('should reject promise if file does not md', () => {
    return mdLinks('./test_files/file2.txt').catch((error)=>{
      expect(error).toBe('El archivo no es md');
    })
  });
  
  /*
  it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
    return mdLinks('miArchivo.md').then((result) => {
      expect();// fata terminar
    });
  });
  */
});


