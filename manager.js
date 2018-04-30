const mysql = require('mysql');
const inquirer = require('inquirer');

//what are the braces for here?
const { table } = require('table');


function checkInventory(productID) {

    return new Promise((resolve, reject) => {
        connection.query('SELECT stock_quantity FROM products where id = ?', [productID], (err, res) => {

            let quantity = res[0].stock_quantity;

            if (err) {
                reject(err);
            }

            resolve(quantity);
        });
    });
};

//takes an array of objects and creates a formatted table out of them
function logTableFromArray(arr) {

    let tableArray = [];
    //first row array for prop names
    tableArray.push(Object.getOwnPropertyNames(arr[0]));
    arr.forEach((item) => {
        itemArray = Object.values(item);

        tableArray.push(itemArray);
        //tableArray.push([item.id, item.product_name])
    });
    let output = table(tableArray);
    console.log(output);
}

function logAllProducts() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM products", (err, res) => {

            let productArray = [...res];
            if (err) reject(err);
            logTableFromArray(productArray);
            resolve();
        });
    });
}

function logLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", (err, res) => {

        let productArray = [...res];
        if (err) throw err;
        logTableFromArray(productArray);

    });
}

function addInventory() {

    let prom = logAllProducts();
    prom.then(() => {
        let productID, amount;
        inquirer.prompt([
            {
                type: 'input',
                name: 'productID',
                message: "Enter the ID for the product you would like to add inventory for:"
            },
            {
                type: 'input',
                name: 'amount',
                message: "How many would you like to add?"
            }
        ]).then((answers) => {
            productID = answers.productID;
            amount = answers.amount;
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ?  WHERE id = ?", [amount, productID],
                (err, res) => {

                    if (err) throw err;
                    console.log(`Success! ${amount} added to inventory for ID: ${productID}`);
                });
        });
    });
}

function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Product name:'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Department:'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Price:'
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Quantity:'
        },
    ]).then((answers) => {
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?);", 
            [answers.name, answers.department, parseFloat(answers.price), parseInt(answers.quantity)],
            (err, res) => {

                if (err) throw err;
                console.log(`Success! Added product ${answers.name}`);
            });
    });
}

function start() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action',
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
            ]
        }
    ]).then((answers) => {
        switch (answers.action) {
            case 'View Products for Sale':
                logAllProducts();
                break;
            case 'View Low Inventory':
                logLowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
            default:
                console.log("Unrecognized Action");
        }
    }).catch((err) => {
        console.log(err);
    });

    // logAllProducts();

    // connection.query("SELECT * FROM products", (err, res) => {

    //     let productArray = [...res];
    //     if (err) throw err;
    //     logTableFromArray(productArray);

    //     let productID, numRequested, stock;

    //     inquirer.prompt([
    //         {
    //             type: 'input',
    //             name: 'productID',
    //             message: "Enter the ID of the item you would like to purchase:",
    //         },
    //         {
    //             type: 'input',
    //             name: 'numRequested',
    //             message: 'How many would you like to purchase?'
    //         }
    //     ]).then((answers) => {
    //         //check stock to insure it wasn't depleted since last DB query
    //         productID = answers.productID;
    //         numRequested = answers.numRequested;
    //         return checkInventory(answers.productID);

    //     }).then((quantity) => {
    //         stock = quantity;
    //         if (stock >= numRequested) {
    //             console.log("It's in stock!");
    //             //TODO: query DB to remove the purchased amount from the DB stock
    //             //TODO: multiply price*numPurchased for total price and log it
    //             connection.query('UPDATE products SET stock_quantity = ?  WHERE id = ?', [stock - numRequested, productID],
    //                 (err, res) => {
    //                     if (err) throw err;

    //                     console.log("Product purchased!")
    //                 });   
    //         } 
    //         else {
    //             console.log("Sorry, item out of stock");
    //         }

    //         connection.end();

    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // });
}

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});