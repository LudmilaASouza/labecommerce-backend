//import { users, products, purchases, getAllUsers, createUser, createProduct, getAllProducts, productById, queryProductsByName, createPurchase, getAllPuchases, getAllPurchasesFromUsersId} from "./database";
import { TProduct, TUser, TPurchase } from "./types";
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

//Visualiza a tabela de usuários -- OKOK
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result: TUser[] = await db.select(
            "users.id",
            "users.name",
            "users.email",
            "users.password",
            "users.created_at AS createdAd"
        ).from("users")
        if (result.length === 0){
            throw new Error("Tabela de usuários vazia.")
        }
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

//Cria usuários novos na tabela -- OKOK
app.post('/users', async (req: Request, res: Response) => {
    try {
        const newId: string = Math.floor(Date.now() * Math.random()).toString(36)
        const name: TUser[] = req.body.name
        const email: TUser[] = req.body.email
        const password: TUser[] = req.body.password
        
        /*if (!id) {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if (typeof id !== "string") {
            throw new Error("A ID tem que ser uma string.")
        }*/

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

        /*
            const verificaId = users.find(user => user.id === id)
            if (verificaId) {
                throw new Error("ID do usuário já existe, por favor digite outra ID.")
            }
            const verificaEmail = users.find(user => user.email === email)
            if (verificaEmail) {
                throw new Error("Email do usuário já existe, por favor digite outro Email.")
            }
            if (!verificaId && !verificaEmail) {
                const newUser = { id, email, password }
                users.push(newUser)
                res.status(201).send("Cadastro realizado com sucesso.")
            }
        */
        const verificaEmail = await db("users").where({email:email})
        if(verificaEmail[0]){
            res.status(404)
            throw new Error("Email do usuário já existe, por favor digite outro Email.")
        }
        
        await db.insert({id:newId, name, email, password}).into("users")
        res.status(201).send({message: "Usuário cadastrado com sucesso!"})

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

//Visualiza a tabela de produtos -- OKOK
app.get('/products', async (req: Request, res: Response) => {
    try{
        const result: TProduct[] = await db
        .select(
            "products.id",
            "products.name",
            "products.price",
            "products.description", 
            "products.image_url AS imageUrl"
            ).from("products")
        if(result.length === 0){
            throw new Error("Tabela de produtos vazia.")
        }
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

//Cria produtos novos na tabela -- OKOK
app.post('/products/create', async (req: Request, res: Response) => {
    try {
        const newId: string = Math.floor(Date.now() * Math.random()).toString(36)
        const name: TProduct[] = req.body.name
        const price: TProduct[] = req.body.price
        const description: TProduct[] = req.body.description
        const imageUrl: TProduct[] = req.body.image_url

        /*if(!id){
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if(typeof id !== "string"){
            throw new Error("A ID tem que ser uma string.")
        }*/

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
            throw new Error("Descrição inexistente, por favor digite uma descrição válida.")
        }
        if (typeof description !== "string"){
            throw new Error("A descrição tem que ser uma string.")
        }

        if(!imageUrl){
            throw new Error("URL inexistente, por favor coloque uma URL válida.")
        }
        if (typeof imageUrl !== "string"){
            throw new Error("A URL tem que ser uma string.")
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

        await db.insert({id: newId, name, price, description, image_url: imageUrl}).into("products")
        res.status(201).send({message:"Produto cadastrado com sucesso!"})

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

//Visualiza o produto através do seu nome específico -- OKOK
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
        const result = await db("products")
        .select("*")
        .where("name", "LIKE", `%${q}%`)

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

//Edita um produto pela Id -- OKOK
app.put('/products/:id', async (req: Request, res: Response) => {
    try {

        const id: string = req.params.id
        const name: TProduct[] = req.body.name
        const price: TProduct[] = req.body.price
        const description: TProduct[] = req.body.description
        const imageUrl: TProduct[] = req.body.image_url
    
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

        if(!price){
            throw new Error("Preço inexistente, por favor digite um preço válido.")
        }
        if(typeof price !== "number"){
            throw new Error("O preço tem que ser do tipo número.")
        }

        if(!description){
            throw new Error("Descrição inexistente, por favor digite uma descrição válida.")
        }
        if (typeof description !== "string"){
            throw new Error("A descrição tem que ser uma string.")
        }

        if(!imageUrl){
            throw new Error("URL inexistente, por favor coloque uma URL válida.")
        }
        if (typeof imageUrl !== "string"){
            throw new Error("A URL tem que ser uma string.")
        }
        /*const productFind = products.find((product) => product.id === id)
        if (productFind) {
            productFind.id = newId || productFind.id
            productFind.name = name || productFind.name
            productFind.price = price || productFind.price
            productFind.category = category || productFind.category

            res.status(200).send("Produto atualizado com sucesso.")
        } else {
            throw new Error("ID do produto inexiste, por favor digite uma ID válida.")
        }*/

        const [productFind] : TProduct[] = await db("products").where({id: id})
        if(productFind){
            await db("products")
            .update({
                name: name || productFind.name,
                price: price || productFind.price,
                description: description || productFind.description,
                image_url: imageUrl || productFind.imageUrl
            })
            .where({id: id})
        } else {
            res.status(404)
            throw new Error("ID não encontrada.")
        }
        res.status(200).send({message:"Produto atualizado com sucesso!"})

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

//Insere uma compra nova -- OKOK
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const newPurchaseId: string = Math.floor(Date.now() * Math.random()).toString(36)
        const buyerId: TPurchase[] = req.body.buyer_id
        const totalPrice: TPurchase[] = req.body.total_price
        
        const productId: string[] = req.body.product_id
        const quantity: number[] = req.body.quantity
    
        
        
        if(!buyerId){
            throw new Error("ID do usuário inexistente, por favor digite um ID válido.")
        }
        if(typeof buyerId !== "string"){
            throw new Error("A ID do usuário tem que ser uma string.")
        }

        if(!totalPrice){
            throw new Error("Total do produto inexistente, por favor digite um total válido.")
        }
        if(typeof totalPrice !== "number"){
            throw new Error("o total do produto tem que ser um número.")
        }
        /*const verificaIdUser = users.find(user => user.id === userId)
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
        
        await db("purchases").insert({id: newPurchaseId, buyer_id: buyerId, total_price: totalPrice})
        await db("purchases_products").insert({purchase_id: newPurchaseId, product_id: productId, quantity})
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

//Visualiza a tabela de compras pela id do usuário -- OKOK
app.get('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        //const result = purchases.filter((purchase) => purchase.userId.toLowerCase().includes(userId.toLowerCase()))

        if(id){
        const purchaseList = await db("purchases")
        .select(
            "purchases.id AS purchaseId",
            "purchases.buyer_id AS buyerId" ,
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt",
            "purchases.paid" 
        )
        .join(
            "users",
            "purchases.buyer_id",
            "=",
            "users.id"
        ).where("users.id", "=", `${id}`)
        .first()
        if(!purchaseList){
            res.status(400)
            throw new Error("Compra não encontrada.")
        }
        const products = await db("purchases_products")
        .select(
            "products.id",
            "products.name",
            "products.price",
            "products.description",
            "products.image_url AS imageUrl",
            "purchases_products.quantity"
        )
        .join(
            "purchases",
            "purchases_products.purchase_id",
            "=",
            "purchases.id"
        )
        .join(
            "products",
            "purchases_products.product_id",
            "=",
            "products.id"
        ).where("purchases.buyer_id", "=", `${id}`)
        res.status(200).send({...purchaseList, products})
        } else {
            res.status(400)
            throw new Error("ID do usuário não encontrada.")
        }   
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

//Visualiza o produto através do seu id -- **
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id

        if(!id){
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if(typeof id !== "string"){
            throw new Error("A ID tem que ser uma string.")
        }

        //const result = products.find((product) => product.id === id)
        
        const result: TProduct[] = await db.select("*").from("products").where({id: id})
        if(result.length ===0){
            throw new Error("Produto não encontrado.")
        } else {
            res.status(200).send(result)
        }

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

//Edita um usuário pela id. -- **
app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const id: string  = req.params.id
        const name: TUser[] = req.body.name
        const email: TUser[] = req.body.email
        const password: TUser[] = req.body.password

        if (!name) {
            throw new Error("Nome inexistente, por favor digite um Nome válido.")
        }
        if (typeof name !== "string") {
            throw new Error("O Nome tem que ser uma string.")
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

        /*const userFind = users.find((user) => user.id === id)
        if (userFind) {
            userFind.id = newId || userFind.id
            userFind.email = email || userFind.email
            userFind.password = password || userFind.password
            res.status(200).send("Cadastro atualizado com sucesso.")
        } else {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }*/

        const [userFind] : TUser[] = await db("users").where({id: id})
        if(userFind){
            await db("users")
            .update({
                name: name || userFind.name,
                email: email || userFind.email,
                password: password || userFind.password
            })
            .where({id: id})
        } else {
            res.status(404)
            throw new Error("ID não encontrada.")
        }
        res.status(200).send({message:"Usuário atualizado com sucesso!"})

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

//Deleta um usuário. --**
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete: string = req.params.id
        const verificaId: string [] = await db.select("*").from("users").where({id: idToDelete})

        if(verificaId.length === 0){
            throw new Error("Usuário não encontrado.")
        }
        await db.delete().from("users").where({id: idToDelete})
        res.status(200).send({message:"Usuário excluído com sucesso!"})

        /*const userResult = users.findIndex((user) => {
            return user.id === id
        })
        userResult < 0 ? res.status(404).send("Usuário não existe.") :
            (users.splice(userResult, 1), res.status(202).send("Usuário excluído com sucesso!"))*/

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

//Deleta um produto. --**
app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete: string = req.params.id
        const verificaId: string [] = await db.select("*").from("products").where({id: idToDelete})

        if(verificaId.length === 0){
            throw new Error("Produto não encontrada.")
        }
        await db.delete().from("products").where({id: idToDelete})
        res.status(200).send({message:"Produto excluído com sucesso!"})

        /*const productResult = products.findIndex((product) => {
        return product.id === id
        })
        productResult < 0 ? res.status(404).send("Produto não existe.") :
            (products.splice(productResult, 1), res.status(202).send("Produto excluído com sucesso!"))
        */
            
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

//Deleta uma compra pelo ID. -- **
app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete: string = req.params.id
        const verificaId: string [] = await db.select("*").from("purchases").where({id: idToDelete})

        if(verificaId.length === 0){
            throw new Error("Compra não encontrada.")
        }
        await db.delete().from("purchases_products").where({purchase_id: idToDelete})
        await db.delete().from("purchases").where({id: idToDelete})
        
        res.status(200).send({message:"Compra cancelada com sucesso."})

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