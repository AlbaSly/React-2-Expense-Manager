import NewBudget from './NewBudget';
import BudgetManager from './BudgetManager';
import { HeaderComponentProps } from '../interfaces/components.interface';

const Header = (props: HeaderComponentProps): JSX.Element => {
    const {
        budgetState,
        validatedBudgetState,
        validatedBudgetState: {validatedBudget},
        alertInfoState,
        expenseListSate,
        loadedState
    } = props;

    return (
        <header>
            <h1>RaxExpense Manager</h1>

            {
                !validatedBudget
                ?   <NewBudget 
                        budgetState={budgetState}
                        validatedBudgetState={validatedBudgetState}
                        alertInfoState={alertInfoState} />
                :   <BudgetManager 
                        budgetState={budgetState}
                        expenseListState={expenseListSate}
                        loadedState={loadedState} 
                        validatedBudgetState={validatedBudgetState} />
            }
        </header>
    );
}

export default Header;