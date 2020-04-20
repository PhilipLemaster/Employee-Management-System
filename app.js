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
                choices: ['View all employees', 'Create a new employee', 'Update an employee', 'Delete an employee']
            }
        ])

        .then(response => {
            if (response.crud == 'View all employees') {
                readEmployees();
            }

            else if (response.crud == 'Create a new employee') {
                writeEmployee();
            }

            else if (response.crud == 'Update an employee') {
                updateEmployee();
            }

            else if (response.crud == 'Delete an employee') {
                deleteEmployee();
            }
        })
}

function readEmployees() {
    connection.query('SELECT * FROM employee', function(err,res){
      console.log(res);
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
            }

        ])
    
        .then(response => {
            connection.query(`INSERT INTO employee (first_name, last_name) VALUES ('${response.firstName}','${response.lastName}')`, function(err,res){
                console.log(`${response.firstName} ${response.lastName} added!`);
            })
        })
}   
