var inquirer = require("inquirer");
const Queries = require("./DB_Assests/dbqueries");

const queries = new Queries();

var mainMenu = {
  message: "What would you like to do?",
  type: "list",
  name: "Activity",
  choices: [
    "View All Employees",
    "View All Employees By Department",
    "View All Employess By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "Update Employee Manager"
  ]
};

class CMS_Prompt {
  constructor() {
    this.questions = mainMenu;
  }
  runPrompt() {
    console.log(
      `\n===========================================================================\n`
    );
    inquirer
      .prompt([this.questions])
      .then(answers => {
        if (answers.Activity === "View All Employees") {
          queries.getEmployees(emplist => {
            console.table(emplist);
            this.runPrompt();
          });
        } else if (answers.Activity === "View All Employees By Department") {
          queries.getDepartments(departments => {
            //console.table(departments);
            //console.log(departments.length);
            departments = departments.map(eachRec => {
              return eachRec.name;
            });
            this.questions = {
              message: "Please select which department",
              type: "list",
              name: "Activity",
              choices: departments
            };
            //****************************************************************/
            inquirer
              .prompt(this.questions)
              .then(answers => {
                queries.getEmployeesByDepartmentName(
                  answers.Activity,
                  emplist => {
                    console.table(emplist);
                    this.questions = mainMenu;
                    this.runPrompt();
                  }
                );
              })
              .catch(error => {
                if (error.isTtyError) {
                  // Prompt couldn't be rendered in the current environment
                } else {
                  // Something else when wrong
                }
              });
            /*****************************************************************/
          });
        } else if (answers.Activity === "Add Employee") {
          inquirer
            .prompt([
              {
                message: "Enter first name",
                type: "input",
                name: "firstName",
                validate: function validateFirstName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter last name",
                type: "input",
                name: "lastName",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter role",
                type: "input",
                name: "role",
                validate: function validateDepartmentName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter manager's first name",
                type: "input",
                name: "manager",
                validate: function validateManagerName(name) {
                  return name !== " ";
                }
              }
            ])
            .then(answers => {
              let firstName = answers.firstName;
              let lastName = answers.lastName;
              let role = answers.role;
              let manager = answers.manager;
              queries.addEmployee(
                firstName,
                lastName,
                role,
                manager,
                sqlResult => {
                  this.runPrompt();
                }
              );
            })
            .catch(error => {
              if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
              } else {
                // Something else when wrong
              }
            });
        } else if (answers.Activity === "Remove Employee") {
          inquirer
            .prompt([
              {
                message: "Enter first name",
                type: "input",
                name: "firstName",
                validate: function validateFirstName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter last name",
                type: "input",
                name: "lastName",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              }
            ])
            .then(answers => {
              let firstName = answers.firstName;
              let lastName = answers.lastName;
              queries.removeEmployee(firstName, lastName, sqlResult => {
                this.runPrompt();
              });
            })
            .catch(error => {
              if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
              } else {
                // Something else when wrong
              }
            });
        } else if (answers.Activity === "Update Employee Role") {
          inquirer
            .prompt([
              {
                message: "Enter employee's first name",
                type: "input",
                name: "firstName",
                validate: function validateFirstName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter employee's last name",
                type: "input",
                name: "lastName",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter new role",
                type: "input",
                name: "role",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              }
            ])
            .then(answers => {
              let firstName = answers.firstName;
              let lastName = answers.lastName;
              let role = answers.role;
              queries.updateEmployeeRole(
                firstName,
                lastName,
                role,
                sqlResult => {
                  this.runPrompt();
                }
              );
            })
            .catch(error => {
              if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
              } else {
                // Something else when wrong
              }
            });
        } else if (answers.Activity === "Update Employee Manager") {
          inquirer
            .prompt([
              {
                message: "Enter employee's first name",
                type: "input",
                name: "firstName",
                validate: function validateFirstName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter employee's last name",
                type: "input",
                name: "lastName",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter new manager first name",
                type: "input",
                name: "managerfName",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              },
              {
                message: "Enter new manager last name",
                type: "input",
                name: "managerlName",
                validate: function validateLastName(name) {
                  return name !== "";
                }
              }
            ])
            .then(answers => {
              let firstName = answers.firstName;
              let lastName = answers.lastName;
              let managerfName = answers.managerfName;
              let managerlName = answers.managerlName;
              queries.updateEmployeeManager(
                firstName,
                lastName,
                managerfName,
                managerlName,
                sqlResult => {
                  this.runPrompt();
                }
              );
            })
            .catch(error => {
              if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
              } else {
                // Something else when wrong
              }
            });
        } else if (answers.Activity === "View All Employess By Manager") {
          queries.getManagers(sqlResult => {
            let managerNames = sqlResult.map(obj => {
              return `${obj.first_name} ${obj.last_name}`;
            });
            //-------------------------------------------------------------------------------------------------------
            inquirer
              .prompt([
                {
                  message: "Select a manager",
                  type: "list",
                  name: "manager",
                  choices: managerNames
                }
              ])
              .then(answers => {
                let managerfName = answers.manager.split(" ")[0];
                let managerlName = answers.manager.split(" ")[1];
                console.log(managerfName);
                console.log(managerlName);
                queries.getEmployeesByManagerName(
                  managerfName,
                  managerlName,
                  result => {
                    console.table(result);
                    this.runPrompt();
                  }
                );
              })
              .catch(error => {
                if (error.isTtyError) {
                  // Prompt couldn't be rendered in the current environment
                } else {
                  // Something else when wrong
                }
              });
          });
        }
      })
      .catch(error => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
  }
}

module.exports = CMS_Prompt;
