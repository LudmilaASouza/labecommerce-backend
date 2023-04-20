-- Active: 1679961339881@@127.0.0.1@3306

CREATE TABLE users ( 
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME())
);

CREATE TABLE products ( 
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id) 
);

CREATE TABLE purchases_products ( 
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER DEFAULT(1) NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM purchases_products;

INSERT INTO users (id, email, password)
VALUES
("U01", "ludmilasouz.a@hotmail.com", "741852"),
("U02", "rodrigo.santos@gmail.com", "963852"),
("U03", "thais.y@hotmail.com", "789456");

INSERT INTO products (id, name, price, category)
VALUES
("P01", "Smart TV 50'", 2149.00, "Eletrodoméstico"),
("P02", "Home Theater", 899.00, "Eletrodoméstico"),
("P03", "Fire TV Stick", 426.00, "Eletrônico"),
("P04", "Tomada Inteligente", 89.90, "Acessórios"),
("P05", "Fone de Ouvido - Sem fio", 458.00, "Acessórios");

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("C01", 789.00, 1, "U01"),
("C02", 2149.00, 1, "U01"),
("C03", 916.00, 1, "U02"),
("C04", 359.60, 1, "U02");

INSERT INTO users
VALUES
("U04", "eudina.aguiar@gmail.com", "526341");

INSERT INTO products
VALUES
("P06", "Ar Condicionado", 1.712, "Eletrodoméstico");

INSERT INTO purchases_products
VALUES
("C01", "P02", 1),
("C02", "P01", 1),
("C03", "P05", 2),
("C04", "P04", 3);

SELECT * FROM products AS getAllProducts;

SELECT * FROM users AS getAllUsers;

SELECT * FROM purchases AS getAllPurchases;

SELECT * FROM products AS searchProductByName
WHERE name LIKE "%tv%" ;

SELECT * FROM products AS getProductsById
WHERE id = "P05";

SELECT * FROM users 
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 3
OFFSET 2;

SELECT * FROM products
WHERE price >= 500.00
AND price <= 1200.00
ORDER BY price ASC;

SELECT purchases.id AS idPurchases, users.id AS idUsers, 
users.email, purchases.total_price, 
purchases.paid, purchases.created_at 
FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id; 

SELECT purchase_id AS idPurchases, purchases.buyer_id AS idUsers,
product_id AS idProducts, products.name  AS productsName,
products.price, quantity, purchases.total_price 
FROM purchases_products
INNER JOIN products ON product_id = products.id
INNER JOIN purchases ON purchase_id = purchases.id;

UPDATE purchases 
SET total_price = 
((select price from products WHERE id = "P04")
*
(select quantity from purchases_products WHERE product_id = "P04"))
WHERE id = "C04";

UPDATE products
SET PRICE = 789
WHERE id = "P02";

UPDATE users
SET email = "ludmilasouza31@gmail.com"
WHERE id = "U01";

UPDATE purchases
SET delivered_at = DATETIME('now', 'localtime')
WHERE id = "C01";

DELETE FROM users
WHERE id = "U03";

DELETE FROM products
WHERE id = "P04";

