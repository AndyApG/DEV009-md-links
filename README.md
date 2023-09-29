# md-links

## Descripción

**md-links** es una libreria de `Node.js`, que obtiene y analiza los links contenidos en un archvo `Markdown`, para encontrar los links rotos o inválidos, es una herramienta útil de mantener accecible la información que se quiere compartir.


## Instalación
Para la instalación es necesrio tener la última version de Node.js y basta con ejecutar el siguiente comando en la terminal:

``` sh
npm install AndyApG/DEV009-md-links
```

## Uso
Esta libreia se puede usar directamente en la linea de comandos mediante la siguiente instruccion:
```sh
md-links *ruta **options
```
El parametro **\*ruta** puede ser la ruta absoluta o relativa con respecto al directorio actual, de un archivo markdown o directorio que contenga un archivo o incluso más directorios con archivos con extencion valida ('.md', '.mkd', '.mdwn', '.mdown','.mdtxt', '.mdtext', '.markdown', '.text',). En el parametro 
**\*\*options** las opciones disponibles son:
  ```--validate``` y ```--stats```, estas se pueden omitir o combinar para obtener distintos resultados (ver ejemplos).

La libreria solo esta disponible para su importacion mediante módulos CommonJS, de la siguiente forma:
```js
const mdlinks = require('md-links');
```
## Ejemplos
Para estos ejemplos se usara el directorio `test_files` el cual tiene los siguientes archivos:
```text
./
├── file1.text
├── file2.txt
├── file3.md
├── dir1
    └── file4.md
```
``` sh
md-links 'test_files/'
```
```js
*** LINKS FOUND ***
 [
  {
    href: 'https://www.google.com/',
    text: 'Google',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file3.md',
    line: 1
  },
  {
    href: 'https://www.microsoft.com/es-mx/',
    text: 'Microsoft',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file3.md',
    line: 2
  },
  {
    href: 'https://www.microsoft.com/es-mx/isfake',
    text: 'Fake',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file3.md',
    line: 3
  },
  {
    href: 'https://docs.github.com/es/packages/working-with-a-github-packages-registry/working-with-the-npm-registry',
    text: 'Consulta este link',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/dir1/file4.md',
    line: 1
  },
  {
    href: 'https://www.microsoft.com/es-mx/isfake',
    text: 'Fake',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/dir1/file4.md',
    line: 2
  }
]
```

```sh
md-links 'test_files/' --validate
```
```sh
md-links 'test_files/' --stats
```
```sh
md-links 'test_files/' --validat --stats
```


