

-- CREATE TABLE department (
-- id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
-- name VARCHAR(30) NOT NULL
-- );

-- CREATE TABLE role(
-- id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
-- title VARCHAR(30) NOT NULL,
-- salary DOUBLE NOT NULL,
-- department_id INT(10) UNSIGNED,
-- FOREIGN KEY (department_id) REFERENCES department(id) 
-- );

-- CREATE TABLE employee(
-- id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- role_id INT(10) UNSIGNED,
-- manager_id INT(10) UNSIGNED NULL,
-- FOREIGN KEY (role_id) REFERENCES role(id),
-- FOREIGN KEY (manager_id) REFERENCES employee(id)
-- );*/

/*
Database connection parameters (con string)
    host: "127.0.0.1",
    user: "root",
    password: "Password@2020",
    database: "emsdb"
*/
