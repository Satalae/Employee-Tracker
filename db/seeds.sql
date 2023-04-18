-- Department seeds --
INSERT INTO department (id, name)
VALUES
    (001, "Administration"),
    (002, "Legal"),
    (003, "Sales"),
    (004, "Engineering");

-- Role seeds --
INSERT INTO roles (id, title, salary, department_id)
VALUES
    (001, "CEO", 160000, 001),
    (002, "CFO", 120000, 001),
    (003, "Head Lawyer", 120000, 002),
    (004, "Lawyer", 90000, 002),
    (005, "Finance Manager", 75000, 003),
    (006, "Financier", 65000, 003),
    (007, "Head Engineer", 85000, 004),
    (008, "Engineer", 80000, 004);

-- Employee seeds --
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (001, "David", "Martinez", 001, null),
    (002, "Margaret", "May", 002, null),
    (003, "Mark", "Marker", 003, 001),
    (004, "Dan", "Gree", 004, 003),
    (005, "May", "Thomas", 005, 002),
    (006, "Laura", "Monday", 006, 005),
    (007, "Steven", "Wall", 007, 001),
    (008, "Markus", "Daniels", 008, 007);