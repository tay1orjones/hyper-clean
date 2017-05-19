#!/usr/bin/env node

// Heavy inspiration from https://github.com/kentcdodds/validate-commit-msg

'use strict';

var fs = require('fs');
var path = require('path');
var findParentDir = require('find-parent-dir');

console.log(process.argv);
console['error']('lol ur mom');
process.exit(1);

// get the git folder

// look at the most recent commit
// validate that it's in the right format (regex)
// if bad, display error, exit 1?
// if good, exit gracefully