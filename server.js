const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const sysArt = require('./lib/sysArt');
const questions = require('./lib/questions');

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
    mainMenu();
}

//main menu function
function mainMenu() {
    inquirer
        .prompt(questions[0])
        .then((response) => {
            switch (response.menuChoice) {
                case 'View All Employees':
                    viewTable("employees");
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewTable("roles");
                    break;
                case 'Add Role':
                    addRole();
                case 'View All Departments':
                    viewTable("departments");
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
        });
}

function addEmployee() {
    //use this function to inquire user
    inquirer
        .prompt(questions[3])
        .then((response) => {

            let roleId;
            let managerId;

            //query for the role id with the user's input of the title
            db.query(`SELECT id FROM roles WHERE title = ?`, response.employeeRole, (err, result) => {
                roleId = result;
            });

            //if the employee is a manager the response is none
            if (response.employeeManager === "None") {
                managerId = NULL;
            } else {
                //split the string into first and last names
                let managerName = response.employeeManager.split(" ");

                //query the employee id from the first and last name
                db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, managerName, (err, result) => {
                    managerId = result;
                });
            }

            //now insert the new employee data into the database
            db.query(`INSERT INTO employee WHERE first_name = ? AND last_name = ? AND role_id = ? AND manager_id = ?`,
            [
                response.employeeFirstName,
                response.employeeLastName,
                roleId,
                managerId
            ], (err, result) => {
                console.log("Added " + response.employeeFirstName + " " + response.employeeLastName + " to the database.");
                mainMenu();
            });
        });
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
    inquirer
        .prompt(questions[1])
        .then((response) => {
            db.query(`INSERT INTO department WHERE name = ?`, response.deptName, (err, result) => {
                console.log("Added " + response.deptName + " to the database.");
                mainMenu();
            });
        });
}

function addRole() {
    //use this function to inquire user
    //it should then insert the new role into the db
    //log "added role to the database"
    //open main menu
}

function viewTable(table) {
    let sql;

    switch (table) {
        case 'employees':
            sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, IFNULL(CONCAT(m.first_name, ', ', m.last_name), NULL) AS manager FROM employee LEFT JOIN employee AS m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY employee.id`;
            break;
        case 'roles':
            sql = `SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles INNER JOIN department ON department.id = roles.department_id ORDER BY roles.id`;
            break;
        default:
            sql = `SELECT * FROM department`;
            break;
    }

    db.query(sql, (err, res) => {
        if(err) {
            res.serverStatus(500).json({ error: err.message});
            return;
        }
        console.table(res);
        mainMenu();
    });

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