
const {convertToAbsolutePath, 
  readExtFile, readMarkdownFile, 
  getLinks, addStatusAndOk}= require('./data');


//Crear la funcion mdLinks
const mdLinks = (pathReceived, validate = false) => {
return new Promise (function(resolve,reject){
 convertToAbsolutePath(pathReceived).then((absolutePath)=>{
  absFilePath = absolutePath;
  readExtFile(absolutePath)
  .then((result)=>{
    if(result){
      readMarkdownFile (absFilePath)
      .then(data =>{
        let arrayLinks = getLinks(data,absolutePath);
        if(validate === false || validate === undefined){
          resolve(arrayLinks);
        }else{        
          resolve(addStatusAndOk(arrayLinks[0]));
        }
      });
    }else{
      reject('El archivo no es md');
    }
  })
 }).catch((error) => reject(error));
});
}

module.exports = mdLinks;