'use strong';

const requireBowerFiles = require('require-bower-files');
const test = require('tape');

function runTest(description, main) {
  test(description, t => {
    t.plan(2);

    t.ok(Array.isArray(main), 'should be an array.');
    t.ok(main.every(val => typeof val === 'string'), 'should include only strings.');
  });
}

runTest('require(\'psc-args\')', require('./'));

global.window = {};
requireBowerFiles({self: true});

runTest('window.pscArgs', global.window.pscArgs);
