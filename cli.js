#!/usr/bin/env node
const chalk = require('chalk');
const mdLinks = require('./mdLinks');

const path = process.argv[2];
const options = process.argv.slice(3);

if (options.includes('--validate')) {
  mdLinks(path, true).then((result) => {
    if (options.includes('--stats')) {
      const set = new Set(result.map((results) => results.href));
      const broken = result.filter((item) => item.ok === 'FAIL').length;
      console.log(
        chalk.hex('#7F00FF').bold('*** VALIDATED STATISTICS ***\n'),
        chalk.green('\n * Total:'),
        result.length,
        '\n',
        chalk.blue('* Unique:'),
        set.size,
        '\n',
        chalk.hex('#FF0000').bold('* Broken:'),
        broken,
      );
    } else {
      result.length === 0
        ? console.log(chalk.hex('#7F00FF').bold('*** NO ONE LINK WAS FOUND ***\n'))
        : console.log(chalk.hex('#7F00FF').bold('*** LINKS FOUND AND VALIDATED***\n'), result);
    }
  }).catch((error) => {
    console.log(chalk.hex('#FF0000').bold('* Error :'), error.message);
  });
} else if (options.includes('--stats')) {
  mdLinks(path).then((result) => {
    const set = new Set(result.map((results) => results.href));
    console.log(
      chalk.hex('#7F00FF').bold('*** STATISTICS ***\n'),
      chalk.green('\n * Total:'),
      result.length,
      '\n',
      chalk.blue('* Unique:'),
      set.size,
    );
  }).catch((error) => {
    console.log(chalk.hex('#FF0000').bold('* Error :'), error.message);
  });
} else {
  mdLinks(path).then((result) => {
    result.length === 0
      ? console.log(chalk.hex('#7F00FF').bold('*** NO ONE LINK WAS FOUND ***\n'))
      : console.log(chalk.hex('#7F00FF').bold('*** LINKS FOUND ***\n'), result);
  }).catch((error) => {
    console.log(chalk.hex('#FF0000').bold('* Error :'), error.message);
  });
}
