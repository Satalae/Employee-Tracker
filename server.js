// Global Tools
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { addDep, addRole, addEmp } = require('./helpers/inquirerQuestions.js');

// Lists and Stuff
const listQuestions = ["View All Departments", "View All Roles", " View All Employees", "Add a new Department", "Add a new Role", "Add a new employee", "Update an Employee's Role", "Quit"];

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
        initQuestions();
    })
}

const viewAllRoles = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
        initQuestions();
    })
}

const viewAllEmp = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        console.table(results);
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
        const newDep = addDep(answer.name);
        db.query(newDep, function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.log("New Department added!");
            initQuestions();
        })
    })
}

const addNewRole = () => {
    viewAllRoles();
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the new role's title? "
        },
        {
            name: "salary",
            type: "input",
            message: "What is this role's salary? "
        },
        {
            name: "department",
            type: "input",
            message: "What department does this role belong to? "
        },
    ]).then(async ({title, salary, department}) => {
        const newRole = addRole(title, salary, department);
        db.query(newRole, function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.log("New Role added!");
            initQuestions();
        })
    })
}

const addNewEmp = () => {
    viewAllEmp();
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
            message: "What is this new employee's role? "
        },
        {
            name: "manager",
            type: "input",
            message: "What is the ID of this employee? "
        }
    ]).then(async ({first, last, role, manager}) => {
        const newEmp = addEmp(first, last, role, manager);
        db.query(newEmp, function (err, results) {
            if(err){
                console.error(err);
                return;
            }
            console.log("New Employee added!");
            initQuestions();
        })
    })
}

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
            console.log("Looking for: " + answer.init);
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
    return;
};

// Initial Call
initQuestions();