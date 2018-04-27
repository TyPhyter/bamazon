const mysql = require('mysql');
const inquirer = require('inquirer');


function checkInventory(productID){
    connection.query(`SELECT stock_quantity FROM products where ID = ${productID}`, function(err, res) {
        return res[0].stock_quantity > 0;
    });
};

function start() {

    connection.query("SELECT * FROM products", function(err, res) {

        let productArray = [...res];
        if (err) throw err;
        console.log(res);

        inquirer.prompt([
            {
                type: 'input',
                name: 'productID',
                message: "Enter the ID of the item you would like to purchase:",
            }
        ]).then((answers)=>{
            //check stock to insure it wasn't depleted since last DB query

            //TODO: have checkInventory return a Promise, the next .then() is firing
            // before checkInventory comes back with an answer
            let itemInStock;
            return itemInStock = checkInventory(answers.productID);
            //return itemInStock;
        }).then((itemInStock)=>{
            
            if(itemInStock){
                console.log("It's in stock!");
                //TODO: query DB to remove the purchased amount from the DB stock
                //TODO: multiply price*numPurchased for total price and log it
            } else {
                console.log("Sorry, item out of stock");
            }
            connection.end();
        });
      });
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
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });