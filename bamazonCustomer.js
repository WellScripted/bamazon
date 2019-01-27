//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
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
    console.log(" ");
    console.log('SUCCESS!'.green);
    console.log(" ");
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
            console.log(" ");
            console.log("Item Unavailable!".red.underline);
            console.log(" ");
            makeTable();
        }
    })
}

//Select Quantity
var selectQuantity = function (product) {
    inquirer.prompt({
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function (value) {
            return !isNaN(value) || value.toLowerCase() === "q";
        }
    }).then(function (value) {
        userExit(value.quantity);
        var quantity = parseInt(value.quantity);
        if (quantity > product.stock_quantity) {
            console.log(" ");
            console.log('The demand exceeds the supply. DO NOT be greedy, select fewer items'.rainbow);
            console.log(" ");
            makeTable();
        } else {
            purchaseItem(product, quantity);
        }

    })

}

//Purchase Item
var purchaseItem = function (product, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id], function (err, res) {
        console.log(" ");
        console.log('Congradulations on your purchase!'.bold.green);
        console.log(" ");
        makeTable();
    })
    

}

//Check Inventory
var checkInventory = function (choiceID, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceID) {
            return inventory[i];
        }
    }
    return null;

}

//userExit
var userExit = function (choice) {
    if (choice.toLowerCase() === "q") {
        console.log(" ");
        console.log('Thank you for visiting. Please come back soon!'.underline.bgYellow.black);
        console.log(" ");
        process.exit(0);
    }

}