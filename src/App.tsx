import { useState, useEffect, Dispatch, SetStateAction} from "react";

import Header from "./components/Header";
import Modal from "./components/Modal";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

import { IBudget } from "./interfaces/budget.interface";
import { IAlert } from "./interfaces/alert.interface";
import { IExpense } from "./interfaces/expense.interface";

import { 
  DefaultAlertInfoStateValue, 
  DefaultBudgetStateValue, 
  DefaultExpenseListStateValue, 
  DefaultExpenseStateValue } from "./interfaces/state.interface";

import NewExpenseIcon from './img/nuevo-gasto.svg';
import { IUserData } from "./interfaces/data.interface";

export const localStorageDataKey: string = 'raxExpenses_app';

const App = (): JSX.Element => {
  const [loaded, setLoaded]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [budget, setBudget]: [IBudget, Dispatch<SetStateAction<IBudget>>] = useState(DefaultBudgetStateValue);
  const [validatedBudget, setValidatedBudget]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const [expenseList, setExpenseList]: [IExpense[], Dispatch<SetStateAction<IExpense[]>>] = useState(DefaultExpenseListStateValue);
  const [expense, setExpense]: [IExpense, Dispatch<SetStateAction<IExpense>>] = useState(DefaultExpenseStateValue);
  const [expenseToEdit, setExpenseToEdit]: [IExpense, Dispatch<SetStateAction<IExpense>>] = useState(DefaultExpenseStateValue);

  const [alertInfo, setAlertInfo]: [IAlert, Dispatch<SetStateAction<IAlert>>] = useState(DefaultAlertInfoStateValue);
  const [showModal, setShowModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [animateModal, setAnimateModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const [editingMode, setEditingMode]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [filter, setFilter]: [string, Dispatch<SetStateAction<string>>] = useState('');

  useEffect(() => {
    loadData();

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!expenseToEdit.id) return;

    handleNewExpense();
  }, [expenseToEdit]);

  function handleNewExpense(): void {
    setShowModal(true);

    if (expenseToEdit.id) {
      setEditingMode(true);
    }

    setTimeout(() => {
      setAnimateModal(true);
    }, 200);
  }

  function loadData(): void {
    const userData: IUserData = JSON.parse(localStorage.getItem(localStorageDataKey)!);

    if (!userData) return;

    setBudget({value: userData.budget.value});
    setExpenseList(userData.expenseList);

    setValidatedBudget(true);
  }

  return (
    <div className={showModal ? 'fijar' : ''}>
      <Header 
        budgetState={{budget, setBudget}}
        validatedBudgetState={{validatedBudget, setValidatedBudget}} 
        alertInfoState={{alertInfo, setAlertInfo}}
        expenseListSate={{expenseList, setExpenseList}}
        loadedState={{loaded, setLoaded}} />

      {validatedBudget &&
        <>
          <main>
            <ExpenseFilter filterState={{filter, setFilter}} />

            <ExpenseList 
              expenseListState={{expenseList, setExpenseList}}
              expenseState={{expense, setExpense}}
              expenseToEditState={{expenseToEdit, setExpenseToEdit}}
              filterState={{filter, setFilter}} />
          </main>

          <div className="nuevo-gasto">
            <img 
              src={NewExpenseIcon}
              onClick={handleNewExpense}            
              alt="New Expense Icon"/>
          </div>
        </>
      }

      {showModal && validatedBudget &&
        <Modal 
          showModalState={{showModal, setShowModal}}
          animateModalState={{animateModal, setAnimateModal}}
          alertInfoState={{alertInfo, setAlertInfo}} 
          expenseListState={{expenseList, setExpenseList}}
          editingModeState={{editingMode, setEditingMode}}
          expenseToEditState={{expenseToEdit, setExpenseToEdit}} />
      }
    </div>
  );
}

export default App;