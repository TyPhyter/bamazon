  DROP DATABASE IF EXISTS bamazonDB;
  CREATE DATABASE bamazonDB;

  USE bamazonDB;

  CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (id)
  );

  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Huggies Overnight 42pk', 'Baby', '26.27', '1');
  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('CombatWing Wireless Mouse', 'Computer and Electronics', '17.35', '1');
  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Powercrunch Meal Bars', 'Food & Supplements', '16.99', '1');
  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Arm&Hammer Multi-Cat Litter 40lbs', 'Pet', '34.22', '1');
  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('3oz Wax Coated Measuring Cups 50ct', 'Arts and Crafts', '7.88', '1');
  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('NTAG215 Blank NDEF Cards 25 ct', 'Computer and Electronics', '11.89', '1');
  INSERT INTO `bamazondb`.`products` (`product_name`, `department_name`, `price`, `stock_quantity`) VALUES ('Ad-Supported bAmazon gEcho Smart Lizard', 'Computer and Electronics', '0.00', '1');

