'use strict'

const emojis = require('./emojis');

// Create inquier.js questions object
function createQuestions() {

    const choices = emojis.map((emoji) => {
        return {
            "name": `${emoji.display}  - ${emoji.description}`,
            "value": emoji.tag
        }
    });

    return [
        {
            type: 'list',
            name: 'type',
            message: "Select the type of change you're committing:",
            choices: choices
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Write a short description:'
        },
        {
            type: 'input',
            name: 'issueNumber',
            message: 'GitHub issue #:'
        },
        {
            type: 'confirm',
            name: 'closesIssue',
            message: 'Does this commit fully resolve and close the related issue?',
            default: false
        }
    ]
}

// Format the git commit message from given answers.
function format(answers) {
    const type = answers.type + ' ';
    const description = answers.subject.trim() + ',';
    const closesIssue = answers.closesIssue ? ' close' : '';
    const issueNumber = ' #' + answers.issueNumber;
    // console.log(type + description + closesIssue + issueNumber);
    return type + description + closesIssue + issueNumber;
}


// Export an object containing a `prompter` method.
// This object is used by `commitizen`.
module.exports = {
    prompter: function(cz, commit) {
        cz
        .prompt(createQuestions())
        .then(format)
        .then(commit);
    }
}