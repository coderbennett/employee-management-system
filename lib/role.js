const role = require("./department");

class role {
    constructor(id, title, salary, dept_id) {
        id = this.id;
        title = this.title;
        salary = this.salary;
        dept_id = this.dept_id;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return this.salary;
    }

    getDeptId() {
        return this.dept_id;
    }
}