
const {convertToAbsolutePath, 
  readExtFile, readMarkdownFile, 
  getLinks, validateLink,
  readDirectory, verifyIsAnDirectory}= require('./data');


//Crear la funcion mdLinks
const mdLinks = (pathOrDir, validate = false) => {
  return new Promise (function(resolve,reject){
    convertToAbsolutePath(pathOrDir).then((absolutePath)=>{
      const absFilePath = absolutePath;
      verifyIsAnDirectory(pathOrDir).then((result) =>{
        if(result === true){
          readDirectory(absolutePath).then(result =>{
            const resultFiles = result.map(directoryPath => {
              return new Promise (function(resolve){
              resolve(mdLinks(directoryPath,validate));
              })
            })
            Promise.all(resultFiles).then(result => resolve(result.flat()));
          })
        }
        else{
          readExtFile(absolutePath).then((result)=>{
            if(result){
                readMarkdownFile (absFilePath)
                .then(data => getLinks(data,absolutePath))
                .then(arrayLinks => {
                  if(validate === false || validate === undefined){
                    arrayLinks.forEach(element =>{
                      delete element.status;
                      delete element.ok;
                      delete element.id;
                   })
                    resolve(arrayLinks);
              }else{
                const newArray = arrayLinks.map(element => {
                      return new Promise ((resolve)=>{
                        delete element.id;
                        validateLink(element.href)
                        .then((res) => {
                          element.status = res;
                          element.ok = 'OK';
                          resolve(element);
                        })
                        .catch((err) =>{
                          element.status = err;
                          element.ok = 'FAIL';
                          resolve(element);
                        });
                      })
                    });
                    Promise.all(newArray).then(result =>{
                     resolve(result);
                    })
                  }
                })
            }else{
                reject('El archivo no es md');
            }
          })
        }
      })
    }).catch((error) => reject(error)); 
  })
}

module.exports = mdLinks;

