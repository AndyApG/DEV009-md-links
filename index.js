const mdLinks = require('./md-links');

mdLinks('README.md').then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error);
});

