import { useEffect, useState } from 'react'
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from '../hooks/useAuthContext'


//components
import ExpenseDetails from '../components/ExpenseDetails'
import ExpenseForm from '../components/ExpenseForm'

const Home = () => {
    // const [expenses, setExpenses] = useState(null)
    const {expenses, dispatch} = useExpensesContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchExpenses = async () => {
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
        }

        if (user){
            fetchExpenses()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="expenses">
                {expenses && expenses.map((expense) => (
                    <ExpenseDetails key={expense._id} expense={expense} />
                ))}
            </div>
            <ExpenseForm/>
        </div>
    )
}

export default Home;