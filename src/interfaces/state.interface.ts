import { Dispatch, SetStateAction } from "react";
import { IBudget } from "./budget.interface";
import { IAlert } from "./alert.interface";
import { IExpense } from "./expense.interface";

export interface BudgetState {
    budget: IBudget,
    setBudget: Dispatch<SetStateAction<IBudget>>
}

export const DefaultBudgetStateValue: IBudget = {
    value: 0
}

export interface AlertInfoState {
    alertInfo: IAlert,
    setAlertInfo: Dispatch<SetStateAction<IAlert>>
} 

export const DefaultAlertInfoStateValue: IAlert = {
    msg: '',
    type: ''
}

export interface ExpenseState {
    expense: IExpense,
    setExpense: Dispatch<SetStateAction<IExpense>>
}

export interface ExpenseToEditState {
    expenseToEdit: IExpense,
    setExpenseToEdit: Dispatch<SetStateAction<IExpense>>
}

export const DefaultExpenseStateValue: IExpense = {
    id: null,
    name: '',
    amount: 0,
    category: {
        name: '',
        value: '',
        example: ''
    },
}

export interface EditingModeState {
    editingMode: boolean,
    setEditingMode: Dispatch<SetStateAction<boolean>>
}

export interface ExpenseListState {
    expenseList: IExpense[],
    setExpenseList: Dispatch<SetStateAction<IExpense[]>>
}

export const DefaultExpenseListStateValue: IExpense[] = [];

export interface ValidatedBudgetState {
    validatedBudget: boolean,
    setValidatedBudget: Dispatch<SetStateAction<boolean>>
}

export interface ShowModalState {
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export interface AnimateModalState {
    animateModal: boolean,
    setAnimateModal: Dispatch<SetStateAction<boolean>>
}

export interface LoadedState {
    loaded: boolean,
    setLoaded: Dispatch<SetStateAction<boolean>>
}

export interface FilterState {
    filter: string,
    setFilter: Dispatch<SetStateAction<string>>
}