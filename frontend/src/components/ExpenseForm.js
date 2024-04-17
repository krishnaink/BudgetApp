import { useState } from 'react';
import { useExpensesContext } from '../hooks/useExpensesContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ExpenseForm = () => {
    const { dispatch } = useExpensesContext();
    const { user } = useAuthContext();

    // State for dashboard inputs
    const [dashboardCategory, setDashboardCategory] = useState('');
    const [dashboardType, setDashboardType] = useState('');

    // State for financial goal inputs
    const [goalCategory, setGoalCategory] = useState('');
    const [goalAmount, setGoalAmount] = useState('');

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleDashboardSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        // Add logic for dashboard submission here
    };

    const handleGoalSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        // Add logic for financial goal submission here
    };

    return (
        <div>
            <div className="dashboard-container">
                <h3>Add a New Dashboard</h3>
                <form className="create" onSubmit={handleDashboardSubmit}>
                    <label>Dashboard Name</label>
                    <input
                        type="text"
                        onChange={(e) => setDashboardCategory(e.target.value)}
                        value={dashboardCategory}
                        className={emptyFields.includes('dashboardCategory') ? 'error' : ''}
                    />

                    <label>Dashboard Type</label>
                    <select
                        value={dashboardType}
                        onChange={(e) => setDashboardType(e.target.value)}
                        className={emptyFields.includes('dashboardType') ? 'error' : ''}
                    >
                        <option value="">Select Dashboard Type</option>
                        <option value="Personal Dashboard">Personal Dashboard</option>
                        <option value="George Mason University Semester Cost Planner">George Mason University Semester Cost Planner</option>
                    </select>

                    <button>Add Dashboard</button>
                </form>
            </div>

            <div className="goal-container">
                <h3>Add a New Financial Goal</h3>
                <form className="create" onSubmit={handleGoalSubmit}>
                    <label>Financial Goal Name</label>
                    <input
                        type="text"
                        onChange={(e) => setGoalCategory(e.target.value)}
                        value={goalCategory}
                        className={emptyFields.includes('goalCategory') ? 'error' : ''}
                    />

                    <label>Set Financial Goal Amount</label>
                    <input
                        type="number"
                        onChange={(e) => setGoalAmount(e.target.value)}
                        value={goalAmount}
                        className={emptyFields.includes('goalAmount') ? 'error' : ''}
                    />

                    <button>Add Financial Goal</button>
                </form>
            </div>

            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default ExpenseForm;
