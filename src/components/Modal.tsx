import { useState, useEffect, Dispatch, SetStateAction, FormEvent } from "react";

import Alert from "./Alert";

import { ModalComponentProps } from "../interfaces/components.interface";

import { IExpense } from "../interfaces/expense.interface";

import { DefaultExpenseStateValue } from "../interfaces/state.interface";

import { categoryList } from "../data/categorylist.data";

import CloseModalIcon from '../img/cerrar.svg';

const Modal = (props: ModalComponentProps): JSX.Element => {
    const [disableSubmitEvent, setDisableSubmitEvent]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [name, setName]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [amount, setAmount]: [number, Dispatch<SetStateAction<number>>] = useState(0);
    const [categoryName, setCategoryName]: [string, Dispatch<SetStateAction<string>>] = useState('null');

    const {
        showModalState: {showModal, setShowModal},
        animateModalState: {animateModal, setAnimateModal},
        alertInfoState,
        alertInfoState: {alertInfo, setAlertInfo},
        expenseListState: {expenseList, setExpenseList},
        editingModeState: {editingMode, setEditingMode},
        expenseToEditState: {expenseToEdit, setExpenseToEdit}
    } = props;

    useEffect(() => {
        if (editingMode) {
            setName(expenseToEdit.name);
            setAmount(expenseToEdit.amount);
            setCategoryName(expenseToEdit.category.value);
        }

    }, [editingMode]);

    function handleSubmit(ev: FormEvent<HTMLElement>): void {
        ev.preventDefault();

        if (disableSubmitEvent) return;

        if ([name, amount, categoryName].some(value => !value || value === "null")) {
            setAlertInfo({type: 'error', msg: 'All fields are required', duration: 800});
            setDisableSubmitEvent(false);
            return;
        }
        
        setDisableSubmitEvent(true);

        if (editingMode) {
            updateExpense();
            return;
        }

        addExpense();
    }

    function addExpense(): void {
        const newExpense: IExpense = {
            id: generateId(),
            name,
            amount,
            category: categoryList.filter(category => category.value === categoryName)[0],
            createdAt: new Date()
        }

        setExpenseList(expenseList => [newExpense, ...expenseList]);

        showInfo('success', 'Expense added');
    }

    function updateExpense(): void {
        const expenseUpdated: IExpense = {
            ...expenseToEdit,
            name,
            amount,
            category: categoryList.filter(category => category.value === categoryName)[0],
        }

        const expenseListUpdated: IExpense[] = [...expenseList.map((expense: IExpense) => expense.id === expenseUpdated.id ? expenseUpdated : expense)];

        setExpenseList(expenseListUpdated);

        showInfo('success', 'Expense updated');
    }

    function showInfo(type: string, msg: string, duration: number = 500): void {
        setAlertInfo({type, msg, duration});

        setTimeout(() => {
            closeModal();
        }, 500);
    }

    function closeModal(): void {
        setAnimateModal(false);

        setTimeout(() => {
            if (editingMode) {
                setEditingMode(false);
                setExpenseToEdit(DefaultExpenseStateValue);
            }
            setDisableSubmitEvent(false);
            setShowModal(false);
        }, 300);
    }

    function generateId(): string {
        const randomValue: string = Math.random().toString(36).substring(2);
        const currentTime: string = Date.now().toString(36);

        return randomValue + currentTime;
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    onClick={closeModal} 
                    src={CloseModalIcon} 
                    alt="Close modal icon" />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animateModal ? 'animar' : 'cerrar'}`} autoComplete="off">
                <legend>New Expense</legend>

                {alertInfo.msg && <Alert alertInfoState={alertInfoState} />} 

                <div className="campo">
                    <label htmlFor="name">Expense Name</label>
                    <input
                        id="name" 
                        type="text"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        placeholder="Add the name of the expense" 
                        autoComplete="off"
                    />
                </div>

                <div className="campo">
                    <label htmlFor="amount">Expense Amount</label>
                    <input 
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(ev) => setAmount(Number(ev.target.value))}
                        placeholder="Add the amount of the expense"
                        autoComplete="off"
                    />
                </div>

                <div className="campo">
                    <label htmlFor="category">Category</label>
                    <select 
                        name="category" 
                        id="category"
                        value={categoryName}
                        onChange={(ev) => setCategoryName(ev.target.value)}
                        >
                            <option value="null" disabled>--Select One--</option>
                            
                            {categoryList.map((cat, index) => <option key={index} value={cat.value}>{cat.name} {cat.example}</option>)}
                    </select>
                </div>

                <input 
                    type="submit" 
                    value={editingMode ? 'Save Changes' : 'Add'} />
            </form>
        </div>
    );
}

export default Modal;