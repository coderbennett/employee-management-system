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
}

function addEmployee() {
    //use this function to inquire user
    //it should then insert the new employee into the db
    //log "added first + last name to the database"
    //lastly, open the main menu again
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