# md-links

## Descripción

**md-links** es una librería de `Node.js`, que obtiene y analiza los links contenidos en un archvo `Markdown`, para encontrar los links rotos o inválidos, es una herramienta útil para mantener accecible la información que se quiere compartir.


## Instalación
Para la instalación es necesario tener la última version de Node.js y basta con ejecutar el siguiente comando en la terminal:

``` sh
npm install AndyApG/DEV009-md-links
```

## Uso
Este paquete se puede usar directamente en la linea de comandos mediante la siguiente instruccion:
```sh
md-links *ruta **options
```
El parámetro **\*ruta** puede ser la ruta absoluta o relativa con respecto al directorio actual, de un archivo markdown o directorio que contenga un archivo o incluso más directorios con archivos con extencion válida ('.md', '.mkd', '.mdwn', '.mdown','.mdtxt', '.mdtext', '.markdown', '.text',). En el parámetro 
**\*\*options** las opciones disponibles son ```--validate``` y ```--stats```, estas se pueden omitir o combinar para obtener distintos resultados (ver ejemplos).

La librería solo esta disponible para su importacion mediante módulos CommonJS, de la siguiente forma:
```js
const mdlinks = require('md-links');
```
## Ejemplos
Para estos ejemplos se usara el directorio `test_files`, el cual tiene los siguientes archivos:
```text
./
├── file1.text
├── file2.txt
├── file3.md
├── dir1
    └── file4.md
```
### Obteniendo todos los links encontrados en los archivos y directorios, dentro del directorio dado.
Para obtener una lista de todos los links dentro de los archivos con extención válida dentro del  directorio `test_files` ejecuta la siguiente linea de código.
``` sh
md-links 'test_files/'
```
como resultado  se obtiene un arreglo de objetos que contienen las siguientes características de los links:
- href: URL encontrada.
- text: Texto que aparecía dentro del link.
- file: Ruta absoluta del archivo en donde se encuentra el link.
- line: Linea del texto en la que se encuentra el link.
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
### Comprobando el estado de todos los links encontrados en los archivos y directorios, dentro del directorio dado.
Al correr la siguiente linea de código.

```sh
md-links 'test_files/' --validate
```
se consulta el estado de cada link encontrado, agregando las propiedades siguientes:
- status : Código de respuesta HTTP.
- ok : Mensaje 'FAIL' en caso de fallo u 'OK' en caso de éxito.
```js
*** LINKS FOUND AND VALIDATED***
 [
  {
    href: 'https://www.google.com/',
    text: 'Google',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file3.md',
    status: 200,
    ok: 'OK',
    line: 1
  },
  {
    href: 'https://www.microsoft.com/es-mx/',
    text: 'Microsoft',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file3.md',
    status: 200,
    ok: 'OK',
    line: 2
  },
  {
    href: 'https://www.microsoft.com/es-mx/isfake',
    text: 'Fake',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/file3.md',
    status: 404,
    ok: 'FAIL',
    line: 3
  },
  {
    href: 'https://docs.github.com/es/packages/working-with-a-github-packages-registry/working-with-the-npm-registry',
    text: 'Consulta este link',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/dir1/file4.md',
    status: 200,
    ok: 'OK',
    line: 1
  },
  {
    href: 'https://www.microsoft.com/es-mx/isfake',
    text: 'Fake',
    file: '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/test_files/dir1/file4.md',
    status: 404,
    ok: 'FAIL',
    line: 2
  }
]
```
### Estadísticas de los links.
Si pasamos la opción --stats obtendremos un texto con estadísticas básicas sobre los links.
```sh
md-links 'test_files/' --stats
```
```js
*** STATISTICS ***
 
 * Total: 5 
 * Unique: 4
```
Finalmente si agregamos los dos valores, tendremos también el número de links rotos.
```sh
md-links 'test_files/' --validat --stats
```
```js
*** VALIDATED STATISTICS ***
 
 * Total: 5 
 * Unique: 4 
 * Broken: 2
```


