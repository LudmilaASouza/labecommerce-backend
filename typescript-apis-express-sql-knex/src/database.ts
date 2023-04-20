/*import { TUser, TProduct, TPurchase, TYPES_CATEGORY } from "./types";

export const users : TUser[] = [
    {
        id : "LudmilaASouza",
        email: "ludmilasouz.a@hotmail.com",
        password: "123456"    
    },
    {
        id: "RodrigoSantos",
        email: "rodrigo.santos@gmail.com",
        password: "789456"
    }   
]

export function createUser (id: string, email: string, password: string){
    const newUser = {id, email, password}
    users.push(newUser) 
    //console.log("Usuário criado com sucesso!")
}


export function getAllUsers () {
    console.table(users)
}


export const products : TProduct[] = [
    {
        id: "001",
        name: "Smart TV 50'",
        price: 2149,
        category: TYPES_CATEGORY.APPLIANCE
    },
    {
        id: "002",
        name: "Home Theater",
        price: 899,
        category: TYPES_CATEGORY.APPLIANCE
    }
]

export function createProduct (id: string, name: string, price: number, category: TYPES_CATEGORY){
    const newProduct : TProduct = {id, name, price, category}
    products.push(newProduct)
    //console.log("Produto cadastrado com sucesso!")
}

export function getAllProducts () {
    console.table(products)
}

export function productById (id: string) {
    products.find((buscaid) => {
        if (buscaid.id === id) {
            return console.table(buscaid)
        } 
    })
}

export function queryProductsByName (q: string){
    return products.filter((prod) => prod.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
}


export const purchases : TPurchase[] = [
    {
        userId: "LudmilaASouza", //string
        productId: "002", //string
        quantity: 2, //number
        totalPrice: 1798  //number
    },

    {
        userId: "RodrigoSantos",
        productId: "001",
        quantity: 1,
        totalPrice: 2149
    }
]

export function createPurchase (userId: string, productId: string, quantity: number, totalPrice: number){
    const newPurchase : TPurchase = {userId, productId, quantity, totalPrice}
    purchases.push(newPurchase)
    //console.log("Compra realizada com sucesso!")
}

export function getAllPuchases(){
    console.table(purchases)
}

export function getAllPurchasesFromUsersId (userIdToShearch:string) {
    return purchases.filter((purchase) => purchase.userId === userIdToShearch)
}
*/