// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require('fs');
const generate = require("./utils/generateMarkdown");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const axios = require('axios');

//licenses
const apache = "Licensed under the [Apache License](https://spdx.org/licenses/Apache-2.0.html).";
const gnu    = "Licensed under the [GNU GPLv3 License](https://spdx.org/licenses/GPL-3.0-or-later.html).";
const mit    = "Licensed under the [MIT License](https://spdx.org/licenses/MIT.html).";








// TODO: Create an array of questions for user input
const questions = [ 
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
        name: 'Contributors',
    },

    {
        type: 'input',
        messages: 'What command do you want to use to test this application?',
        name: 'Test',
    }

]; 
inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = 'https://api.github.com/users/${data.username}';

        
        
            
          fs.writeFile("README.md", generate(data), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("Successful README created!");
          });
        });


   



// TODO: Create a function to initialize app
function init() {

}


// Function call to initialize app
init()
