/*export enum TYPES_CATEGORY {
    ACESSORIES = "Acessórios",
    ELETRONICS = "Eletrônicos",
    APPLIANCE = "Eletrodomésticos"
} */

export type TUser = {
    id: string,
    name: string,
    email: string,
    password: string,
}

export type TProduct = {
    id:string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchase = {
    id: string,
    buyerId: string,
    totalPrice: number
}
