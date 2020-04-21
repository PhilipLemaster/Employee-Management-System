const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root64',
    database: 'employeeDB'
});
 
connection.connect(function(err){
    if(err) throw err;
    console.log('Running...')
    runProgram();
});

function runProgram() {
    // displayEmployees();
    askInput();
}

function askInput() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'crud',
                message: 'What would you like to do?',
                choices: ['View all employees', 'Create a new employee', 'Delete an employee', 'Create a department', 'View all departments', 'Delete a department', 'View employee roles', 'Create an employee role', 'Delete an employee role']
            }
        ])

        .then(response => {
            if (response.crud == 'View all employees') {
                readEmployees();
            }

            else if (response.crud == 'Create a new employee') {
                writeEmployee();
            }

            // else if (response.crud == 'Update an employee') {
            //     updateEmployee();
            // }

            else if (response.crud == 'Delete an employee') {
                deleteEmployee();
            }

            else if (response.crud == 'Create a department') {
                writeDepartment();
            }

            else if (response.crud == 'View all departments') {
                readDepartments();
            }

            else if (response.crud == 'Delete a department') {
                deleteDepartment();
            }

            else if (response.crud == 'View an employee\'s role') {
                readRole();
            }

            else if (response.crud == 'Create an employee role') {
                writeRole();
            }
        })
}

function readEmployees() {
    connection.query('SELECT * FROM employee', function(err,res){
      console.table(res);
      connection.end();
    })
}

function writeEmployee() {
    inquirer
        .prompt ([
            {
                name: 'firstName',
                message: "What is the employee's first name?"
            },

            {
                name: 'lastName',
                message: "What is the employee's last name?"
            },

            {
                name: 'role',
                message: "What is the employee's role?"
            },

            {
                name: 'manager',
                message: "Who is this employee's manager?"
            }
        ])
    
        .then(response => {
            connection.query(`INSERT INTO employee (first_name, last_name, full_name, role, manager) VALUES ('${response.firstName}','${response.lastName}', '${response.firstName} ${response.lastName}', '${response.role}', '${response.manager}')`, function(err,res){
                console.log(`${response.firstName} ${response.lastName} added!`);
                connection.end();
            })
        })
}

function deleteEmployee() {

    connection.query('SELECT full_name FROM employee', function(err,res){
        names = [];
        for (var y = 0; y < res.length; y++) {
            names.push(`${res[y].full_name}`);
        }

        inquirer
            .prompt ([
                {
                    type: 'list',
                    name: 'deleteEmp',
                    message: 'Which employee would you like to delete?',
                    choices: names
                }

            ])
    
        .then(response => {
            console.log(response.deleteEmp);
            connection.query(`DELETE FROM employee WHERE full_name = '${response.deleteEmp}'`, function(err,res){
                console.log(`${response.deleteEmp} deleted!`);
                connection.end();
            })
        })
      })
    
}

function readDepartments() {
    connection.query('SELECT * FROM department', function(err,res){
      console.table(res);
      connection.end();
    })
}

function writeDepartment() {
    inquirer
        .prompt ([
            {
                name: 'name',
                message: "What is the department name?"
            }
        ])
    
        .then(response => {
            connection.query(`INSERT INTO department (name) VALUES ('${response.name}')`, function(err,res){
                console.log(`${response.name} added!`);
                connection.end();
            })
        })
}

function deleteDepartment() {

    connection.query('SELECT name FROM department', function(err,res){
        names = [];
        for (var y = 0; y < res.length; y++) {
            names.push(`${res[y].name}`);
        }

        inquirer
            .prompt ([
                {
                    type: 'list',
                    name: 'deleteDep',
                    message: 'Which department would you like to delete?',
                    choices: names
                }

            ])
    
        .then(response => {
            console.log(response.deleteEmp);
            connection.query(`DELETE FROM department WHERE name = '${response.deleteDep}'`, function(err,res){
                console.log(`${response.deleteDep} deleted!`);
                connection.end();
            })
        })
      })
    
}

function readRole() {
    connection.query('SELECT * FROM role', function(err,res){
      console.table(res);
      connection.end();
    })
}

function writeRole() {

    connection.query('SELECT id, name FROM department', function(err,res) {
        departmentsArr = [];
        let departments = JSON.stringify(res);

        for (var y = 0; y < res.length; y++) {
            names.push(`${res[y].name}`);
        }
        
        inquirer
            .prompt ([
                {
                    name: 'title',
                    message: "What is the title of the role?"
                },

                {
                    name: 'salary',
                    message: "What is the salary of this role?"
                },

                {
                    type: 'list',
                    name: 'department',
                    message: "What department does this role belong to?",
                    choices: departments
                }
            ])
        
            .then(response => {
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${response.title}', '${response.salary}', '${response.department}')`, function(err,res){
                    console.log(`${response.name} added!`);
                    connection.end();
                })
            })

    })
    
}