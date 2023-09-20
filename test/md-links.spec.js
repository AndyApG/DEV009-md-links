const mdLinks = require('../md-links.js');
const {readMarkdownFile}= require('../data.js');

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
  
  it('debería resolver un arreglo de longitud 3 para un archivo .md sin links', () => {
    return mdLinks('./test_files/file3.md').then((result) => {
      expect(result.length).toBe(3);
      
    });
   
  });
    
});


