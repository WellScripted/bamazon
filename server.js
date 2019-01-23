//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//Connect to DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("SUCCESS!");
    makeTable();
})

//Make Table
var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        console.table(res);
        selectItem(res);
    })
}

//Select Item
var selectItem = function (inventory) {
    inquirer.prompt([{
        type: "input",
        name: "userChoice",
        message: "Give me the ID of the item that you wish to purchase. [Quit with Q]",
        validate: function (value) {
            return !isNaN(value) || value.toLowerCase() === "q";
        }
    }]).then(function (value) {
        userExit(value.userChoice);
        var choiceID = parseInt(value.userChoice);
        var product = checkInventory(choiceID, inventory);
        if (product) {
            selectQuantity(product);
        } else {
            console.log("Item Unavailable!");
            makeTable();
        }
    })
}

//Select Quantity
var selectQuantity = function () {
    inquirer.prompt({
        type: "input",
        name: "UserChoice",
        message: "How many would you like? [Quit with Q]",
        validate: function (value) {
            return !isNaN(value) || value.toLowerCase() === "q";
        }
    }).then(function (value) {
        userExit(value.userChoice);
        var choiceID = parseInt(value.userChoice);
        var quantity = checkInventory(choiceID, inventory);
        if (quantity > inventory) {
            console.log("The demand exceeds the supply. Don't be greedy, select fewer items");
        } else {
            purchaseItem();
            makeTable();
        }
        
    })
    // Inquirer prompt for quantity wanted
    // Make sure to give quit option and validate (just like above)
    // Check if should exit by calling the exit function
    // if quantity desired is greater than stock quantity, print a message alerting the user.
    // else call the purchaseItem function
}

//Purchase Item
var purchaseItem = function () {
    // Connect to mySQL and update the stock_quantity of the item purchased
    // Console log a message the purchase was successful
    // Call makeTable function
}

//Check Inventory
var checkInventory = function () {
    // Loop through all inventory
    // if choiceID === item_id, return that inventory item
    // otherwise return null
}

//userExit
var userExit = function () {
    // If user enters "q" at any point, 
    // console log a goodbye statement to the user
    // Exit the process (using process.exit(0))
}