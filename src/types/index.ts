export enum TransactionType {
    Income = "income",
    Outcome = "outcome",
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FinancialInfo {
    id: string;
    userId: string;
    name: string;
    type: TransactionType;
    value: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResultType {
    status: number
    message: string
    token?: string
}