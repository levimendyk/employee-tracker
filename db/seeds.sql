INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineer"),
       ("Finance"),
       ("Legal");

INSERT INTO role_position (title, salary, department_id)
VALUES  ("Sales Lead", "100000", 1),
        ("Salesperson", "80000", 2),
        ("Lead Engineer", "150000", 3),
        ("Software Engineer", "120000", 4),
        ("Account Manager", "160000", 4),
        ("Accountant", "125000", 4),
        ("Legal Team Lead", "250000", 4),
        ("Lawyer", "190000", 4);
      
       
INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES  ("John", "Doe", 1, 1),
        ("Mike", "Chan", 2, 2),
        ("Ashley", "Rodriguez", 3, 3),
        ("Kevin", "Tupik", 4, 4),
        ("Kunal", "Singh", 5, 5),
        ("Malia", "Brown", 6, 6),
        ("Sarah", "Lourd", 7, 7),
        ("Tom", "Allen", 8 , 8);
