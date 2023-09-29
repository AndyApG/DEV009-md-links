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



