
const {convertToAbsolutePath, 
  readExtFile, readMarkdownFile, 
  getLinks, validateLink}= require('./data');


//Crear la funcion mdLinks
const mdLinks = (pathReceived, validate = false) => {
return new Promise (function(resolve,reject){
 convertToAbsolutePath(pathReceived).then((absolutePath)=>{
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
          arrayLinks.forEach(element => {
            delete element.num;
            validateLink(element.href)
            .then((res) => {
              element.status = res;
              element.ok = 'OK';
              console.log(element);
            })
            .catch((err) =>{
              element.status = err;
              element.ok = 'FAIL';
              console.log(element);
            });
          });
        }
        
      })
    }else{
      reject('El archivo no es md');
    }
  });
 }).catch((error) => reject(error));
});
}

module.exports = mdLinks;