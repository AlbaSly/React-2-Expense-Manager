import { 
    LeadingActions, 
    SwipeableList, 
    SwipeableListItem, 
    SwipeAction, 
    TrailingActions } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { ExpenseComponentProps } from "../interfaces/components.interface";

import { formatToCurrency, formateDate } from "../utils/formats.utils";
import { swalert } from '../helpers/swal.helper';

const Expense = (props: ExpenseComponentProps): JSX.Element => {
    const {
        expense,
        expense: {
            id,
            name,
            amount,
            category,
            createdAt
        },
        expenseState,
        expenseToEditState: {setExpenseToEdit},
        deleteExpense
    } = props

    const leadingActions = (): JSX.Element => {
        return (
            <LeadingActions>
                <SwipeAction onClick={() => setExpenseToEdit(expense)}>
                    <p>Edit</p>
                </SwipeAction>
            </LeadingActions>
        );
    }

    const trailingActions = (): JSX.Element => {
        return (
            <TrailingActions>
                <SwipeAction onClick={deleteThis}>
                    <p>Delete</p>
                </SwipeAction>
            </TrailingActions>
        );  
    }

    async function deleteThis(): Promise<void> {
        const {isConfirmed} = await swalert.fire({
            title: 'Do you want to delete the expense',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!isConfirmed) return;

        await deleteExpense(id!);

        swalert.fire('Deleted!', 'Your expense has been deleted.', 'success');
    }

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()} >
                <div className="gasto sombra flex-helper">
                    <div className="contenido-gasto">
                        <img src={category.icon} alt={category.name + 'icon'} />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category.name}</p>
                            <p className="nombre-gasto">{name}</p>
                            <p className="fecha-gasto">Added at {''}
                                <span>{formateDate(createdAt!)}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="cantidad-gasto">{formatToCurrency(amount)}</p>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
}

export default Expense;