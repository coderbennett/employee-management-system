SELECT employee.first_name, employee.last_name, roles.title, department.name 
FROM employee 
JOIN roles ON employee.role_id = roles.id
JOIN department ON roles.department_id = department_id;

SELECT employee.first_name, employee.last_name, roles.title, department.name FROM employee JOIN roles department ON employee.role_id = roles.id AND roles.department_id = department_id;

SELECT name FROM department;
--INSERT INTO department WHERE name = ?--
--INSERT INTO roles WHERE title = ? AND salary = ? AND department_id = ?--
--INSERT INTO employee WHERE first_name = ? AND last_name = ? AND role_id = ? AND manager_id = ?--

--SELECT role_title FROM roles WHERE roles.id = ?--
--SELECT name FROM department WHERE department.id = ?--

SELECT name FROM department INNER JOIN roles ON roles.department_id = department.id;

SELECT roles.id, roles.title, roles.salary FROM roles INNER JOIN department ON department.id = roles.department_id;

--READ ALL DEPARTMENTS--
--SELECT * FROM department--

--READ ALL ROLES--
--SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles INNER JOIN department ON department.id = roles.department_id ORDER BY roles.id;--

--READ ALL EMPLOYEES--
--SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, IFNULL(CONCAT(m.first_name, ', ', m.last_name), NULL) AS manager FROM employee LEFT JOIN employee AS m ON employee.manager_id = m.id INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY employee.id;--

--UPDATE employee SET employee.role_id = ?, WHERE employee.id = ?;--