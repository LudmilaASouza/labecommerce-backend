export enum TYPES_CATEGORY {
    ACESSORIES = "Acessórios",
    ELETRONICS = "Eletrônicos",
    APPLIANCE = "Eletrodomésticos"
} 

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id:string,
    name: string,
    price: number,
    category: TYPES_CATEGORY
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}