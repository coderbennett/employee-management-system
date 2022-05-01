const inquirer = require("inquirer");
const departments = require("../db/departments.json");
const roles = require("../db/roles.json");
const managers = require("../db/managers.json");
const employees = require("../db/employees.json");

function createDeptList(array) {
    let questionArray = [];

    for (let i = 0; i < array.length; i++) {
        questionArray.push(array[i].name);

        if (i !== array.length-1) {
            questionArray.push(new inquirer.Separator());
        }
    }
}

function createRoleList(array) {
    let questionArray = [];

    for (let i = 0; i < array.length; i++) {
        questionArray.push(array[i].title);

        if (i !== array.length-1) {
            questionArray.push(new inquirer.Separator());
        }
    }
}

function createManagerList(array) {
    let questionArray = ["None", new inquirer.Separator()];

    for (let i = 0; i < array.length; i++) {
        questionArray.push(array[i].first_name + " " + array[i].last_name);

        if (i !== array.length-1) {
            questionArray.push(new inquirer.Separator());
        }
    }
}

function createEmployeeList(array) {
    let questionArray = [];

    for (let i = 0; i < array.length; i++) {
        questionArray.push(array[i].first_name + " " + array[i].last_name);

        if (i !== array.length-1) {
            questionArray.push(new inquirer.Separator());
        }
    }
}

const menuQuestions = [ 
    {
        type: "list",
        message: "What would you like to do?",
        name: "menuChoice",
        choices: ["View All Employees", new inquirer.Separator(), "Add Employee", new inquirer.Separator(), "Update Employee Role", new inquirer.Separator(), "View All Roles", new inquirer.Separator(), "Add Role", new inquirer.Separator(), "View All Departments", new inquirer.Separator(), "Add Department", new inquirer.Separator(), "Quit" ]
    }
];

const deptQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"
    }
];

const roleQuestions = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary"
    },
    {
        type: "select",
        message: "Which department does the role belong to?",
        name: "roleDept",
        choices: createDeptList(departments)
    }
]

const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "employeeFirstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "employeeLastName"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: createRoleList(roles)
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "employeeRole",
        choices: createManagerList(managers)
    }
]

const updateEmployeeQuestions = [
    {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "employeeSelection",
        choices: createEmployeeList(employees)
    },
    {
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        name: "employeeRole",
        choices: createRoleList(roles)
    }
]

module.exports = [
    menuQuestions,
    deptQuestions,
    roleQuestions,
    employeeQuestions,
    updateEmployeeQuestions
];