// Global Tools
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
// const inquiring = require('./helpers/inquirerQuestions.js');

// Lists and Stuff
const listQuestions = ["View All Departments", "View All Roles", " View All Employees", "Add a new Department", "Add a new Role", "Add a new employee", "Update an Employee's Role", "Quit"];
const seedSQL = 'SOURCE ./db/seeds.sql';


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

// DB Initialization
// db.query('SOURCE ./db/schema.sql', function (err, results) {
//     if(err){
//         console.error(err);
//         return;
//     }
//     return;
// });

// DB Seeding for Tests
db.query(seedSQL, function (err, results) {
    if(err){
        console.error(err);
        return;
    }
    return;
});

// View All Departments
const viewAllDep = () => {
    console.log("You are now viewing the departments. \n")
    db.query('SELECT * FROM departments', function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        return console.table(results);
    })
}

const viewAllRoles = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        return console.table(results);
    })
}

const viewAllEmp = () => {
    db.query('SELECT * FROM employees', function (err, results) {
        if(err){
            console.error(err);
            return;
        }
        return console.table(results);
    })
}

const addNewDep = () => {

}

const addNewRole = () => {

}

const addNewEmp = () => {

}

const updateEmp = () => {

}

// Inquirer Start
const initQuestions = () => {
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
                    initQuestions();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    initQuestions();
                    break;
                case "View All Employees":
                    viewAllEmp();
                    initQuestions();
                    break;
                case "Add a new Department":
                    addNewDep();
                    initQuestions();
                    break;
                case "Add a new Role":
                    addNewRole();
                    initQuestions();
                    break;
                case "Add a new employee":
                    addNewEmp();
                    initQuestions();
                    break;
                case "Update an Employee's Role":
                    updateEmp();
                    break;
                case "Quit":
                    inquirer
                        .prompt(
                            {
                                name: "leave",
                                type: "confirm",
                                message: "Would you like to quit? "
                            }
                        ).then((answer) => {
                            if(answer === false){
                                initQuestions();
                            }
                    })
                    break;
            }
        }
)};

// Initial Call
initQuestions();