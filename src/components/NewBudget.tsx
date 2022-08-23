import { FormEvent } from "react";
import Alert from "./Alert";
import { NewBudgetComponentProps } from "../interfaces/components.interface";

const NewBudget = (props: NewBudgetComponentProps): JSX.Element => {
    const {
        budgetState: {budget, setBudget},
        validatedBudgetState: {setValidatedBudget},
        alertInfoState,
        alertInfoState: {alertInfo, setAlertInfo}
    } = props;

    function handleSubmit(ev: FormEvent<HTMLFormElement>): void {
        ev.preventDefault();

        if (isNaN(Number(budget.value))) {
            setAlertInfo({type: 'error', msg: 'Invalid budget value'});

            return;
        }

        if (Number(budget.value) <= 0) {
            setAlertInfo({type: 'error', msg: 'The budget must be greater than 0'});

            return;
        }

        setAlertInfo({type: 'success', msg: 'Budget Validated'});
        setTimeout(() => {
            setValidatedBudget(true);
        }, 1500);
    }
    
    return (
        <div className="contenedor-presupuesto contenedor sombra">
            
            <form 
                onSubmit={handleSubmit}
                className="formulario">
                <div className="campo">
                    <label htmlFor="budget">Define Budget</label>
                    <input 
                        id="budget" 
                        type="number"
                        value={budget.value}
                        onChange={(ev) => setBudget({...budget, value: Number(ev.target.value)})} 
                        className="nuevo-presupuesto" 
                        placeholder="Add your budget"
                    />
                </div>

                <input type="submit" value="Set new Budget"/>

                {alertInfo.msg && <Alert alertInfoState={alertInfoState} />} 
            </form>
        </div>
    );
}

export default NewBudget;