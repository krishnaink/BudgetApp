import { useIncomeContext } from '../hooks/useIncomeContext'
import { useAuthContext } from '../hooks/useAuthContext'

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const IncomeDetails = ({ income }) => {
    const { secondDispatch } =useIncomeContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user){
            return;
        }
        const response = await fetch('/api/income/' + income._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            secondDispatch({type: 'DELETE_INCOME', payload: json})
        }
    }
    return (
        <div className="income-details">
            <h4>{income.category}</h4>
            <p><strong>${income.amount}</strong></p>
            <p><strong>{income.description}</strong></p> 
            <p>{formatDistanceToNow(new Date(income.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default IncomeDetails;