import { users, products, purchases, getAllUsers, createUser, createProduct, getAllProducts, productById, queryProductsByName, createPurchase, getAllPuchases, getAllPurchasesFromUsersId} from "./database";
import { TYPES_CATEGORY, TProduct, TUser, TPurchase } from "./types";
import express, {Request, response, Response} from 'express';
import cors from 'cors';
import { CallTracker } from "assert";
import { Console } from "console";
import { stringify } from "querystring";
import { db } from "./database/knex"

/*Exericios Typescritpt II

createUser ("ThaisSouza", "thais.y@hotmail.com", "741852")
getAllUsers()

createProduct("003", "Fire Stick 4k", 322, TYPES_CATEGORY.ELETRONICS)
getAllProducts ()
productById("002")
console.table(queryProductsByName("home"))

createPurchase("ThaisSouza", "003", 3, 966)
getAllPuchases()
console.table(getAllPurchasesFromUsersId ("LudmilaASouza"))
*/

//Exercicio APIS e Express
const app = express ()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//CRUD(CREATE, READ, UPDATE, DELETE)

//Visualiza a tabela de usuários
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT * FROM users;
        `)
        res.status(200).send(result)
    } catch (error){
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
        
    }
})

//Visualiza a tabela de produtos
app.get('/products', async (req: Request, res: Response) => {
    try{
        const result = await db.raw(`
            SELECT * FROM products
        `)
        res.status(200).send(result)
    } catch(error){
        console.log(error)

        if (res.statusCode === 200){
            res.status(500)
        }

        if (error instanceof Error){
            res.send(error.message) 
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//Visualiza o produto através do seu nome específico
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q
        
        if (!q) {
            throw new Error("Parâmetro de busca vazio.")
        }

        if (typeof q !== "string") {
            throw new Error("O parâmetro de busca deve ser uma string.")
        }
        //const result = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
                    
        const result = await db.raw(`
        SELECT * FROM products AS searchProductByName
        WHERE name LIKE "%${q}%" ;
        `)

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }

    }
    

})

//Visualiza o produto através do seu id -- Verificar validação do ID
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if(!id){
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }

        if(typeof id !== "string"){
            throw new Error("A ID tem que ser uma string.")
        }

        //const result = products.find((product) => product.id === id)
        
        const result = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
        `)
        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//Visualiza a tabela de compras
app.get('/purchases', async (re: Request, res: Response) => {
    try{
        const result = await db.raw(`
        SELECT * FROM purchases;
        `)

        res.status(200).send(result)

    } catch(error){
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
    
    
})

//Visualiza a tabala de compras pela id do usuárioa -- Verificar **
app.get('/users/purchases/:id', async (req: Request, res: Response) => {
    try {
        const buyer_id = req.params.buyer_id

        if (!buyer_id){
            throw new Error("Digite a ID do usuário.")
        }

        if(typeof buyer_id !== "string"){
            throw new Error("ID do usuário precisa ser uma string.")
        }

        //const result = purchases.filter((purchase) => purchase.userId.toLowerCase().includes(userId.toLowerCase()))
        
        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE buyer_id = "${buyer_id}";
        `)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//Cria a tabela de usuários
app.post('/users', async (re: Request, res: Response) => {
    try {
        await db.raw(`
        CREATE TABLE users ( 
            id TEXT NOT NULL UNIQUE PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (DATETIME())
        );
        `)
        res.status(200).send({message: "Tabela criada com sucesso!"})
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }        
    }
})

//Cria a tabela de produtos
app.post('/products', async (re: Request, res: Response) => {
    try {
        await db.raw(`
        CREATE TABLE products ( 
            id TEXT NOT NULL UNIQUE PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image_url TEXT NOT NULL
        );
        `)
        res.status(200).send({message: "Tabela criada com sucesso!"})
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }        
    }
})

//Cria a tabela de compras
app.post('/purchases', async (re: Request, res: Response) => {
    try {
        await db.raw(`
        CREATE TABLE purchases (
            id TEXT PRIMARY KEY UNIQUE NOT NULL,
            buyer_id TEXT NOT NULL,
            total_price REAL NOT NULL,
            created_at TEXT DEFAULT (DATETIME()) NOT NULL,
            paid INTEGER DEFAULT(0) NOT NULL,
            FOREIGN KEY (buyer_id) REFERENCES users(id) 
        );
        `)
        res.status(200).send({message: "Tabela criada com sucesso!"})
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }        
    }
})

//Cria a tabela de compras relacionada aos produtos
app.post('/purchases_products', async (re: Request, res: Response) => {
    try {
        await db.raw(`
        CREATE TABLE purchases_products ( 
            purchase_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            quantity INTEGER DEFAULT(1) NOT NULL,
            FOREIGN KEY (purchase_id) REFERENCES purchases(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
        `)
        res.status(200).send({message: "Tabela criada com sucesso!"})
        
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }        
    }
})

//Cria usuários novos na tabela
app.post('/users/create', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        if (!id) {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if (typeof id !== "string") {
            throw new Error("A ID tem que ser uma string.")
        }

        if (!name) {
            throw new Error("Nome inexistente, por favor digite um nome válido.")
        }
        if (typeof name !== "string") {
            throw new Error("O nome tem que ser uma string.")
        }

        if (!email) {
            throw new Error("Email inexistente, por favor digite um Email válido.")
        }
        if (typeof email !== "string") {
            throw new Error("O Email tem que ser uma string.")
        }

        if (!password) {
            throw new Error("Senha inexistente, por favor digite uma senha válida.")
        }
        if (typeof password !== "string") {
            throw new Error("A senha tem que ser uma string.")
        }

        /*        if (!password.match(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,12}$/g)) {             
            throw new Error("Password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")         
        }*/

        /*
            const verificaId = users.find(user => user.id === id)
            if (verificaId) {
                throw new Error("ID do usuário já existe, por favor digite outra ID.")
            }
    
            const verificaEmail = users.find(user => user.email === email)
            if (verificaEmail) {
                throw new Error("Email do usuário já existe, por favor digite outro Email.")
            }
    
            if (!verificaEmail && !verificaEmail) {
                const newUser = { id, email, password }
                users.push(newUser)
                res.status(201).send("Cadastro realizado com sucesso.")
            }
        */
        await db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES ("${id}", "${name}", "${email}", "${password}");
        `)

        res.status(200).send({message: "Usuário cadastrados com sucesso!"})
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }

})

//Insere produtos novos na tabela
app.post('/products/create', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const image_url = req.body.image_url

        if(!id){
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if(typeof id !== "string"){
            throw new Error("A ID tem que ser uma string.")
        }

        if(!name){
            throw new Error("Nome inexistente, por favor digite um nome válido.")
        }
        if(typeof name !== "string"){
            throw new Error("O nome tem que ser uma string.")
        }

        if(!price){
            throw new Error("Preço inexistente, por favor digite um preço válido.")
        }
        if(typeof price !== "number"){
            throw new Error("O preço tem que ser do tipo número.")
        }

        if(!description){
            throw new Error("Categoria inexistente, por favor digite uma categoria válida.")
        }
        if (typeof description !== "string"){
            throw new Error("A descrição tem que ser uma string.")
        }
        /*
        const verificaId = products.find(product => product.id === id)
        if (verificaId) {
            throw new Error("ID do produto já existe, por favor digite outra ID.")
        }

        if(!verificaId){
            const newProducts : TProduct = {id, name, price, category} 
            products.push(newProducts)
            res.status(201).send("Produto cadastrado com sucesso.")
        }*/

        await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}", "${name}", "${price}", "${description}", "${image_url}");
        `)

        res.status(200).send({message:"Produto cadastrado com sucesso!"})

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
        
    }
})

//Insere uma compra nova
app.post('/purchases/create', async (req: Request, res: Response) => {
    try {
        const id : string = req.body.id
        const buyer_id: string = req.body.buyer_id
        const total_price: number = req.body.total_price
        const paid: boolean = req.body.paid
        
        if(!id){
            throw new Error("ID da compra inexistente, por favor digite um ID válido.")
        }
        if(typeof id !== "string"){
            throw new Error("A ID da compra tem que ser uma string.")
        }

        if(!buyer_id){
            throw new Error("ID do usuário inexistente, por favor digite um ID válido.")
        }
        if(typeof buyer_id !== "string"){
            throw new Error("A ID do usuário tem que ser uma string.")
        }

        if(!total_price){
            throw new Error("Total do produto inexistente, por favor digite um total válido.")
        }
        if(typeof total_price !== "number"){
            throw new Error("o total do produto tem que ser um número.")
        }
        
        /*
        const verificaIdUser = users.find(user => user.id === userId)
        if (!verificaIdUser) {
            throw new Error("ID do usuário inexistente, por favor digite outra ID.")
        }

        const verificaIdProduct = products.find(product => product.id === productId)
        if (!verificaIdProduct) {
            throw new Error("Id do produto inexistente, por favor digite outra ID.")
        }

        if (verificaIdUser && verificaIdProduct){
            const verificaTotal = verificaIdProduct.price * quantity 

            if (totalPrice !== verificaTotal) {
                res.status(400)
                throw new Error("O preço total do produto está incorreto. Digite novamente.")
            }

            const createPurchases: TPurchase = {
                userId, productId, quantity, totalPrice
            }
            purchases.push(createPurchases)*/
        
        await db.raw(`
        INSERT INTO purchases (id, buyer_id, total_price, paid)
        VALUES ("${id}", "${buyer_id}", "${total_price}", "${paid}")
        `)
        res.status(201).send("Compra cadastrada com sucesso!")
    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        
        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const newId = req.body.id
        const { email, password } = req.body

        if (!newId) {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if (typeof newId !== "string") {
            throw new Error("A ID tem que ser uma string.")
        }

        if (!email) {
            throw new Error("Email inexistente, por favor digite um Email válido.")
        }
        if (typeof email !== "string") {
            throw new Error("O Email tem que ser uma string.")
        }

        if (!password) {
            throw new Error("Senha inexistente, por favor digite uma senha válida.")
        }
        if (typeof password !== "string") {
            throw new Error("A senha tem que ser uma string.")
        }

        const userFind = users.find((user) => user.id === id)

        if (userFind) {
            userFind.id = newId || userFind.id
            userFind.email = email || userFind.email
            userFind.password = password || userFind.password

            res.status(200).send("Cadastro atualizado com sucesso.")
        } else {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }

    }
})

app.put('/products/:id', (req: Request, res: Response) => {
    try {

        const { id } = req.params
        const newId = req.body.id
        const { name, price, category } : TProduct = req.body

        if (!newId) {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if (typeof newId !== "string") {
            throw new Error("A ID tem que ser uma string.")
        }

        if (!name) {
            throw new Error("Nome inexistente, por favor digite um nome válido.")
        }
        if (typeof name !== "string") {
            throw new Error("O nome tem que ser uma string.")
        }

        if (!price) {
            throw new Error("Preço inexistente, por favor digite um preço válido.")
        }
        if (typeof price !== "number") {
            throw new Error("O preço tem que ser do tipo número.")
        }

        if (!category) {
            throw new Error("Categoria inexistente, por favor digite uma categoria válida.")
        }
        if (!Object.values(TYPES_CATEGORY).includes(category)) {
            throw new Error("Esta sub categoria não existe, somente: acessórios, eletrônicos e eletrodomésticos.")
        }

        const productFind = products.find((product) => product.id === id)

        if (productFind) {
            productFind.id = newId || productFind.id
            productFind.name = name || productFind.name
            productFind.price = price || productFind.price
            productFind.category = category || productFind.category

            res.status(200).send("Produto atualizado com sucesso.")
        } else {
            throw new Error("ID do produto inexiste, por favor digite uma ID válida.")
        }

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
}) 

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if(typeof id !== "string"){
            throw new Error("A ID do usuário tem que ser uma string.")
        }

        const userResult = users.findIndex((user) => {
            return user.id === id
        })

        userResult < 0 ? res.status(404).send("Usuário não existe.") :
            (users.splice(userResult, 1), res.status(202).send("Usuário excluído com sucesso!"))

    } catch (error) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }

})

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (typeof id !== "string") {
            throw new Error("A ID tem que ser uma string.")
        }

        const productResult = products.findIndex((product) => {
            return product.id === id
        })

        productResult < 0 ? res.status(404).send("Produto não existe.") :
            (products.splice(productResult, 1), res.status(202).send("Produto excluído com sucesso!"))

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})


//Deleta a tabela de usuários
app.delete('/users', async (req: Request, res: Response) => {
    try {
    await db.raw(`
    DROP TABLE users;
    `)
    res.status(200).send({message: "Tabela de usuário deletada com sucesso."})

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//Deleta a tabela de produtos
app.delete('/products', async (req: Request, res: Response) => {
    try {
    await db.raw(`
    DROP TABLE products;
    `)
    res.status(200).send({message: "Tabela de produtos deletada com sucesso."})

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//Deleta a tabela de compras
app.delete('/purchases', async (req: Request, res: Response) => {
    try {
    await db.raw(`
    DROP TABLE purchases;
    `)
    res.status(200).send({message: "Tabela de carrinho deletada com sucesso."})

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})

//Deleta a tabela de compras realacionada aos produtos
app.delete('/purchases_products', async (req: Request, res: Response) => {
    try {
    await db.raw(`
    DROP TABLE purchases_products;
    `)
    res.status(200).send({message: "Tabela deletada com sucesso."})

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})





