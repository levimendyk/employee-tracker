INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Engineer"),
       ("Finance"),
       ("Legal");

INSERT INTO position (id, title, salary, department_id)
VALUES  (1, "Sales Lead", "100,000", 1),
        (2, "Salesperson", "80,000", 2),
        (3, "Lead Engineer", "150,000", 3),
        (4, "Software Engineer", "120,000", 4),
        (5, "Account Manager", "160,000", 5),
        (6, "Accountant", "125,000", 6),
        (7, "Legal Team Lead", "250,000", 7),
        (8, "Lawyer", "190,000", 8);
      
       
INSERT INTO employee (id, first_name, last_name, position_id, manager_id)
VALUES  (1, "John", "Doe", 1, 1),
        (2, "Mike", "Chan", 2, 2),
        (3, "Ashley", "Rodriguez", 3, 3),
        (4, "Kevin", "Tupik", 4, 4),
        (5, "Kunal", "Singh", 5, 5),
        (6, "Malia", "Brown", 6, 6),
        (7, "Sarah", "Lourd", 7, 7),
        (8, "Tom", "Allen", 8 , 8);
