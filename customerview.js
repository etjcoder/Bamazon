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

function connectSQL() {
    connection.connect(function (err, res) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId + "\n");

        readTableCustomer();

    })
}

function readTableCustomer() {
    console.log("Reading Table of products for Customer...");
    var query = connection.query(
        `SELECT * FROM products`, function (err, res) {
            if (err) throw err;
            var choicesArray = [];
            if (res.length < 1) {
                console.log("There are no items to show!")
            } else {
                for (var i = 0; i < res.length; i++) {
                    console.log("||" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " || ");
                    choicesArray.push(`Item #: ${res[i].item_id} -- ${res[i].product_name}`)
                }
            }
            inquirer.prompt([
                {
                    type: "list",
                    name: "chosen_item",
                    choices: choicesArray,
                    message: "Which item would you like to buy?"
                },
                {
                    type: "input",
                    name: "amount_requested",
                    message: "How many of these items would you like to buy?"
                }
            ]).then(function (response) {
               
                itemID = "";
                chosenAmount = parseInt(response.amount_requested);

                chosenAmountTest1 = function () {
                    for (i = 0; i < choicesArray.length; i++) {
                        if (response.chosen_item === choicesArray[i]) {
                            itemID = i;
                        }
                    }
                }
                chosenAmountTest1();


                chosenItemID = itemID;
                findProductInTable(chosenItemID);
                checkProduct = function (name, price, quantity, dept) {
                    var finalCost = 0;
                    console.log(`You've chosen ${name}. That will cost $${price}. There are ${quantity} remaining.`);
                    parsedPrice = parseInt(price);
                    parsedQuantity = parseInt(quantity);
              
                    if (chosenAmount > parsedQuantity) {
                        console.log("-----------------------------------------------------------")
                        console.log("-------------------------BUYING EVENT ---------------------")
                        console.log("...Sorry there is not enough in stock to fill your order...")
                        console.log("-----------------------------------------------------------")
                        console.log("-----------------------------------------------------------")
                    } else {
                        var amountRemaining = parsedQuantity - chosenAmount;
                        console.log("-----------------------------------------------------------")
                        console.log("-------------------------BUYING EVENT ---------------------")
                        console.log(`...Thank you! You've bought ${chosenAmount}. Remaining Stock: ${amountRemaining}...`)
                        console.log("-----------------------------------------------------------")
                        console.log("-----------------------------------------------------------")
                        updateTable(amountRemaining, chosenItemID);

                        revealCost = function () {
                            finalCost = chosenAmount * parsedPrice;
                            console.log("--------------------------------------------------------------------------------------")
                            console.log("-------------------------CONFIRMATION EVENT ------------------------------------------")
                            console.log(`...Thank you! Your total cost will be $${finalCost}. Please recommend us to your friends!...`)
                            console.log("--------------------------------------------------------------------------------------")
                            console.log("--------------------------------------------------------------------------------------")
                            calculateProfits(dept, finalCost);
                        }
                    }

                }
            })
        }
    )

}

function findProductInTable(itemID) {
    parsedItem = parseInt(itemID)
    var query = connection.query(
        `SELECT * FROM products WHERE item_id = ${parsedItem}`, function (err, res) {
            if (err) throw err;
          
            itemChosen = res[0].product_name;
            itemPrice = res[0].price;
            itemQuantity = res[0].stock_quantity;
            itemDepartment = res[0].department_name;
            checkProduct(itemChosen, itemPrice, itemQuantity, itemDepartment);
        }
    )
}

function updateTable(amt, id) {
    parsedAmountRemaining = parseInt(amt)
    var query = connection.query(
        `UPDATE products SET stock_quantity = ${amt} WHERE item_id = ${id}`, function (err, res) {
            if (err) throw err;
            console.log("...........................................................");
            console.log(".....................SERVER EVENT..........................");
            console.log("...............Database has been updated...................");
            console.log("...........................................................");
            console.log("...........................................................");
            revealCost();
        }

    )
}

function calculateProfits(dept, value) {
    var currentSales = 0;
    var query = connection.query(
        `SELECT * FROM departments WHERE department_name = "${dept}"`, function (err, res) {

            currentSales = res[0].product_sales;
        }
    )

    setTimeout(function () {
        console.log("Current Sales are: " + currentSales);
        newSales = currentSales + value;
        console.log("New sales are: " + newSales);
        var query = connection.query(
            `UPDATE departments SET product_sales = ${newSales} WHERE department_name = "${dept}"`, function (err, res) {
                if (err) throw err;

                console.log("Profits calculated and added to departments Table!")

            }
        )

    }, 4000)
}

appendItem = function (id, prodname, deptname, itemprice, quantity) {

    console.log("Adding your new item into the database table ... ");
    // insertString = "INSERT INTO products ( item_id, product_name, department_name, price, stock_quantity) "
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            item_id: id,
            product_name: prodname,
            department_name: deptname,
            price: itemprice,
            stock_quantity: quantity
        }, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + "product inserted!\n");
        }
    )
}
connectSQL();