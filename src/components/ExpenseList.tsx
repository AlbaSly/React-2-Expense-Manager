import Expense from "./Expense";

import { ExpenseListComponentProps } from "../interfaces/components.interface";

import { IExpense } from "../interfaces/expense.interface";

const ExpenseList = (props: ExpenseListComponentProps): JSX.Element => {
    const {
        expenseListState: {expenseList, setExpenseList},
        expenseState,
        expenseToEditState,
        filterState: {filter}
    } = props;

    function deleteExpense(expenseId: string): Promise<boolean> {
        return new Promise((resolve) => {
            const newExpenseList: IExpense[] = [...expenseList.filter((expense: IExpense) => expense.id !== expenseId)];

            setExpenseList(newExpenseList);
            
            resolve(true);
        });
    }

    return (
        <div className="listado-gastos contenedor">
            <h2>{expenseList.length ? 'Expenses' : 'Without expenses'}</h2>

            {expenseList
                .filter((expense: IExpense) => !filter ? expense : expense.category.value === filter)
                .map((expense: IExpense) => 
                    <Expense 
                        key={expense.id} 
                        expenseState={expenseState} 
                        expense={expense} 
                        expenseToEditState={expenseToEditState}
                        deleteExpense={deleteExpense} />)
            }
        </div>
    );
}

export default ExpenseList;