const inquirer = require("inquirer");

const menuQuestions = [ 
    {
        type: "list",
        message: "What would you like to do?",
        name: "menuChoice",
        choices: ["View All Employees", new inquirer.Separator(), "Add Employee", new inquirer.Separator(), "Update Employee Role", new inquirer.Separator(), "View All Roles", new inquirer.Separator(), "Add Role", new inquirer.Separator(), "View All Departments", new inquirer.Separator(), "Add Department", new inquirer.Separator(), "Quit" ]
    }
]