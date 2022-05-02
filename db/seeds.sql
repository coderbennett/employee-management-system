INSERT INTO department (name)
VALUES  ("Human Resources"),
        ("Operations"),
        ("Marketing"),
        ("Sales"),
        ("Legal"),
        ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Business Dev Rep", 52000, 4),
        ("Marketing Specialist", 55000, 3),
        ("Account Manager", 68000, 4),
        ("Web Developer", 73000, 6),
        ("Chief Legal Officer", 298000, 5),
        ("Staffing Specialist", 32000, 1),
        ("HR Analyst", 57000, 1),
        ("HR Director", 95000, 1),
        ("HR Manager", 74000, 1),
        ("Operations Analyst", 62000, 2),
        ("Logistician", 69500, 2),
        ("Legal Associate", 69000, 5),
        ("Contract Analyst", 72800, 5),
        ("Creative Director", 151000, 3),
        ("Full Stack Developer", 112000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("George", "Schwimmer", 2, 2),
        ("Helen", "Carmichael", 2, null),
        ("Torsten", "Flor", 1, null),
        ("Demi", "Francis", 8, 11),
        ("Chandra", "Otila", 3, null),
        ("Juan", "Jocelyn", 4, null),
        ("Valerie", "Luba", 7, null),
        ("Lilias", "Carlisa", 11, null),
        ("Jimmy", "Vishal", 6, null),
        ("Kareem", "Arn", 5, 2),
        ("Patricia", "Woods", 8, null),
        ("Leia", "Elfrida", 15, 14),
        ("Shaun", "Glenwood", 15, 14),
        ("Amir", "Abramo", 15, null),
        ("Allan", "Elisheva", 3, 5);
