import { Schema } from "mongoose"

export interface UserType{
    name: string,
    email: string,
    password: string
}

export interface CustomerType{
    _id?: string,
    name: string
}

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export interface FabricData{
    _id?: string,
    customerId: Schema.Types.ObjectId,
    date?: string,
    incomingFabric: FabricCount,
    outgoingFabric: FabricCount,
    price: number,
    totalAmount: number,
    debit: number,
    credit: number,
    balance: number,
    assignerName: string
}

export interface FabricCount {
    _id?:string,
    date: Date,
    nag: number,
    faad: number,
    thaan: number,
    note? : string,
    name: string,
    workType: string,
    printType?: string,
    tp?: string
}