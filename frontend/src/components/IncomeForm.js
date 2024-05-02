import { useState } from 'react';
import { useIncomeContext } from "../hooks/useIncomeContext"
import { useAuthContext } from '../hooks/useAuthContext';

const IncomeForm = () => {
    const { dispatch } = useIncomeContext();
    const { user } = useAuthContext();
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            setError('You must be logged in');
            return;
        }

        if (!category || !amount || !description) {
            setError('Please fill in all fields.');
            return;
        }

        // Validate amount to ensure it's not negative
        if (parseFloat(amount) < 0) {
            setError('Amount cannot be negative.');
            return;
        }

        const income = { category, amount, description };

        const response = await fetch('/api/income', {
            method: 'POST',
            body: JSON.stringify(income),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error || 'Failed to add income.');
            setEmptyFields(json.emptyFields || []);
        } else {
            setCategory('');
            setAmount('');
            setDescription('');
            setError(null);
            setEmptyFields([]);
            console.log('New income added:', json);
            dispatch({ type: 'CREATE_INCOME', payload: json });
        }
    };
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Source of Income</h3>

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

            <button>Add Income</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default IncomeForm;
