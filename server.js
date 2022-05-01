const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const SysArt = require('./lib/SysArt');
const Department = require('./lib/Department')
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

function startSys() {
    console.log(SysArt);
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