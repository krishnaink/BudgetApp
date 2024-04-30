import React from 'react';
import { useEffect, useState } from 'react';
import { useExpensesContext } from "../hooks/useExpensesContext";
import { useAuthContext } from '../hooks/useAuthContext';
import ExpenseDetails from '../components/ExpenseDetails';
import ExpenseForm from '../components/ExpenseForm';
import IncomeDetails from '../components/IncomeDetails';
import IncomeForm from '../components/IncomeForm';
import { useIncomeContext } from '../hooks/useIncomeContext';
import FinancialStatusDetails from '../components/FinancialStatusDetails';
import CompletePieChart from '../components/CompletePieChart';




const Home = () => {
    const { expenses, dispatch } = useExpensesContext();
    const { income, secondDispatch } = useIncomeContext();
    const { user } = useAuthContext();
    const [showFinancialStatus, setShowFinancialStatus] = useState(false);

    useEffect(() => {
        const fetchExpenseIncome = async () => {
            try {
                const response = await fetch('/api/expenses', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }
                const expensesData = await response.json();
                dispatch({ type: 'SET_EXPENSES', payload: expensesData });

                const response2 = await fetch('/api/income', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response2.ok) {
                    throw new Error('Failed to fetch income');
                }
                const incomeData = await response2.json();
                secondDispatch({ type: 'SET_INCOME', payload: incomeData });
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchExpenseIncome();
        }
    }, [dispatch, secondDispatch, user]);

    return (
        <div className="home">
            <div className="expenses">
                {expenses && expenses.map((expense) => (
                    <ExpenseDetails key={expense._id} expense={expense} />
                ))}
            </div>
            <ExpenseForm />

            <div className="income">
                {income && income.map((incomeItem) => (
                    <IncomeDetails key={incomeItem._id} income={incomeItem} />
                ))}
            </div>
            <div className="income-form-container">
                <IncomeForm />
            </div>

            {/* Financial Status Button */}
            <button className="financialStatus_button" onClick={() => setShowFinancialStatus(true)}>View Financial Status</button>

            {/* Pop-up */}
            {showFinancialStatus && (
                <div className="financialStatus_pop_up">
                    {/* Close button */}
                    <button className="close_button" onClick={() => setShowFinancialStatus(false)}>X</button>
                    <FinancialStatusDetails /> {/* Correct placement of component */}
                    <div className="complete_pie_chart_container">
                        <CompletePieChart />
                    </div>

                </div>
            )}
        </div>
    );
};

export default Home;
