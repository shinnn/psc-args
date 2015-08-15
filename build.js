'use strong';

const {execFile} = require('child_process');
const fs = require('fs');

const arrayUniq = require('array-uniq');
const {psc} = require('purescript');

execFile(psc, ['--help'], (err, stdout) => {
  if (err) {
    throw err;
  }

  const json = JSON.stringify(arrayUniq(stdout.match(/--[a-z]*-?[a-z]*/mg)).sort(), null, '  ');

  fs.writeFileSync('index.json', json + '\n');
  fs.writeFileSync('browser.js', `window.pscArgs = ${json};\n`.replace(/"/g, '\''));
});
