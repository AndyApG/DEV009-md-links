#!/usr/bin/env node

const mdLinks = require('./mdLinks');

const path = process.argv[2];
const options = process.argv.slice(3);

if (options.includes('--validate')) {
  mdLinks(path, true).then((result) => {
    if (options.includes('--stats')) {
      const set = new Set(result);
      const broken = result.filter((item) => item.ok === 'FAIL').length;
      console.log(' Total', result.length, '\n', 'Unique:', set.size, '\n', 'Broken:', broken);
    }
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
} else if (options.includes('--stats')) {
  mdLinks(path).then((result) => {
    const set = new Set(result);
    console.log(' Total', result.length, '\n', 'Unique:', set.size);
  }).catch((error) => {
    console.log(error);
  });
} else {
  mdLinks(path).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}
