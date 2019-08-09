var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Seaisle1!",
    database: "bamazon"
});

var supervisorChoices = ["View Supervisor Table", " Add a New Department"];

function connectSQL() {
    connection.connect(function (err, res) {

        if (err) throw err;
        console.log("connected as id: " + connection.threadId + "\n");

        inquirer.prompt([
            {
                type: "list",
                choices: supervisorChoices,
                name: "decision",
                message: " Hello Supervisor, what would you like to do?"
            }]).then(function (response) {

                switch (response.decision) {

                    case supervisorChoices[0]: console.log("You have decided to view the Departments Table")
                        readSupervisorTable();
                        break

                    case supervisorChoices[1]: console.log("You've decided to add a new Department")
                        addDepartment();
                        break

                    default: console.log("Sorry that isn't an option");

                }

            })
    })
}

function readSupervisorTable() {
    var query = connection.query(
        `SELECT * FROM departments`, function (err, res) {
            if (err) throw err;
            var choicesArray = [];
            if (res.length < 1) {
                console.log("There are no items to show!")
            } else {
                for (var i = 0; i < res.length; i++) {
                    parsedCosts = parseInt(res[i].over_head_costs);
                    parsedSales = parseInt(res[i].product_sales);
                    netProfit = parsedSales - parsedCosts;
                    console.log("||" + " ID: " + res[i].department_id + " | " + 
                    " Dept. name: " + res[i].department_name + " | " + 
                    " Dept. costs " + res[i].over_head_costs + " | " + 
                    " Dept. Sales " + res[i].product_sales + " | " + 
                    " Department Profits: " + netProfit + " || ");
                    // choicesArray.push(res[i])
                }
            }
        })

}

function addDepartment() {
    console.log("You have chosen to add a department to your organization")
    inquirer.prompt([
        // {
        //     type: "input",
        //     name: "department_id",
        //     message: "What will be the new item's department_ID?"
        // },
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the new department?"
        },
        {
            type: "input",
            name: "over_head_costs",
            message: "What are the over head costs for this new department?"
        }

    ]).then(function (response) {

        var newID = "";
        console.log("Assigning department item an ID...");
         var query = connection.query(
             `SELECT * FROM departments`, function (err, res) {
                 if (err) throw err;
                 // console.log(res);
                 // console.log(res.length);
                 newID = res.length + 1;
             }
         )

        setTimeout(function(){
        
        var newDepartmentID = newID;
        console.log("new department id: " + newDepartmentID)
        var newDepartmentName = response.department_name;
        console.log("new department name: " + newDepartmentName);
        var newOverhead = response.over_head_costs;
        console.log("Assigned to department: " + newOverhead);


        appendDept(newDepartmentID, newDepartmentName, newOverhead);
}, 3000);

    })


}

appendDept = function (id, deptname, costs) {

    console.log("Adding your new item into the database table ... ");
    // insertString = "INSERT INTO products ( item_id, product_name, department_name, price, stock_quantity) "
    var query = connection.query(
        "INSERT INTO departments SET ?",
        {
            department_id: id,
            department_name: deptname,
            over_head_costs: costs,
            product_sales: 0
        }, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "product inserted!\n");
        }

        // `${insertString} VALUES (${id}, ${prodname}, ${deptname}, ${price}, ${quantity})`, function(err, res) {
        //     if (err) throw err;
        //     console.log("connected as id: " + connection.threadId + "\n");

        //     console.log("You've added your item to the table!")
        // }
    )

}







connectSQL();