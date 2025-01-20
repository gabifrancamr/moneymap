export enum TransactionType {
    income = "income",
    expense = "expense",
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Transaction {
    id: string;
    name: string;
    type: TransactionType;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResultType {
    status: number
    message: string
    token?: string
    email?: string
    userId?: string
}