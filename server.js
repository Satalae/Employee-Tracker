// Global Tools
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { addDep, addRole, addEmp } = require('./helpers/inquirerQuestions.js');

// Lists and Stuff
const listQuestions = ["View All Departments", "View All Roles", "View All Employees", "Add a new Department", "Add a new Role", "Add a new employee", "Update an Employee's Role", "Quit"];
const showRoles = `SELECT * FROM roles JOIN department ON roles.department_id = department.id;`;
const showEmps = `SELECT * FROM employee JOIN roles ON employee.role_id = roles.id;`;

// Connect to DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.PASSWORD,
        database: 'employee_db'
    },
    console.log(`Welcome to your Employee Database Manager! \n`)
);

// View All Departments
const viewAllDep = () => {
    console.log("You are now viewing the departments. \n")
    db.query('SELECT * FROM department', function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        console.log('\n');
        initQuestions();
    })
}

// Shows all roles with joined departments
const viewAllRoles = () => {
    db.query(showRoles, function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        console.log('\n');
        initQuestions();
    })
}

// Shows all employees with joined roles
const viewAllEmp = () => {
    db.query(showEmps, function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        console.log('\n');
        initQuestions();
    })
}

const addNewDep = () => {
    inquirer.prompt(
        {
            name: "name",
            type: "input",
            message: "What is the new department's name?" 
        }
    ).then(async (answer) => {
        // Acts in async by default, will recall init to return to origin.
        // Nothing happens from where this funciton is called, so whenever
        // This chain is broken, its over.
        const newDep = addDep(answer.name);
        db.query(newDep, function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.log("New Department added! \n");
            initQuestions();
        })
    })
}

const addNewRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the new role's title? "
        },
        {
            name: "salary",
            type: "input",
            message: "What is this role's salary? ",
            validate: function(input) {
                if(isNaN(input)){
                    return "Please input a number.";
                }
                return true;
            },
        },
        {
            name: "department",
            type: "input",
            message: "What department does this role belong to? ",
            validate: function(input){
                if(isNaN(input)){
                    return "Please input a number. ";
                }
                return true;
            },
        },
    ]).then(async (answer) => {
        const newRole = addRole(answer.title, answer.salary, answer.department);
        db.query(newRole, function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.log("New Role added! \n");
            initQuestions();
        })
    })
}

const addNewEmp = () => {
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "What is their first name? "
        },
        {
            name: "last",
            type: "input",
            message: "What is their last name? "
        },
        {
            name: "role",
            type: "input",
            message: "What is this new employee's role? ",
            validate: function(input) {
                if(isNaN(input)){
                    return "Please input a number.";
                }
                return true;
            },
        },
        {
            name: "manager",
            type: "input",
            message: "What is the ID of this employee's manager? ",
            validate: function(input) {
                if(isNaN(input)){
                    return "Please input a number.";
                }
                return true;
            },
        }
    ]).then(async (answer) => {
        const newEmp = addEmp(answer.first, answer.last, answer.role, answer.manager);
        db.query(newEmp, function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.log("New Employee added! \n");
            initQuestions();
        })
    })
}

// He'll do something... next time... hopefully...
const updateEmp = () => {

}

// Inquirer Start
const initQuestions = async () => {
    inquirer
        .prompt([
            {
                name: 'init',
                type: 'list',
                message: 'What would you like to do?',
                default: false,
                choices: listQuestions,
            }
        ]).then(async (answer) => {
            switch(answer.init){
                case "View All Departments":
                    viewAllDep();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmp();
                    break;
                case "Add a new Department":
                    addNewDep();
                    break;
                case "Add a new Role":
                    addNewRole();
                    break;
                case "Add a new employee":
                    addNewEmp();
                    break;
                case "Update an Employee's Role":
                    updateEmp();
                    break;
                case "Quit":
                    console.log("Thank you for using Employee Manager!");
                    process.exit();
            }
        }
    )
    // Not needed but by golly he sure feels useful.
    return;
};

// Initial Call
initQuestions();