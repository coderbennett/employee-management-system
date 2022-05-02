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
    //initialize all the variables we will need here
    let roleId;
    let managerId;
    let managerName;
    let queryArray;

    inquirer
        .prompt(questions[3])
        .then((response) => {
            queryArray = [response.employeeFirstName, response.employeeLastName];
            //split the string into first and last names
            managerName = response.employeeManager.split(" ");
            console.log("Manager name: " + managerName);

            //query for the role id with the user's input of the title
            db.query(`SELECT id FROM roles WHERE title = ?`, response.employeeRole, (err, result) => {
                console.log("Result for Role select query: " + result[0].id);
                roleId = result[0].id;
                console.log("Role ID: " + roleId);
                queryArray.push(roleId);
            });

            //if the employee is a manager the response is none
            if (managerName === "None") {
                managerId = null;
            } else {

                //query the employee id from the first and last name
                db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, managerName, (err, result) => {
                    if(err) {
                        console.error(err);
                    }
                    console.log("Result from managerID select query: " + result[0].id);
                    managerId = result[0].id;
                    queryArray.push(managerId);
                    console.log("Manager ID: " + managerId);
                });
            }

            //we have to set a timeout for this query, otherwise it runs before the others complete
            setTimeout(() => {
                console.log(queryArray);
                //now insert the new employee data into the database
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                queryArray, (err, result) => {
                    if(err) {
                        console.error(err);
                    }
                    console.log(result);
                    console.log("Added " + queryArray[0] + " " + queryArray[1] + " to the database.");
                    mainMenu();
                });
            }, 1000);
        });
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
            let deptName = response.deptName;

            db.query(`INSERT INTO department (name) VALUES (?)`, deptName, (err, result) => {
                if (err) {
                    console.error(err);
                }
                console.log(result);
                console.log("Added " + deptName + " to the database.");
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