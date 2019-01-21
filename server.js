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

connection.connect(function (err){
    if (err) throw err;
    console.log("SUCCESS!");
    makeTable();
})

//Make Table
var makeTable = function () {
    connection.query("SELECT * FROM products", function(err, res){ 
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
    }]).then(function (value){
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
    //fill with code later
}

//Purchase Item
var purchaseItem = function () {
    //fill with code later
}

//Check Inventory
var checkInventory = function () {
    //fill with code later
}

//userExit
var userExit = function () {
    //fill with code later
}