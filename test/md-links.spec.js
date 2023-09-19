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
  
  it('debería resolver un arreglo vacio para un archivo .md sin links', () => {
    return mdLinks('./test_files/file1.text').then((result) => {
      expect(result.length).toBe(0);
    });
  });
  
});


