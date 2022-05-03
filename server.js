const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const sysArt = require('./lib/sysArt');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
)

var employeeList = createEmployeeList();
var managerList = createManagerList();
var roleList = createRoleList();
var deptList = createDeptList();

function startSys() {
    console.log(sysArt);
    //main menu inquiry
    mainMenu();
}

//main menu function
function mainMenu() {
    employeeList = createEmployeeList();
    managerList = createManagerList();
    roleList = createRoleList();
    deptList = createDeptList();

    inquirer
        .prompt([ 
            {
                type: "list",
                message: "What would you like to do?",
                name: "menuChoice",
                choices: ["View All Employees", new inquirer.Separator(), "Add Employee", new inquirer.Separator(), "Update Employee Role", new inquirer.Separator(), "View All Roles", new inquirer.Separator(), "Add Role", new inquirer.Separator(), "View All Departments", new inquirer.Separator(), "Add Department", new inquirer.Separator(), "Quit", new inquirer.Separator() ]
            }
        ])
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
                    break;
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
        .prompt([
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
                choices: roleList
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "employeeManager",
                choices: managerList
            }
        ])
        .then((response) => {
            queryArray = [response.employeeFirstName, response.employeeLastName];
            //split the string into first and last names
            managerName = response.employeeManager.split(" ");

            //query for the role id with the user's input of the title
            db.query(`SELECT id FROM roles WHERE title = ?`, response.employeeRole, (err, result) => {
                roleId = result[0].id;
            });

            //if the employee is a manager the response is none
            if (response.employeeManager === "None") {
                managerId = null;
            } else {
                //query the employee id from the first and last name
                db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, managerName, (err, result) => {
                    if(err) {
                        console.error(err);
                    }
                    managerId = result[0].id;
                });
            }
            
            console.log("Loading..");
            //we have to set a timeout for this query, otherwise it runs before the others complete
            setTimeout(() => {
                queryArray.push(roleId);
                queryArray.push(managerId);
                //now insert the new employee data into the database
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                queryArray, (err, result) => {
                    if(err) {
                        console.error(err);
                    }
                    console.log("Added " + queryArray[0] + " " + queryArray[1] + " to the database.");
                    mainMenu();
                });
            }, 1000);
        });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "employeeSelection",
                choices: employeeList
            },
            {
                type: "list",
                message: "Which role do you want to assign to the selected employee?",
                name: "employeeRole",
                choices: roleList
            }
        ])
        .then((response) => {
            let employeeName = response.employeeSelection.split(" ");
            let roleName = response.employeeRole;
            let employeeId;
            let roleId;

            db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, employeeName, (err, result) => {
                if(err) {
                    console.error(err);
                }
                employeeId = result[0].id;
            });

            db.query('SELECT id FROM roles WHERE title = ?', roleName, (err, result) => {
                if(err) {
                    console.error(err);
                }
                roleId = result[0].id;
            });

            console.log("Loading..");
            //we have to set a timeout for this query, otherwise it runs before the others complete
            setTimeout(() => {
                //now update the new employee data to the database
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
                [roleId, employeeId], (err, result) => {
                    if(err) {
                        console.error(err);
                    }
                    console.log("Updated " + employeeName[0] + " " + employeeName[1] + " to the database.");
                    mainMenu();
                });
            }, 1000);
        });
    //it should update the employee's title in the db
    //log "updated first + last name into the db"
    //open main menu
}

function addDept() {
    //use this function to inquire user
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the department?",
                name: "deptName"
            }
        ])
        .then((response) => {
            let deptName = response.deptName;

            db.query(`INSERT INTO department (name) VALUES (?)`, deptName, (err, result) => {
                if (err) {
                    console.error(err);
                }
                console.log("Added " + deptName + " to the database.");
                mainMenu();
            });
        });
}

function addRole() {

    inquirer
        .prompt([
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
                choices: deptList
            }
        ])
        .then((response) => {
            let roleName = response.roleName;
            let roleSalary = response.roleSalary;
            let roleDept = response.roleDept;
            let deptId;

            db.query(`SELECT id FROM department WHERE name = ?`, roleDept, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    deptId = result[0].id;
                }
            });
            console.log("Loading..");
            setTimeout(() => {
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, 
                [
                    roleName,
                    roleSalary,
                    deptId
                ], (err, results) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Added " + roleName + " to the database.");
                    mainMenu();
                });
            }, 1000);
        });
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