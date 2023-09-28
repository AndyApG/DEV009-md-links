# md-links

## Descripción

**md-links** es una libreria de javascript, que obtiene los links contenidos en un archvo markDown, verifica el estatus y cuenta si hay o no repetidos.


## Instalación
Para la instalacion es necesrio tener la ultima version de nodeJS.

``` sh
npm install AndyApG/DEV009-md-links
```

## Uso
Esta libreia se puede usar directamente en la linea de comandos mediante la instruccion.
```sh
node md-links *ruta **options
```

```sh
npx md-links *ruta **options

```
El parametro **\*ruta** puede ser la ruta absoluto o relativa con respecto al directorio actual, de un archivo markdown o directorio que contenga un archivo o incluso más directorios. En el parametro 
**\*\*options** las opciones disponibles son:
  ```--validate``` y ```--stats```, estas se pueden omitir o combinar para obtener distintos resultados (ver ejemplos).

o bien, se puede importar
```js
const mdlinks = require('md-links');
```
## Ejemplos

