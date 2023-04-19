-- Department seeds --
INSERT INTO department (name)
VALUES
    ("Administration"),
    ("Legal"),
    ("Sales"),
    ("Engineering");

-- Role seeds --
INSERT INTO roles (title, salary, department_id)
VALUES
    ("CEO", 160000, 001),
    ("Administrative Assistant", 120000, 001),
    ("Head Lawyer", 120000, 002),
    ("Lawyer", 90000, 002),
    ("Finance Manager", 75000, 003),
    ("Financier", 65000, 003),
    ("Head Engineer", 85000, 004),
    ("Engineer", 80000, 004);

-- Employee seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("David", "Martinez", 001, null),
    ("Margaret", "May", 002, 001),
    ("Mark", "Marker", 003, 001),
    ("Dan", "Gree", 004, 003),
    ("May", "Thomas", 005, 002),
    ("Laura", "Monday", 006, 005),
    ("Steven", "Wall", 007, 001),
    ("Markus", "Daniels", 008, 007);