const axios = require('axios');
const fs = require('fs');
const path = require('path');
const fsAsync = require('fs/promises');
const cheerio = require('cheerio');
let md = require('markdown-it')();



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
 return new Promise((resolve) =>{
    if (validExt.includes(path.extname(fileName))){
        resolve(true);
    }else resolve (false);
 })
    
}

function readMarkdownFile (pathFile){
   return new Promise((resolve) => {
    fsAsync.readFile(pathFile,'utf8').then(data => resolve(data)).catch(err => {reject(err)});
   })
}

function getLinks(fileCont,pathFile){
    const arrayLinks = [];
    const htmlFile =md.render(fileCont);
    const doc = cheerio.load(`<html>${htmlFile}</html>`);
    const listItems = doc('html').find('a');
    listItems.map((i, el)=>{
        arrayLinks.push({
            num :i,
            href : el.attribs.href,
            text: el.children[0].data,
            file: pathFile,
            status: 0,
            ok : '',
        });
    });
    return arrayLinks.filter(i => i.href.includes('http'));
}

function validateLink(link){
    return new Promise ((resolve,reject) =>{
    axios.get(link)
    .then(response => {
        resolve(response.status);
        return;
    })
    .catch(error => {
       reject(error.response.status);
       return;
    });
})}
module.exports = { 
    convertToAbsolutePath, 
    readExtFile, 
    readMarkdownFile, 
    getLinks, 
    validateLink,
}