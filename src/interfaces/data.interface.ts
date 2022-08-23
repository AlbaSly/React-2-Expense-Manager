import { IBudget } from "./budget.interface";
import { IExpense } from "./expense.interface";

export interface IUserData {
    budget: IBudget,
    expenseList: IExpense[]
}