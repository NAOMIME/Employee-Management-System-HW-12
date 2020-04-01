const CMS_Prompt = require("./cms-inquirer");

//const queries = new Queries();
const app = new CMS_Prompt();
console.log(
  "\n\n========================\nNaomi's EMS\n========================"
);
app.runPrompt();

//queries.addDepartment("Human Resources");
//queries.addRole("Manager", 500.23, "Human Resources");
//queries.addEmployee("Savoir", "Perez", "Manager", "Alex");
