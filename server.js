const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const sysArt = require('./lib/sysArt');
// const questions = require('./lib/questions');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
)

function startSys() {
    console.log(sysArt);
    //main menu inquiry
}

//main menu function
function mainMenu() {
    inquirer
        .prompt(questions.menuQuestions)
        .then((response) => {
            switch (response) {
                case 'View All Employees':
                    viewTable(employees);
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewTable(roles);
                    break;
                case 'Add Role':
                    addRole();
                case 'View All Departments':
                    viewTable(departments);
                    break;
                case 'Add Department':
                    addDept();
                    break;
                case 'Quit':
                    console.log("Goodbye!");
                    break;
                default:
                    console.log('Incorrect input. Please try again.');
                    mainMenu();
                    break;
            }
        })
}

function addEmployee() {
    //use this function to inquire user
    //it should then insert the new employee into the db
    //log "added first + last name to the database"
    //lastly, open the main menu again
}

function updateEmployee() {
    //use this function to inquire user
    //it should update the employee's title in the db
    //log "updated first + last name into the db"
    //open main menu
}

function addDept() {
    //use this function to inquire user
    //it should then insert the new deptartment into the db
    //log "added dept to the database"
    //open main menu
}

function addRole() {
    //use this function to inquire user
    //it should then insert the new role into the db
    //log "added role to the database"
    //open main menu
}

function viewTable(table) {
    //use mysql query to show table user wants to see
    //display the table
    //open main menu
}

// console.table([{
//     name: 'foo',
//     age: 10
// }, {
//     name: 'bar',
//     age: 20
// }]);

// prints
// name age
// ---- ---
// foo 10
// bar 20
        
startSys();