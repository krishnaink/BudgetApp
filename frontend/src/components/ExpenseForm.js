import { useState } from 'react';
import { useExpensesContext } from "../hooks/useExpensesContext"
import { useAuthContext } from '../hooks/useAuthContext';

const ExpenseForm = () => {
    const { dispatch } = useExpensesContext()
    const { user } = useAuthContext()
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user){
            setError('You must be loggin in')
            return;
        }

          const expense = {category, amount, description}

          const response = await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
          })
          const json = await response.json()

          if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
          if (response.ok){
            setCategory('')
            setAmount('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('new expense added', json)
            dispatch({type: 'CREATE_EXPENSE', payload: json})
          }
    }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Expense</h3>

            <label>Category</label>
            <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes('category') ? 'error' : ''}
            />

            <label>$</label>
            <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes('amount') ? 'error' : ''}
            />

            <label>Description</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button>Add Expense</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ExpenseForm;