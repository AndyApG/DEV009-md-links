const mdLinks = require('./md-links');

mdLinks('./test_files/file3.md').then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error);
});

