-- Active: 1679961339881@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE products (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id) 
);

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

INSERT INTO purchases 
VALUES
("C01", 989.90, 1, NULL, "U01"),
("C02", 2576.00, 0, NULL, "U01"),
("C03", 458.00, 0, NULL, "U02"),
("C04", 2419.00, 1, "25/03/2023", "U02");

INSERT INTO users
VALUES
("U04", "eudina.aguiar@gmail.com", "526341");

INSERT INTO products
VALUES
("P06", "Ar Condicionado", 1.712, "Eletrodoméstico");

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

SELECT purchases.id, users.id, users.email, purchases.total_price, purchases.paid, purchases.delivered_at 
FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id; 

UPDATE products
SET PRICE = 789
WHERE id = "P02";

UPDATE users
SET email = "ludmilasouza31@gmail.com"
WHERE id = "U01";

UPDATE purchases
SET delivered_at = "04/04/2023"
WHERE id = "C01";

DELETE FROM users
WHERE id = "U03";

DELETE FROM products
WHERE id = "P04";

