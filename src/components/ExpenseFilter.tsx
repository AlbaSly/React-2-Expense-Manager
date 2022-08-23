import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { categoryList } from "../data/categorylist.data";
import { ExpenseFilterComponentProps } from "../interfaces/components.interface";

const ExpenseFilter = (props: ExpenseFilterComponentProps): JSX.Element => {
    const {filterState: {filter, setFilter}} = props;

    return (
        <form className="filtros sombra contenedor">
            <div className="campo flex-helper">
                <label htmlFor="category">Category</label>
                <select 
                    name="category" 
                    id="category"
                    value={filter}
                    onChange={(ev) => setFilter(ev.target.value)} >
                        <option value="null" disabled>--Select One--</option>
                        <option value="">All</option>
                        {categoryList.map((cat, index) => <option key={index} value={cat.value}>{cat.name}</option>)}
                </select>
            </div>
        </form>
    );
}

export default ExpenseFilter;