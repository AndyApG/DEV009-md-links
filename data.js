const fs = require('fs');
const path = require('path');
const fsAsync = require('fs/promises');



function convertToAbsolutePath(pathReceived){
    return new Promise ( function(resolve,reject){
 
        if (fs.existsSync(pathReceived)){
            resolve (path.resolve(pathReceived));
        }
        reject('No existe la ruta');
    })
}

function readExtFile(pathReceived){
    const validExt = [
        '.md', '.mkd', '.mdwn', '.mdown',
        '.mdtxt', '.mdtext', '.markdown', '.text'
    ]
    const fileName = path.basename(pathReceived);
 return new Promise((resolve,reject) =>{
    if (validExt.includes(path.extname(fileName))){
        resolve(true);
    }else reject ('El archivo no es md');
 })
    
}

function readMarkdownFile (pathFile){
   return new Promise((resolve, reject) => {
    fsAsync.readFile(pathFile,'utf8').then(data => resolve(data)).catch(err => {reject(err)});
   })
}


module.exports = { convertToAbsolutePath, readExtFile, readMarkdownFile }