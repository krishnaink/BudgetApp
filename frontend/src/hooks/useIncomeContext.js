import { IncomeContext } from "../context/IncomeContext";
import { useContext } from 'react';


export const useIncomeContext = () => {
    const context = useContext(IncomeContext)

    if (!context){
        throw Error('useIncomeContext must be used inside an IncomeContextProvider')
    }

    return context
}