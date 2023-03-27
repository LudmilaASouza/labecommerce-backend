import { users, products, purchases, getAllUsers, createUser, createProduct, getAllProducts, productById, queryProductsByName, createPurchase, getAllPuchases, getAllPurchasesFromUsersId} from "./database";
import { TYPES_CATEGORY, TProduct, TUser, TPurchase } from "./types";
import express, {Request, response, Response} from 'express';
import cors from 'cors';
import { CallTracker } from "assert";
import { Console } from "console";
import { stringify } from "querystring";

//Exericios Typescritpt II

createUser ("ThaisSouza", "thais.y@hotmail.com", "741852")
//getAllUsers()

createProduct("003", "Fire Stick 4k", 322, TYPES_CATEGORY.ELETRONICS)
//getAllProducts ()
//productById("002")
//console.table(queryProductsByName("home"))

createPurchase("ThaisSouza", "003", 3, 966)
//getAllPuchases()
//console.table(getAllPurchasesFromUsersId ("LudmilaASouza"))


//Exercicio APIS e Express
const app = express ()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//CRUD(CREATE, READ, UPDATE, DELETE)

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
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

app.get('/products', (req: Request, res: Response) => {
    try{
         res.status(200).send(products)
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

app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q

        if (!q) {
            throw new Error("Parâmetro de busca vazio.")
        }

        if (typeof q !== "string") {
            throw new Error("O parâmetro de busca deve ser uma string.")
        }

        const result = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
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

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const {id} = req.params

        if(!id){
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }

        if(typeof id !== "string"){
            throw new Error("A ID tem que ser uma string.")
        }

        const result = products.find((product) => product.id === id)

        if(result){
            res.status(200).send(result)
        } else {
            throw new Error("ID do produto não encontrada.")
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

app.get('/purchases', (re: Request, res: Response) => {
    try{
        res.status(200).send(purchases)
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

app.get('/purchases/:userId', (req: Request, res: Response) => {
    try {
        const {userId} = req.params

        if (!userId){
            throw new Error("Digite a ID do usuário.")
        }

        if(typeof userId !== "string"){
            throw new Error("ID do usuário precisa ser uma string.")
        }

        const result = purchases.filter((purchase) => purchase.userId.toLowerCase().includes(userId.toLowerCase()))
        
        if(result){
            res.status(200).send(result)
        } else {
            throw new Error("ID do usuário não encontrado.")
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

app.post('/users', (req: Request, res: Response) => {
    try {
        const { id, email, password } = req.body

        if (!id) {
            throw new Error("ID inexistente, por favor digite um ID válido.")
        }
        if (typeof id !== "string") {
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

        /*        if (!password.match(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,12}$/g)) {             
            throw new Error("Password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")         
        }*/

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

app.post('/products', (req: Request, res: Response) => {
    try {
        const {id, name, price, category} : TProduct = req.body

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

        if(!category){
            throw new Error("Categoria inexistente, por favor digite uma categoria válida.")
        }
        if (!Object.values(TYPES_CATEGORY).includes(category)){
            throw new Error("Esta sub categoria não existe, somente: acessórios, eletrônicos e eletrodomésticos.")
        }

        const verificaId = products.find(product => product.id === id)
        if (verificaId) {
            throw new Error("ID do produto já existe, por favor digite outra ID.")
        }

        if(!verificaId){
            const newProducts : TProduct = {id, name, price, category} 
            products.push(newProducts)
            res.status(201).send("Produto cadastrado com sucesso.")
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

/*falta esse*/app.post('/purchases', (req: Request, res: Response) => {
    try {
        const {userId, productId, quantity, totalPrice} : TPurchase = req.body
        
        if(!userId){
            throw new Error("ID do usuário inexistente, por favor digite um ID válido.")
        }
        if(typeof userId !== "string"){
            throw new Error("A ID do usuário tem que ser uma string.")
        }

        if(!productId){
            throw new Error("ID do produto inexistente, por favor digite um ID válido.")
        }
        if(typeof productId !== "string"){
            throw new Error("A ID do produto tem que ser uma string.")
        }

        if(!quantity){
            throw new Error("Quantidade do produto inexistente, por favor digite uma quantidade válida.")
        }
        if(typeof quantity !== "number"){
            throw new Error("A quantidade do produto tem que ser um número.")
        }

        if(!totalPrice){
            throw new Error("Total do produto inexistente, por favor digite um total válido.")
        }
        if(typeof totalPrice !== "number"){
            throw new Error("o total do produto tem que ser um número.")
        }

        const verificaIdUser = users.find(user => user.id === userId)
        if (!verificaIdUser) {
            throw new Error("ID do usuário inexistente, por favor digite outra ID.")
        }

        const verificaIdProduct = products.find(product => product.id === productId)
        if (!verificaIdProduct) {
            throw new Error("Id do produto inexistente, por favor digite outra ID.")
        }

        if (verificaIdUser && verificaIdProduct){
            const createPurchases: TPurchase = {
                userId, productId, quantity, totalPrice
            }
            purchases.push(createPurchases)
            res.status(201).send("Compra realizada com sucesso.")
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






