
const {convertToAbsolutePath, readExtFile, readMarkdownFile, getLinks}= require('./data');


//Crear la funcion mdLinks
const mdLinks = (pathReceived) => {
return new Promise (function(resolve,reject){
 convertToAbsolutePath(pathReceived).then((absolutePath)=>{
  absFilePath = absolutePath;
  readExtFile(absolutePath).then((result)=>{
    if(result){
      readMarkdownFile (absFilePath ).then(data => resolve(getLinks(data)));
    }
  }).catch((error) => reject(error));
 }).catch((error) => reject(error));
});
}

module.exports = mdLinks;