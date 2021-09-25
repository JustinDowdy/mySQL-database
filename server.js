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
    let query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res.length + ' employee list ');
        console.table('Employees:', res); 
        options();
    })
};

//view roles
function viewRoles() {
    let query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};

//view departments
function viewDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err) throw err;
        console.table('All Departments:', res);
        options();
    })
};

//option to add employee
function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "Please input the employee's first name:",
            },
            {
                name: "last_name",
                type: "input", 
                message: "Please input the employee's last name:"
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'What is the managers ID?'
            },
            {
                name: 'role',
                type: 'list',
                choices: function() {
                    let roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is the employee's role? "
                }
                
            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }                  
                }  
                connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                    role_id: role_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log('Your employee has been added!');
                    options();
            })
        })
    })
};

function addDeparment() {
    inquirer
    .prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What department do you want to add?'
        }
    ]).then(function (answer) {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
        var query = 'SELECT * FROM department';
        connection.query(query, function(err, res) {
        if(err)throw err;
        console.log('Your department has been added!');
        console.table('All Departments:', res);
        options();
        })
    })
};

// add a role to the database
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('New role has been added.');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
};

// exit app
function exitApp() {
    connection.end();
};