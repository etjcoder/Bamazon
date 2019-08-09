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

var choicesArray = ["View products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"];

function connectSQL() {
    connection.connect(function (err, res) {

        if (err) throw err;
        console.log("connected as id: " + connection.threadId + "\n");

        inquirer.prompt([
            {
                type: "list",
                name: "option",
                choices: choicesArray,
                message: "Good day Manager, what would you like to do?"
            }


        ]).then(function (response) {
            switch (response.option) {
                case choicesArray[0]: console.log("You want to view products");
                    readTable();
                    break

                case choicesArray[1]: console.log("You want to view items that are low in inventory")
                    viewLowInventory();
                    break


                case choicesArray[2]: console.log("You want to add quantities to your inventory")
                    increaseItemQuantity();
                    break

                case choicesArray[3]: console.log("You want to add a new item to your inventory")
                    addToInventory();
                    break

                default: console.log("I do not recognize that com")
            }


        })


    })
}

function readTable() {
    console.log("Reading Table of products for Manager...");
    var query = connection.query(
        `SELECT * FROM products`, function (err, res) {
            if (err) throw err;

            if (res.length < 1) {
                console.log("There are no items to show!")
            } else {
                for (var i = 0; i < res.length; i++) {
                    console.log("||" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " || ");
                    // choicesArray.push(res[i])
                }
            }
        }
    )
}

function viewLowInventory() {
    console.log("Reading Table of low inventory for Manager...");
    var query = connection.query(
        `SELECT * FROM products WHERE stock_quantity < 25`, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("||" + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + " || ");
            }
        }
    )
}

var choicesArray2 = [];

function increaseItemQuantity() {
    console.log("You have chosen to increase the inventory on an item...")

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
    //     }
    // )
            // console.log(choicesArray);
            inquirer.prompt([
                {
                    type: "list",
                    name: "chosen_item",
                    choices: choicesArray,
                    message: "Which item would you like to increase?"
                },
                {
                    type: "input",
                    name: "amount_requested",
                    message: "How many of these items would you like to add into the inventory?"
                }
            ]).then(function (response) {

                console.log("You've chosen " + response.chosen_item);
                console.log("The amount you've chosen to add is: " + response.amount_requested);
                
                chosenAmount = parseInt(response.amount_requested);
                itemID = "";

                chosenAmountTest2 = function () {
                    for (i = 0; i < choicesArray.length; i++) {
                        if (response.chosen_item === choicesArray[i]) {
                            itemID = i;
                        }
                    }
                }
                chosenAmountTest2();
                chosenItemID = itemID;

               
                findProductInTable(chosenItemID);

                updateProduct = function (name, price, quant) {
                    console.log(`You've chosen to update the quantity of ${name}. The current quantity is ${quant}`);
                    parseQuantity = parseInt(quant);
                    newInventoryCount = chosenAmount + parseQuantity;
                    console.log("The new Inventory amount will be: " + newInventoryCount);

                    var query = connection.query(
                        `UPDATE products SET stock_quantity = ${newInventoryCount} WHERE item_id = ${chosenItemID}`, function (err, res) {

                            if (err) throw err;
                            console.log(`The quantity of ${name} has been updated from ${parseQuantity} to ${newInventoryCount}!`);
                        }
                    )
                }
            }

            )
            
        }
    )
}

function findProductInTable(itemID) {
    parsedItem = parseInt(itemID)
    var query = connection.query(
        `SELECT * FROM products WHERE item_id = ${parsedItem}`, function (err, res) {
            if (err) throw err;
            // console.log(res);
            // console.log("findProductInTable function returned: " + JSON.stringify(res));
            itemChosen = res[0].product_name;
            itemPrice = res[0].price;
            itemQuantity = res[0].stock_quantity;
            updateProduct(itemChosen, itemPrice, itemQuantity);
        }
    )
}


function addToInventory() {
    console.log("You have chosen to add an item to the table")
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "What is the name of the item you are adding?"
        },
        {
            type: "input",
            name: "department_name",
            message: "What is the category of the item you are adding?"
        },
        {
            type: "input",
            name: "price",
            message: "What will be the price of this item?"
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "How many items are available to be sold?"
        }

    ]).then(function (response) {
       var newID = "";
        var query = connection.query(
            `SELECT * FROM products`, function (err, res) {
                if (err) throw err;
                // console.log(res);
                // console.log(res.length);
                newID = res.length;
            }
        )
        
        setTimeout(function(){
            var newItemID = newID;
            // console.log("new item id: " + newItemID)
            var newProductName = response.product_name;
            console.log("new Item name: " + newProductName);
            var newProdDeptName = response.department_name;
            console.log("Assigned to department: " + newProdDeptName);
            var newProdPrice = response.price;
            console.log("The price for this new item is: " + newProdPrice);
            var newProdQuantity = response.stock_quantity;
            console.log("Of this new item, the amount in stock will be: " + newProdQuantity);
    
            appendItem(newItemID, newProductName, newProdDeptName, newProdPrice, newProdQuantity);
    
        }, 4000)
    })


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

        // `${insertString} VALUES (${id}, ${prodname}, ${deptname}, ${price}, ${quantity})`, function(err, res) {
        //     if (err) throw err;
        //     console.log("connected as id: " + connection.threadId + "\n");

        //     console.log("You've added your item to the table!")
        // }
    )

}

//GROUP BY stock_quantity < 50
connectSQL();