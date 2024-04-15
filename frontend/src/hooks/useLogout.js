import { useAuthContext } from "./useAuthContext"
import { useExpensesContext } from "./useExpensesContext"
export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: expensesDispatch } = useExpensesContext();
    
    const logout = () => {
        
        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        expensesDispatch({type: 'SET_EXPENSES', payload: null})
        
    }

    return {logout}
}