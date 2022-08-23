import { ICategory } from "./category.interface";

export interface IExpense {
    id?: string | null,
    name: string,
    amount: number,
    category: ICategory,
    createdAt?: Date
}