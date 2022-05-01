INSERT INTO department (name)
VALUES  ("Human Resources"),
        ("Operations"),
        ("Marketing"),
        ("Sales"),
        ("Legal"),
        ("Engineering")

INSERT INTO role (title, salary, department_id)
VALUES  ("Business Dev Rep", "52,000 USD", 4),
        ("Marketing Specialist", "55,000 USD", 3),
        ("Account Manager", "68,000 USD", 4),
        ("Web Developer", "73,000 USD", 6),
        ("Chief Legal Officer", "298,000 USD", 5),
        ("Staffing Specialist", "32,000 USD", 1),
        ("HR Analyst", "57,000 USD", 1),
        ("HR Director", "95,000 USD", 1),
        ("HR Manager", "74,000 USD", 1),
        ("Operations Analyst", "62,000 USD", 2),
        ("Logistician", "69,500 USD", 2),
        ("Legal Associate", "69,000 USD", 5),
        ("Contract Analyst", "72,800 USD", 5),
        ("Creative Director", "151,000 USD", 3),
        ("Full Stack Developer", "112,000 USD", 6)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("George", "Schwimmer", 2, null),
        ("Helen", "Carmichael", 2, null),
        ("Torsten", "Flor", 1, null),
        ("Demi", "Francis", 8, 1),
        ("Chandra", "Otila", 3, null),
        ("Juan", "Jocelyn", 4, null),
        ("Valerie", "Luba", 7, null),
        ("Lilias", "Carlisa", 11, null),
        ("Jimmy", "Vishal", 6, null),
        ("Kareem", "Arn", 5, 2),
        ("Patricia", "Woods", 8, 3),
        ("Leia", "Elfrida", 15, null),
        ("Shaun", "Glenwood", 15, null),
        ("Amir", "Abramo", 15, 4),
        ("Allan", "Elisheva", 3, null)
