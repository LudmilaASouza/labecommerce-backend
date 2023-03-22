export enum TYPES_CATEGORY {
    ACESSORIES = "Acessórios",
    ELETRONICS = "Eletrônicos",
    APPLIANCE = "Eletrodomésticos"
}

export type ClientRegister = {
    id: string,
    email: string,
    password: string
}

export type ProductRegister = {
    id:string,
    name: string,
    price: number,
    category: TYPES_CATEGORY
}

export type Purchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}