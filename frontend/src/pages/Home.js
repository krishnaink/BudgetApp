import { useEffect, useState } from 'react'
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from '../hooks/useAuthContext'


//components
import ExpenseDetails from '../components/ExpenseDetails'
import ExpenseForm from '../components/ExpenseForm'

import IncomeDetails from '../components/IncomeDetails'
import IncomeForm from '../components/IncomeForm'
import { useIncomeContext } from '../hooks/useIncomeContext'

const Home = () => {
    // const [expenses, setExpenses] = useState(null)
    const {expenses, dispatch} = useExpensesContext()
    const{income, secondDispatch} = useIncomeContext()

    const {user} = useAuthContext()

    useEffect(() => {
        const fetchExpenseIncome = async () => {
            const response = await fetch('/api/expenses', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // setExpenses(json)
                dispatch({type: 'SET_EXPENSES', payload: json})
            }

            const response2 = await fetch('/api/income', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json2 = await response2.json()

            if (response.ok) {
                // setIncome(json)
                secondDispatch({type: 'SET_INCOME', payload: json2})
            }
        }

        if (user){
            fetchExpenseIncome()
        }
    }, [dispatch, secondDispatch,user])

    return (
        <div className="home">
    <div className="expenses">
        {expenses && expenses.map((expense) => (
            <ExpenseDetails key={expense._id} expense={expense} />
        ))}
    </div>
    <ExpenseForm/>

    <div className="income">
        {income && income.map((income) => (
            <IncomeDetails key={income._id} income={income} />
        ))}
    </div>
    <div className="income-form-container">
        <IncomeForm/>
    </div>
</div>

    )
}

export default Home;