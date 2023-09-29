const {
  convertToAbsolutePath, readExtFile, readMarkdownFile,
  getLinks, validateLink, readDirectory, verifyIsAnDirectory,
} = require('./data');

// Crear la funcion mdLinks
const mdLinks = (pathOrDir, validate = false) => new Promise((resolve, reject) => {
  convertToAbsolutePath(pathOrDir).then((absolutePath) => {
    const absFilePath = absolutePath;
    verifyIsAnDirectory(pathOrDir).then((result) => {
      if (result === true) {
        readDirectory(absolutePath).then((absolut) => {
          const resultFiles = absolut.map((directoryPath) => new Promise((resolve) => {
            resolve(mdLinks(directoryPath, validate));
          }));
          Promise.all(resultFiles).then((array) => resolve(array.flat()));
        });
      } else {
        readExtFile(absolutePath).then((boolVal) => {
          if (boolVal) {
            readMarkdownFile(absFilePath)
              .then((data) => getLinks(data, absolutePath))
              .then((arrayLinks) => {
                if (validate === false || validate === undefined) {
                  arrayLinks.forEach((element) => {
                    delete element.status;
                    delete element.ok;
                    delete element.id;
                  });
                  resolve(arrayLinks);
                } else {
                  const newArray = arrayLinks.map((element) => new Promise((resolve) => {
                    delete element.id;
                    validateLink(element.href)
                      .then((res) => {
                        element.status = res;
                        element.ok = 'OK';
                        resolve(element);
                      })
                      .catch((err) => {
                        element.status = err;
                        element.ok = 'FAIL';
                        resolve(element);
                      });
                  }));
                  Promise.all(newArray).then((results) => {
                    resolve(results);
                  });
                }
              });
          } else {
            reject(Error('File is not have an valid extention.'));
          }
        });
      }
    });
  }).catch((error) => reject(error));
});

module.exports = mdLinks;
