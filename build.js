'use strict';

const execFile = require('child_process').execFile;
const fs = require('fs');

const arrayUniq = require('array-uniq');
const psc = require('purescript').psc;

execFile(psc, ['--help'], (err, stdout) => {
  if (err) {
    throw err;
  }

  let json = JSON.stringify(arrayUniq(stdout.match(/--[a-z]*-?[a-z]*/mg)).sort(), null, '  ');

  fs.writeFileSync('index.json', json + '\n');
  fs.writeFileSync('browser.js', `window.pscArgs = ${json};\n`.replace(/"/g, '\''));
});
