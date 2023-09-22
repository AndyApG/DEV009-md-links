
const {convertToAbsolutePath, 
  readExtFile, readMarkdownFile, 
  getLinks, validateLink,
  readDirectory}= require('./data');


//Crear la funcion mdLinks
const mdLinks = (directory, validate = false) => {
  return new Promise((resolve, reject) => {
    readDirectory(directory).then(result =>{
      const resultFiles = result.pathMd.map(directoryPath => {
         return new Promise (function(resolve,reject){
          convertToAbsolutePath(directoryPath).then((absolutePath)=>{
          const absFilePath = absolutePath;
          readExtFile(absolutePath)
          .then((result)=>{
            if(result){
              readMarkdownFile (absFilePath)
              .then(data => getLinks(data,absolutePath))
              .then(arrayLinks => {
                if(validate === false || validate === undefined){
                  arrayLinks.forEach(element =>{
                    delete element.status;
                    delete element.ok;
                    delete element.num;
                 })
                  resolve(arrayLinks);
                }else{
                  const newArray = arrayLinks.map(element => {
                    return new Promise ((resolve)=>{
                      delete element.num;
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
           });
          }).catch((error) => reject(error));
        })
      });
      Promise.all(resultFiles).then(result =>{
        resolve(result);
      })
    }).catch(error => reject(error));
  })
 
}

module.exports = mdLinks;