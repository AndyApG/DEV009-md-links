const {
  convertToAbsolutePath, readExtFile, readMarkdownFile,
  getLinks, validateLink, readDirectory, verifyIsAnDirectory,
} = require('./data');

// Crear la funcion mdLinks
const mdLinks = (pathOrDir, validate = false) => new Promise((resolve, reject) => {
  convertToAbsolutePath(pathOrDir).then((absolutePath) => {
    verifyIsAnDirectory(absolutePath).then((result) => {
      if (result === true) {
        readDirectory(absolutePath).then((pathsFiles) => {
          const resultFiles = pathsFiles.map((pathFile) => mdLinks(pathFile, validate));
          Promise.all(resultFiles).then((array) => resolve(array.flat()));
        });
      } else {
        readExtFile(absolutePath).then((isValid) => {
          if (isValid === true) {
            readMarkdownFile(absolutePath)
              .then((data) => getLinks(data, absolutePath))
              .then((links) => {
                if (validate === false || validate === undefined) {
                  links.forEach((element) => {
                    delete element.status;
                    delete element.ok;
                    delete element.id;
                  });
                  resolve(links);
                } else {
                  const linksWhitStatus = links.map((element) => new Promise((resolve) => {
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

                  Promise.all(linksWhitStatus).then((results) => {
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
