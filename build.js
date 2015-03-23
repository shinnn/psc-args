'use strict';

let execFile = require('child_process').execFile;
let fs = require('fs');

let arrayUniq = require('array-uniq');
let psc = require('purescript').psc;

execFile(psc, ['--help'], (err, stdout) => {
  if (err) {
    throw err;
  }

  let json = JSON.stringify(arrayUniq(stdout.match(/--[a-z]*-?[a-z]*/mg)).sort(), null, '  ');

  fs.writeFileSync('index.json', json + '\n');
  fs.writeFileSync('browser.js', `window.pscArgs = ${json};\n`.replace(/"/g, '\''));
});
