const mysql = require("mysql");

module.exports = class DB_Queries {
  getEmployees(reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query("SELECT * FROM employee", function(err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        //console.log(result);
        //console.table(result);
        reIterate(result);
      });
    });
  }

  getDepartments(reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query("Select name from department", function(err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        //return result[0].id;
        reIterate(result);
      });
    });
  }

  getEmployeesByDepartmentName(departmentName, reIterate) {
    this.getDeparmentByName(departmentName, departmentId => {
      this.getRoleByDeparmentID(departmentId, roleID => {
        let con = mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "Password@2020",
          database: "emsdb"
        });

        con.connect(function(err) {
          if (err) throw err;
          // if connection is successful
          con.query(
            "Select * from employee where role_id = '" + parseInt(roleID) + "'",
            function(err, result, fields) {
              // if any error while executing above query, throw error
              if (err) throw err;
              // if there is no error, you have the result
              //console.log(result);
              reIterate(result);
            }
          );
        });
      });
    });
  }

  getDeparmentByName(departmentName, reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select id from department where name = '" + departmentName + "'",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          reIterate(result[0].id);
        }
      );
    });
  }

  getEmpManager(manager_name) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select id from employee where first_name = " + manager_name,
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          let managerID = result[0].id;
          return managerID;
        }
      );
    });
  }

  getRoleByDeparmentID(departmentID, reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "SELECT id FROM role WHERE department_id = " + parseInt(departmentID),
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          //console.log(result);
          //console.table(result);
          reIterate(result[0].id);
        }
      );
    });
  }
  getRoleByTitle(title) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query("Select id from role where title = " + title, function(
        err,
        result,
        fields
      ) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
        let roleID = result[0].id;
        return roleID;
      });
    });
  }

  addDepartment(dpname) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    // make to connection to the database.
    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "INSERT INTO department (name) values ('" + dpname + "')",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          console.log(result);
        }
      );
    });
  }

  addRole(title, salary, departmentName) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select id from department where name = '" + departmentName + "'",
        function(err, result, fields) {
          let departmentID = result[0].id;

          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          //inserting roles record
          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              "INSERT INTO role (title, salary, department_id) values ('" +
                title +
                "', '" +
                salary +
                "', '" +
                departmentID +
                "')",
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                console.table(result);
              }
            );
          });
        }
      );
    });
  }
  addEmployee(firstName, lastName, role, manager_name, reIterate) {
    let roleID;
    let manager;

    if (
      manager_name === null ||
      manager_name === undefined ||
      manager_name === ""
    ) {
      manager_name = " ";
      manager = [{ id: 4 }]; //asuming the default manager id for all inserts without manager name is 4
    }

    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful

      con.query(
        "Select id from employee where first_name = '" + manager_name + "'",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          if (manager_name === " ") {
            console.log("This employee won't have a manager");
          } else {
            if (result.length === 0) {
              console.log("No such provided manager exists");
              manager = [{ id: 4 }]; //asuming the employee id for default manager 4;
            } else {
              manager = result;
            }
          }

          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              "Select id from role where title = '" + role + "'",
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                roleID = result[0].id;

                let con = mysql.createConnection({
                  host: "127.0.0.1",
                  user: "root",
                  password: "Password@2020",
                  database: "emsdb"
                });

                //inserting roles record
                let insertEmpString;

                if (manager === null || manager === undefined) {
                  insertEmpString =
                    "INSERT INTO employee (first_name, last_name, role_id) values ('" +
                    firstName +
                    "', '" +
                    lastName +
                    "', '" +
                    roleID +
                    "')";
                } else {
                  insertEmpString =
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('" +
                    firstName +
                    "', '" +
                    lastName +
                    "', '" +
                    roleID +
                    "', '" +
                    manager[0].id +
                    "')";
                }
                con.connect(function(err) {
                  if (err) throw err;
                  // if connection is successful
                  con.query(insertEmpString, function(err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) throw err;
                    // if there is no error, you have the result
                    console.log(
                      firstName +
                        " " +
                        lastName +
                        " has been added successfully"
                    );
                    reIterate(result);
                  });
                });
              }
            );
          });
        }
      );
    });
  }

  updateEmployeeManager(
    firstName,
    lastName,
    managerfName,
    managerlName,
    reIterate
  ) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        `select id from employee where first_name = '${managerfName}' and last_name = '${managerlName}'`,
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;

          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              `update employee set manager_id = ${result[0].id} where first_name = '${firstName}' and last_name = '${lastName}'`,
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;

                if (result.affectedRows === 0)
                  console.log(`${firstName} ${lastName} is not an employee`);
                else
                  console.log(
                    `${firstName} ${lastName} is now being managed by ${managerfName} ${managerlName}`
                  );

                reIterate(result);
              }
            );
          });

          //reIterate(result);
        }
      );
    });
  }
  updateEmployeeRole(firstName, lastName, role, reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(`select id from role where title = '${role}'`, function(
        err,
        result,
        fields
      ) {
        // if any error while executing above query, throw error
        if (err) throw err;

        let con = mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "Password@2020",
          database: "emsdb"
        });

        con.connect(function(err) {
          if (err) throw err;
          // if connection is successful
          con.query(
            `update employee set role_id = ${result[0].id} where first_name = '${firstName}' and last_name = '${lastName}'`,
            function(err, result, fields) {
              // if any error while executing above query, throw error
              if (err) throw err;

              if (result.affectedRows === 0)
                console.log(`${firstName} ${lastName} is not an employee`);
              else console.log(`${firstName} ${lastName} is now a ${role}`);

              reIterate(result);
            }
          );
        });

        // reIterate(result);
      });
    });
  }
  removeEmployee(firstName, lastName, reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        `delete from  employee where first_name = '${firstName}' and last_name = '${lastName}'`,
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          if (result.affectedRows === 0)
            console.log(`${firstName} ${lastName} is not an employee`);
          else console.log(`${firstName} ${lastName} was removed successfully`);

          reIterate(result);
        }
      );
    });
  }
  getManagers(reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select distinct manager_id from employee", // where name = '" + departmentName + "'",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          let managerIDs = result.map(obj => {
            return obj.manager_id;
          });
          let managerIDString = managerIDs.toString(); //.replace(/,/g, " ");
          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              "Select first_name, last_name from employee where id in (" +
                managerIDString +
                ")",
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                //console.log(result);
                reIterate(result);
              }
            );
          });
        }
      );
    });
  }
  getEmployeesByManagerName(managerfName, managerlName, reIterate) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        `SELECT id FROM employee where first_name = '${managerfName}' and last_name = '${managerlName}'`,
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          //console.log(result[0]);
          //console.table(result);
          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              `SELECT * FROM employee where manager_id = ${result[0].id}`,
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                //console.log(result);
                //console.table(result);
                reIterate(result);
              }
            );
          });
        }
      );
    });
  }
};
