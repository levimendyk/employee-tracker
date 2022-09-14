const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    console.table(results);
    mainQuestion();
  });
}

// function addEmployee() {
//   inquirer
//     .prompt([
//      { type: "input",
//         name: "first_name", message: "What is your first name?" },
//     {type: 'input', name: "last_name", message: "What is your last name?"}
//     return
//   ]);
// }

function viewAllRoles() {
  db.query("SELECT * FROM role_position", function (err, results) {
    console.table(results);
    mainQuestion();
  });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role", 
                message: "What is the name of the role?",
                validate: (addRole) => {
                    if (addRole) {
                        return true;
                    } else {
                        console.log("Please enter the name of the role.");
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
               validate: (addSalary) => {
                if (isNaN(addSalary)) {
                    return true;
                } else {
                    console.log("Please enter the salary");
                    return false;
                }
               }
            },
        // ])
        // .then((response) => {
        //     db.query("INSERT INTO")
        // }) 
            {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: [viewAllDepartments()],
            },
        ])
        // .then((response) => {
        //     db.query(
        //       "INSERT INTO role_position (title, salary, department)) VALUES(?)",
        //       response.depName,
        //       (err, rows) => {
        //         if (err) throw err;
        //         console.table(viewAllRoles());
        //       }
        //     );
        //   })
          .catch((err) => {
            console.error(err);
          });
      }
        mainQuestion();

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    mainQuestion();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "depName",
        message: "What is the name of the department?",
        validate: (depName) => {
          if (depName) {
            return true;
          } else {
            console.log("Please enter the department name.");
            return false;
          }
        },
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO department (department_name) VALUES(?)",
        response.depName,
        (err, rows) => {
          if (err) throw err;
          console.table(viewAllDepartments());
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
