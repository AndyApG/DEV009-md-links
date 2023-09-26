#!/usr/bin/env node

const mdLinks = require('./mdLinks');

const path = process.argv[2];

mdLinks(path,true).then((result)=>{
  console.log(result);
}).catch((error)=>{
  console.log(error);
});

