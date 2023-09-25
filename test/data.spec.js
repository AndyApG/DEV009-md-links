
const { convertToAbsolutePath, readExtFile, readMarkdownFile, getLinks, 
  validateLink,
  readDirectory, } = require('../data.js');
const fsAsync = require('fs/promises');
const path = require('path');
const axios = require('axios');
jest.mock('axios');


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
      const mockFn =  jest.spyOn(path, 'resolve');
      convertToAbsolutePath('README.md');
      expect(mockFn).toHaveBeenCalled();
    })

})

describe('readExtFile', ()=>{
  it('shoud return true for files whit valid extention',()=>{
    return readExtFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file1.text').then((result)=>{
      expect(result).toBe(true);
    })

  });

  it('shoud return false for files whit not vald extention',()=>{
    return readExtFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/index.js').then((err)=>{
      expect(err).toBe(false);
    })

  });

})

describe('readMarkdownFile', ()=>{
  it('should return files content correctly', () =>{
    return readMarkdownFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file1.text').then(
      result =>{
        expect(result).toBe('Hola estas leyendo el file1.');
    });
  })
  it('should call to function readFile from node: fs/promises', () =>{
    const spyFn =  jest.spyOn(fsAsync, 'readFile');
    readMarkdownFile('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file1.text');
    expect(spyFn).toHaveBeenCalled();
    
  })
})

describe('getLinks',()=>{
  const pathFileExample = '/ruta/ejemplo.md';
  const textWithoutLink = 'No links';
  const mdTextWhithLinks = `Este link de [Google](https://www.google.com/) es correcto, tambien el de
  [Microsoft](https://www.microsoft.com/es-mx/), pero el ultimo es 
  [Fake](https://www.microsoft.com/es-mx/isfake).`


  it('should return a empty array if the file does not contains links  ',()=>{
    expect(getLinks(textWithoutLink,pathFileExample)).toStrictEqual([]);
  })
  it('should return a array of objectes whith links  ',()=>{
   
    expect(getLinks(mdTextWhithLinks,pathFileExample)).toEqual(
    [{
      id : 0,
      href: 'https://www.google.com/',
      text: 'Google',
      file: '/ruta/ejemplo.md',
      status: 0,
      ok: ''
    },
    { id :  1,
      href: 'https://www.microsoft.com/es-mx/',
      text: 'Microsoft',
      file: '/ruta/ejemplo.md',
      status: 0,
      ok: ''
    },
    {
      id: 2,
      href: 'https://www.microsoft.com/es-mx/isfake',
      text: 'Fake',
      file: '/ruta/ejemplo.md',
      status: 0,
      ok: ''
    }]);
  })

})

describe('validateLink',()=>{
  it('should return 200 if the link exist',()=>{
    axios.get.mockResolvedValue({status:200});
    return validateLink('https://www.google.com/').then(result => {
      expect(result).toBe(200);
    })
  })
  it('should return 404 if the link does not exist',()=>{
    axios.get.mockRejectedValue({response:{status:404}});
    return validateLink('https://www.google.com/fake/')
    .catch(err => {expect(err).toBe(404)});
  })
})

describe('readDirectory',() =>{
  it('should return an object with the paths of files md, no md and directories in to directory',() =>{
    return(readDirectory('./test_files')).then(result => {
      expect(result).toStrictEqual(["test_files/file1.text",
       "test_files/file3.md", 
       "test_files/dir1/file4.md"])
    })
  })
})
