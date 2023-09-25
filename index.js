const mdLinks = require('./md-links');

mdLinks('test_files',true).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error);
});

