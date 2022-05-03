const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
)

function createDeptList() {
    const sql = `SELECT name FROM department`;
    let questionArray = [];

    db.query(sql, (err, res) => {
        if(err) {
            res.serverStatus(500).json({ error: err.message});
            return;
        }
        for(let i = 0; i < res.length; i++) {
            questionArray.push(res[i].name);
            questionArray.push(new inquirer.Separator());
        }
    });
    return questionArray;
}

function createRoleList() {
    const sql = `SELECT title FROM roles`;
    let questionArray = [];

    db.query(sql, (err, res) => {
        if(err) {
            res.serverStatus(500).json({ error: err.message});
            return;
        }
        for(let i = 0; i < res.length; i++) {
            questionArray.push(res[i].title);
            questionArray.push(new inquirer.Separator());
        }
    });
    return questionArray;
}

function createManagerList() {
    const sql = `SELECT first_name, last_name FROM employee WHERE manager_id IS NULL`;
    let questionArray = ["None", new inquirer.Separator()];

    db.query(sql, (err, res) => {
        if(err) {
            res.serverStatus(500).json({ error: err.message});
            return;
        }
        for(let i = 0; i < res.length; i++) {
            questionArray.push(res[i].first_name + " " + res[i].last_name);
            questionArray.push(new inquirer.Separator());
        }
    });
    return questionArray;
}

function createEmployeeList() {
    const sql = `SELECT first_name, last_name FROM employee`;
    let questionArray = [];

    db.query(sql, (err, res) => {
        if(err) {
            res.serverStatus(500).json({ error: err.message});
            return;
        }
        for(let i = 0; i < res.length; i++) {
            questionArray.push(res[i].first_name + " " + res[i].last_name);
            questionArray.push(new inquirer.Separator());
        }
    });
    return questionArray;
}

const menuQuestions = [ 
    {
        type: "list",
        message: "What would you like to do?",
        name: "menuChoice",
        choices: ["View All Employees", new inquirer.Separator(), "Add Employee", new inquirer.Separator(), "Update Employee Role", new inquirer.Separator(), "View All Roles", new inquirer.Separator(), "Add Role", new inquirer.Separator(), "View All Departments", new inquirer.Separator(), "Add Department", new inquirer.Separator(), "Quit", new inquirer.Separator() ]
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
        type: "list",
        message: "Which department does the role belong to?",
        name: "roleDept",
        choices: createDeptList()
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
        choices: createRoleList()
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "employeeManager",
        choices: createManagerList()
    }
]

const updateEmployeeQuestions = [
    {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "employeeSelection",
        choices: createEmployeeList()
    },
    {
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        name: "employeeRole",
        choices: createRoleList()
    }
]

module.exports = [
    menuQuestions,
    deptQuestions,
    roleQuestions,
    employeeQuestions,
    updateEmployeeQuestions
];