const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "employees_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`);
  mainQuestion();
});

function mainQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainQuestion",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Done",
        ],
      },
    ])
    .then((answer) => {
      if (answer.mainQuestion === "View All Employees") {
        viewAllEmployees();
      } else if (answer.mainQuestion === "Add Employee") {
        addEmployee();
      } else if (answer.mainQuestion === "View All Roles") {
        viewAllRoles();
      } else if (answer.mainQuestion === "Add Role") {
        addRole();
      } else if (answer.mainQuestion === "View All Departments") {
        viewAllDepartments();
      } else if (answer.mainQuestion === "Add Department") {
        addDepartment();
      } else {
        db.end();
      }
    });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
  });
}

function addEmployee() {}

function viewAllRoles() {
  db.query("SELECT * FROM role_position", function (err, results) {
    console.log(results);
  });
}

function addRole() {}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
}

function addDepartment() {}
