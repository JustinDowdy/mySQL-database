-- DROP DATABASE IF EXISTS employees;
-- CREATE DATABASE employees;
-- USE employees;

USE employees_db;

INSERT INTO department (name)
VALUES 
('IT'),
('Finance'),
('Legal'),
('HR'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 85000, 1),
('Accountant', 65000, 2),
('Paralegal', 52000, 3),
('Manager', 75000, 4),
('Engineer', 92000, 5),
('Sales Rep', 42000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Patrick', 'Star', 1, 34),
('Squidward', 'Tentacles', 2, 39),
('Pearl', 'Krabs', 3, 36),
('Eugene', 'Krabs', 4, 38),
('Spongebob', 'Squarepants', 5, 31),
('Sandy', 'Cheeks', 6, 33);