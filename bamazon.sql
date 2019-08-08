ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Seaisle1!';

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50),
  price INT(10) default 1,
  stock_quantity INT(10) default 0
);

USE bamazon;
INSERT INTO products (
    item_id, 
    product_name, 
    department_name, 
    price, 
    stock_quantity
    )
VALUES 
  ( "1", "apples", "food", "3", "50"),
  ( "2", "bananas", "food", "2", "50"),
  ( "3", "cherries", "food", "1", "50"),
  ( "4", "dragonfruit", "food", "5", "50"),
  ( "5", "headphones", "electronics", "20", "50"),
  ( "6", "keyboards", "electronics", "35", "50"),
  ( "7", "mouse", "electronics", "10", "50"),
  ( "8", "nomanssky", "videogame", "50", "50"),
  ( "9", "madden20", "videogame", "60", "50"),
  ( "10", "callofduty", "videogame", "40", "50");

  

SELECT * FROM products;

CREATE TABLE products(
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50),
  price INT(10) default 1,
  stock_quantity INT(10) default 0
);

USE bamazon;
CREATE TABLE departments(
department_id INT NOT NULL,
department_name VARCHAR(50) NOT NULL,
over_head_costs INT(10) default 0
);

SELECT * FROM departments;
ALTER TABLE departments ADD product_sales INT(10);
USE bamazon;
SELECT * FROM departments WHERE department_name = "electronics";

USE bamazon;
INSERT INTO departments (
	department_id,
    department_name,
    over_head_costs,
    product_sales
) VALUES
	("1", "food", "5000", "0"),
    	("2", "electronics", "8000", "0"),
        	("3", "videogames", "7000", "0"),
            	("4", "Shoes", "4000", "0")
