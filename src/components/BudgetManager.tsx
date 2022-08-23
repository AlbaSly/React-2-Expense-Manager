import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

import { formatToCurrency } from "../utils/formats.utils";
import { BudgetManagerComponentProps } from "../interfaces/components.interface";
import { calcPercentage } from '../helpers/percentage.helpers';

import { IUserData } from '../interfaces/data.interface';

import { localStorageDataKey } from '../App';
import { swalert } from '../helpers/swal.helper';

const BudgetManager = (props: BudgetManagerComponentProps): JSX.Element => {
    const [spent, setSpent]: [number, Dispatch<SetStateAction<number>>] = useState(0);
    const [available, setAvailable]: [number, Dispatch<SetStateAction<number>>] = useState(0);
    const [percentage, setPercentage]: [number, Dispatch<SetStateAction<number>>] = useState(0);

    const {
        budgetState: {budget, setBudget},
        expenseListState: {expenseList, setExpenseList},
        loadedState: {loaded},
        validatedBudgetState: {setValidatedBudget}
    } = props;

    useEffect(() => {
        function calculateBudgetAvailable(): void {
            const totalSpent: number = expenseList.reduce((sum, expense) => sum + expense.amount, 0);
            const budgetAvailable: number = budget.value - totalSpent;

            setSpent(totalSpent);
            setAvailable(budgetAvailable);

            const percentage: number = calcPercentage(budget.value, totalSpent);
            setPercentage(percentage);
        }
        
        calculateBudgetAvailable();

        storeData();
    }, [expenseList]);

    function storeData(): void {
        if (!loaded) return;

        const newData: IUserData = {
            budget,
            expenseList
        }

        localStorage.setItem(localStorageDataKey, JSON.stringify(newData));
    }

    async function handleResetApp(): Promise<void> {
        const {isConfirmed} = await swalert.fire({
            title: 'Do you want to reset the data',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!isConfirmed) return;

        setValidatedBudget(false);
        setExpenseList([]);
        setBudget({value: 0});
        localStorage.removeItem(localStorageDataKey);

        swalert.fire('Deleted!', 'Your data has been reseted.', 'success');
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={percentage}
                    text={`${percentage.toFixed(2)}% Spent`}/>
            </div>

            <div className="contenido-presupuesto">
                <button 
                    onClick={handleResetApp}
                    className='reset-app' 
                    type='button' >Reset Data</button>

                <p>
                    <span>Budget: {formatToCurrency(budget.value)}</span>
                </p>

                <p>
                    <span>Spent: {formatToCurrency(spent)}</span>
                </p>

                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>{`${available < 0 ? 'Debt' : 'Available'}`}: {formatToCurrency(available).replace('-', '+ ')}</span>
                </p>
            </div>
        </div>
    );
}

export default BudgetManager;