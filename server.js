const conn = require('./db/conn');
const inquirer = require('inquirer');
const cTable = require('console.table');

// functions
function firstPrompt() {
    inquirer.prompt({
        type: "list",
        name: "task",
        message: "Welcome! What can I do for you?",
        choices: [
            'View Employees',
            'View Roles',
            'View Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            new inquirer.Separator(),
            'EXIT'
        ]
    })
    .then(function ({task}) {
        switch (task) {
            case 'View Employees':
             viewEmployees();
             break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDeparment();
                break;
            case 'EXIT':
                exitApp();
                break;
            default:
                break;
        }
    })
};

//view employees
function viewEmployees() {
    let query = ``
}