#!/usr/bin/env node

// Heavy inspiration from https://github.com/kentcdodds/validate-commit-msg

'use strict';

var fs = require('fs');
var path = require('path');
var findParentDir = require('find-parent-dir');
var chalk = require('chalk');
var emojis = require('./emojis');

// fixup! and squash! are part of Git, commits tagged with them are not intended
// to be merged, cf. https://git-scm.com/docs/git-commit
// https://regex101.com/r/xg2yHR/1
// TODO: Improve so that non-word chars are allowed
// example: '.nvmrc' or 'semantic-release' both fail currently
var PATTERN = /^((fixup! |squash! )?(:\w+:){1}((\s\w+)+),(\s\w+)?\s#\d+)(?:\n|$)/;
var MERGE_COMMIT_PATTERN = /^Merge /;

// declare helper functions
var bufferToString = function (buffer) {
    return hasToString(buffer) && buffer.toString();
};

var hasToString = function (x) {
    return x && typeof x.toString === 'function';
};

var error = function() {
    console.error(chalk.red.bold(arguments[0]));
};

var warn = function () {
    console.warn(chalk.yellow(arguments[0]));
};

// read/parse the commit message
var commitMsgPath = path.resolve("./", process.env.GIT_PARAMS);
fs.readFile(commitMsgPath, function readFile(err, buffer) {
    if(err && err.code !== 'ENOENT') {
        throw err;
    }

    var isFile = !err;
    var message = (
        isFile
        ? bufferToString(buffer)
        : commitMsgPath
    );
    
    // validate that it's in the right format (regex)
    if (message === '') {
        error('Aborting commit due to empty commit message.');
        process.exit(1);
    }

    if (MERGE_COMMIT_PATTERN.test(message)) {
        warn('Merge commit detected, bypassing commit validation');
        process.exit(0);
    }

    if (!PATTERN.test(message)) {
        error('Commit messages in this repo must be in the following format:\
            \n\n  :emoji: short description here, close #45\
            \n\nNeed some help? Take a look at this guide:\
            \nhttps://git.io/vHvYk');
        process.exit(1);
    }

    // test for valid type
    var commitEmoji = message.split(":")[1];
    var isValidEmoji = false;
    for (let emoji of emojis) {
        if (emoji.name === commitEmoji) {
            isValidEmoji = true;
        }
    }

    if (!isValidEmoji) {
        var emojiList='';
        for (let emoji of emojis) {
            emojiList += `${emoji.display}  ${emoji.tag} - ${emoji.description} \n`;
        }

        error(`:${commitEmoji}: is not an allowed emoji.\
            \n\nAllowed emojis are:\
            \n${emojiList}\
            \n\nNeed some help? Take a look at this guide:\
            \nhttps://git.io/vHvYk`);
        process.exit(1);
    }

    // // for testing:
    // console.log(chalk.green.bold("PASSED: WOULD HAVE COMMITTED"));
    // process.exit(1);

});
