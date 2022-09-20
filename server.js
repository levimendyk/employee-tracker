const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
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
    })
    .catch((err) => {
      console.log(err);
    });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    mainQuestion();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is your first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is your last name?",
      },
    ])
    .then((response) => {
      const params = [response.firstName, response.lastName];
      const sql = `SELECT role_position.id, role_position.title FROM role_position`;
      db.query(sql, (err, data) => {
        if (err) throw err;
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "What is the employees role?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            // .department gets role ID
            const role = roleChoice.department;
            params.push(role);
            console.log(params);
            const sql = `SELECT * FROM employee`;
            db.query(sql, (err, data) => {
              if (err) throw err;
              const managers = data.map(
                ({ id, first_name, last_name, position_id, manager_id }) => ({
                  name: first_name + "" + last_name,
                  position_id,
                  value: id,
                })
              );
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);
                  console.log(params);
                  const sql = `INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES (?, ?, ?, ?)`;
                  db.query(sql, params, (err, data) => {
                    if (err) throw err;
                    viewAllEmployees();
                    mainQuestion();
                  });
                });
            });
          });
      });
    });
}

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
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
    ])
    .then((response) => {
      const params = [response.role, response.salary];
      const sql = `SELECT department_name, id FROM department`;
      db.query(sql, (err, data) => {
        if (err) throw err;
        const dept = data.map(({ department_name, id }) => ({
          name: department_name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "Which department does the role belong to?",
              choices: dept,
            },
          ])
          .then((deptChoice) => {
            const deptName = deptChoice.department;
            console.log(deptName);
            params.push(deptName);
            const sql = `INSERT INTO role_position (title, salary, department_id) VALUES (?, ?, ?)`;
            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log(response.role);
              viewAllRoles();
              mainQuestion();
            });
          });
      });
    });
}

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
