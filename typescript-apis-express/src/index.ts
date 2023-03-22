import { user, product, purchase, getAllUsers, createUser, createProduct, getAllProducts, productById, queryProductsByName, createPurchase, getAllPuchases, getAllPurchasesFromUsersId } from "./database";
import { TYPES_CATEGORY, ProductRegister, ClientRegister, Purchase } from "./types";
import express, {Request, Response} from 'express';
import cors from 'cors';

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

//endpoint exercicio 1
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(user)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(product)
})

app.get('/purchases', (re: Request, res: Response) => {
    res.status(200).send(purchase)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result: ProductRegister [] = product.filter (
        (product) => product.name.toLowerCase().includes(q.toLowerCase())
    )

    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const createUsers: ClientRegister = {
        id, email, password
    }

    user.push(createUsers)
    res.status(201).send("Cadastro realizado com sucesso.")
})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as TYPES_CATEGORY

    const createProducts: ProductRegister = {
        id, name, price, category
    }

    product.push(createProducts)
    res.status(201).send("Produto cadastrado com sucesso.")
})

app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    const createPurchases: Purchase = {
        userId, productId, quantity, totalPrice
    }

    purchase.push(createPurchases)
    res.status(201).send("Compra realizada com sucesso.")
})

