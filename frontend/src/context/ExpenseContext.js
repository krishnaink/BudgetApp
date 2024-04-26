import { createContext, useReducer } from "react";

export const ExpensesContext = createContext()

export const expensesReducer = (state, action) => {
    switch (action.type){
        case 'SET_EXPENSES': 
            return {
                expenses: action.payload
            }
        case 'CREATE_EXPENSE':
            return {
                expenses: [action.payload, ...state.expenses]
            }
        case 'DELETE_EXPENSE':
            return {
                expenses: state.expenses.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ExpensesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(expensesReducer, {
        expenses: null
    })

    return (
        <ExpensesContext.Provider value={{...state, dispatch}}>
            { children }
        </ExpensesContext.Provider>
    )
}