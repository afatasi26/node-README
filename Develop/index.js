// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generatorMarkdown = require("./generatorMarkdown");
var requireStack = require('require-stack')





// TODO: Create an array of questions for user input
inquirer.prompt ([ 
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'UserName'
    },

    {
        type: 'input',
        message: 'What is your email address?',
        name: 'Email'
    },

    {
        type: 'input',
        message: 'What is the title for this project?',
        name: 'Title'
    },

    {
        type: 'input',
        message: 'How would you describe your project?',
        name: 'Description'
    },

    {
        type: 'input',
        message: 'What needs to be installed for this app?',
        name: 'Installation'
    },

    {
        type: 'input',
        message: 'What is this app used for?',
        name: 'Usage'
    },

    {
        type: 'input',
        message: 'What license is used for this README?',
        name: 'License',
        default: 'MIT',
        choices: [
            'Apache 2.0',
            'MIT',
            'GNU GPL v3.0'
        ]
    },

    {
        type: 'input',
        message: 'Add Contributors',
        name: 'Contributor',
    },

    {
        type: 'input',
        messages: 'What command do you want to use to test this application?',
        name: 'Test',
    }

]).then(function(data) {
    axios
    .get(`https://api.github.com/users/${data.username}`)
    .then(function(res) {
        console.log(data.license)
        const getLicense = (license) => {
            if (license === 'MIT'){
                return  `\r[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`; 
            } else if (license === 'GNU GPL v3.0') {
                return `\r[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
            } else if (license === 'Apache 2.0') {
                return `\r[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`; 
            }
            
        }

        const readMe = `
## ${data.title}
## ${getLicense(data.license)}
## ${data.username} | ${data.email}
## ![img](${res.data.avatar_url})
## Table of Contents
1. Description
2. Installation
3. Usage
4. Contributors
5. Questions
# Description
${data.description}
# Installation
${data.installation}
# Usage
${data.usage}
# Contributors
${data.contributors}
# Questions
${data.questions}`
      fs.writeFile('README.md', readMe, (err) => {
        if (err) {
            throw err;
        }
    });
    });
});

   


// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log(success)
    );
}
// TODO: Create a function to initialize app
const init = async () => {
    try {
        await inquirer.prompt(welcome);
        console.log(letsGo);
        const data = await inquirer.prompt(questions);
        writeToFile('./output/README.md', generateMarkdown(data));
    } catch (err) {
        console.log(err);
    }
}

// Function call to initialize app
init()
