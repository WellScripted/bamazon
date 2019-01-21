DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10, 4) NOT NULL, 
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ninja Blender", "Appliances", 49.95, 4), 
("Dyson Vacuum Cleaner", "Household", 299.99, 7),
("Phillips Screwdriver", "Hardware", .99, 20),
("Cardi B Documentary", "Entertainment", 2.00, 1),
("Schick Razors", "Household", 5.00, 20),
("2 Liters of Mountain Dew", "Food", .50, 50),
("Hanes Briefs", "Men's Apparel", 10.00, 100),
("Thug Kitchen Cookbook", "Books", 25.00, 3),
("Aquanet Hairspray", "Household", .99, 30),
("Paper Clips", "Office Supplies", .99, 25);









