DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    full_name VARCHAR(60),
    role_id INT,
    manager_id INT
);