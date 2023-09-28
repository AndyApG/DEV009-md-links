const axios = require('axios');
const fs = require('fs');
const path = require('path');
const fsAsync = require('fs/promises');
const cheerio = require('cheerio');
const md = require('markdown-it')();

function convertToAbsolutePath(pathReceived) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(pathReceived)) {
      resolve(path.resolve(pathReceived));
    }
    reject('Path does no exist.');
  });
}

function readExtFile(pathReceived) {
  const validExt = [
    '.md', '.mkd', '.mdwn', '.mdown',
    '.mdtxt', '.mdtext', '.markdown', '.text',
  ];
  const fileName = path.basename(pathReceived);
  return new Promise((resolve) => {
    if (validExt.includes(path.extname(fileName))) {
      resolve(true);
    } else resolve(false);
  });
}

function readMarkdownFile(pathFile) {
  return new Promise((resolve, reject) => {
    fsAsync.readFile(pathFile, 'utf8').then((data) => resolve(data)).catch((err) => { reject(err); });
  });
}

function getLinks(fileCont, pathFile) {
  const arrayLinks = new Array();
  const htmlFile = md.render(fileCont);
  const doc = cheerio.load(`<html>${htmlFile}</html>`);
  const listItems = doc('html').find('a');
  listItems.map((i, el) => {
    arrayLinks.push({
      id: i,
      href: el.attribs.href,
      text: el.children[0].data,
      file: pathFile,
      status: 0,
      ok: '',
    });
  });
  return arrayLinks.filter((i) => i.href.includes('http'));
}

function validateLink(link) {
  return new Promise((resolve, reject) => {
    axios.get(link)
      .then((response) => {
        resolve(response.status);
      })
      .catch((error) => {
        reject(error.response.status);
      });
  });
}

const paths = Array();
function readDirectory(dir) {
  const dirs = fs.readdirSync(dir, { encoding: 'utf8', withFileTypes: true });
  dirs.forEach((dirent) => {
    const pathFromDir = path.join(dirent.path, dirent.name);
    promise = readExtFile(pathFromDir).then((res) => {
      if (res) {
        paths.push(pathFromDir);
      } else if (dirent.isDirectory()) {
        readDirectory(pathFromDir);
      }
      return paths;
    }).then((result) => result);
  });
  return promise;
}

function verifyIsAnDirectory(dir) {
  return new Promise((resolve) => {
    if (fs.statSync(dir).isDirectory()) {
      resolve(true);
    } else resolve(false);
  });
}

module.exports = {
  convertToAbsolutePath,
  readExtFile,
  readMarkdownFile,
  getLinks,
  validateLink,
  readDirectory,
  verifyIsAnDirectory,
};
