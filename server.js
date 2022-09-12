const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employees_db",
  },
);

db.connect(function (err) {
    if(err) throw err;
    console.log(`Connected to the employees_db database.`)
    mainQuestion()
})

function mainQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainQuestion',
            message: 'What would you like to do?',
            choices: ['View All', 'View Employees', 'View Roles', 'View Departments', 'Add Employees', 'Add Roles', 'Add a Department', 'Done']
        }
    ]).then(answer => {
        if(answer.mainQuestion === 'View All') {
            viewAll()
        } else if (answer.mainQuestion === 'View Employees') {
            viewEmployees()
        } 
    
        // else {
            // db.end()
        // }
    })
}

function viewAll() {

}

function viewEmployees() {

}
