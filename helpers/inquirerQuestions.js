// Global Tools

const addDep = (name) => {
    return `INSERT INTO department (name)
            VALUES
                ("${name}");`;
}

const addRole = (title, salary, depID) => {
    return `INSERT INTO roles (title, salary, department_id)
            VALUES
                ("${title}", ${salary}, ${depID});`;
}

const addEmp = (first, last, role, manager) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES
                ("${first}", "${last}", ${role}, ${manager});`;
}

module.exports = { addDep, addRole, addEmp };