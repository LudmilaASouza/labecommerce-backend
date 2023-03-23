import { user, product, purchase, getAllUsers, createUser, createProduct, getAllProducts, productById, queryProductsByName, createPurchase, getAllPuchases, getAllPurchasesFromUsersId } from "./database";
import { TYPES_CATEGORY, TProduct, TUser, TPurchase } from "./types";
import express, {Request, response, Response} from 'express';
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

app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id as string
    const email = req.body.email as string
    const password = req.body.password as string

    const createUsers: TUser = {
        id, email, password
    }

    user.push(createUsers)
    res.status(201).send("Cadastro realizado com sucesso.")
})

app.delete('/users/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const userResult = user.findIndex((user) => {
        return user.id === id
    })

    userResult < 0 ? res.status(404).send("Usuário não existe.") :
    (user.splice(userResult, 1), res.status(202).send("Usuário excluído com sucesso!") )
})

app.put('/users/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const newId = req.body.id
    const {email, password} = req.body

    const userFind = user.find((user) => user.id === id)

    if (userFind) {
        userFind.id = newId || userFind.id
        userFind.email = email || userFind.email
        userFind.password = password || userFind.password
    }
    res.status(200).send("Cadastro atualizado com sucesso.")
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(product)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result: TProduct [] = product.filter (
        (product) => product.name.toLowerCase().includes(q.toLowerCase())
    )

    res.status(200).send(result)
})

app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const category = req.body.category as TYPES_CATEGORY

    const createProducts: TProduct = {
        id, name, price, category
    }

    product.push(createProducts)
    res.status(201).send("Produto cadastrado com sucesso.")
})

app.get('/products/:id', (req: Request, res: Response) => {
    const {id} = req.params
    const result = product.find((product) => product.id === id)
    res.status(200).send(result) 
})

app.delete('/products/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const productResult = product.findIndex((product) => {
        return product.id === id
    })

    productResult < 0 ? res.status(404).send("Produto não existe.") :
    (product.splice(productResult, 1), res.status(202).send("Produto excluído com sucesso!") )
})

app.put('/products/:id', (req:Request, res:Response) => {
    const {id} = req.params
    const newId = req.body.id
    const {name, price, category} = req.body

    const productFind = product.find((product) => product.id === id)

    if (productFind) {
        productFind.id = newId || productFind.id
        productFind.name = name || productFind.name
        productFind.price = price || productFind.price
        productFind.category = category || productFind.category
    }
    res.status(200).send("Produto atualizado com sucesso.")
}) 

app.get('/purchases', (re: Request, res: Response) => {
    res.status(200).send(purchase)
})

app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId as string
    const productId = req.body.productId as string
    const quantity = req.body.quantity as number
    const totalPrice = req.body.totalPrice as number

    const createPurchases: TPurchase = {
        userId, productId, quantity, totalPrice
    }

    purchase.push(createPurchases)
    res.status(201).send("Compra realizada com sucesso.")
})

app.get('/purchases/:userId', (req: Request, res: Response) => {
    const {userId} = req.params
    const result = purchase.find((purchase) => purchase.userId === userId)
    res.status(200).send(result) 
})


