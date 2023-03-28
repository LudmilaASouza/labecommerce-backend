-- Active: 1679961339881@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
(01, "ludmilasouz.a@hotmail.com", "741852"),
(02, "rodrigo.santos@gmail.com", "963852"),
(03, "thais.y@hotmail.com", "789456");

CREATE TABLE products (
    id TEXT NOT NULL UNIQUE PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
(01, "Smart TV 50'", 2.149, "Eletrodoméstico"),
(02, "Home Theater", 899, "Eletrodoméstico"),
(03, "Fire TV Stick", 426.55, "Eletrônico"),
(04, "Tomada Inteligente", 89, "Acessórios"),
(05, "Fone de Ouvido - Sem fio", 458, "Acessórios");

SELECT * FROM products;

SELECT * FROM users;

DROP TABLE products;
DROP TABLE users;