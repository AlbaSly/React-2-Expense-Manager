import { IExpense } from "./expense.interface";
import { 
    AlertInfoState, 
    AnimateModalState, 
    BudgetState, 
    EditingModeState, 
    ExpenseListState, 
    ExpenseState,
    ExpenseToEditState, 
    FilterState, 
    LoadedState, 
    ShowModalState, 
    ValidatedBudgetState } from "./state.interface";

export interface HeaderComponentProps {
    budgetState: BudgetState,
    validatedBudgetState: ValidatedBudgetState,
    alertInfoState: AlertInfoState,
    expenseListSate: ExpenseListState,
    loadedState: LoadedState
}

export interface NewBudgetComponentProps {
    budgetState: BudgetState,
    validatedBudgetState: ValidatedBudgetState,
    alertInfoState: AlertInfoState
}

export interface BudgetManagerComponentProps {
    budgetState: BudgetState,
    expenseListState: ExpenseListState,
    loadedState: LoadedState,
    validatedBudgetState: ValidatedBudgetState
}

export interface ExpenseListComponentProps {
    expenseListState: ExpenseListState
    expenseState: ExpenseState,
    expenseToEditState: ExpenseToEditState,
    filterState: FilterState
}

export interface ExpenseComponentProps {
    expenseState: ExpenseState,
    expense: IExpense,
    expenseToEditState: ExpenseToEditState,
    deleteExpense: (expenseId: string) => Promise<boolean>
}

export interface AlertComponentProps {
    alertInfoState: AlertInfoState
}

export interface ModalComponentProps {
    showModalState: ShowModalState,
    expenseListState: ExpenseListState,
    animateModalState: AnimateModalState,
    alertInfoState: AlertInfoState,
    expenseToEditState: ExpenseToEditState,
    editingModeState: EditingModeState,
}

export interface ExpenseFilterComponentProps {
    filterState: FilterState
}