
const { convertToAbsolutePath, readExtFile, readMarkdownFile, getLinks, 
  validateLink, } = require('../data.js');
const fsAsync = require('fs/promises');
const path = require('path');

const rutas = [
    '../DEV009-social-network/README.md',
    'README.md',
    '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/docs/01-milestone.md',
    './/docs/02-milestone.md',
  
  ];

describe('convertToAbsolutePath', () => {
    it('should reject promise if path does not exist', () => {
      return convertToAbsolutePath('./esta/ruta/noexiste.md').catch((err)=>{
        expect(err).toBe('No existe la ruta');
      })
    });
    it('should return an absolut path', () => {
        return convertToAbsolutePath('README.md').then((result)=>{
          expect(result).toBe('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/README.md');
        })
      });
    it('should call to function resolve from path', () =>{
      jest.mock('path');
      const mockFn =  jest.spyOn(path, 'resolve');
      convertToAbsolutePath('README.md');
      expect(mockFn).toHaveBeenCalled();
    })

})

describe('readExtFile', ()=>{
  it('shoud return true for files whit extention valid',()=>{
    return readExtFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file1.text').then((result)=>{
      expect(result).toBe(true);
    })

  });

  it('shoud return false for files whit extention not valid',()=>{
    return readExtFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/index.js').then((err)=>{
      expect(err).toBe(false);
    })

  });

})

describe('readMarkdownFile', ()=>{
  it('should call to function readFile from node: fs/promises', () =>{
    jest.mock('fs/promises');
    const spyFn =  jest.spyOn(fsAsync, 'readFile');
    readMarkdownFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file1.text');
    expect(spyFn).toHaveBeenCalled();
  })
})

describe('getLinks',()=>{
  it('should return a empty array if the file does not contains links  ',()=>{
    expect(getLinks('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file1.text')).toStrictEqual([]);
  })
})

describe('validateLink',()=>{
  it('should return 200 if the link exist',()=>{
    return validateLink('https://www.google.com/').then(result => {
      expect(result).toBe(200);
    })
  })
  it('should return 404 if the link exist',()=>{
    return validateLink('https://www.google.com/').catch(err => {
      expect(err).toBe(404);
    })
  })
})

