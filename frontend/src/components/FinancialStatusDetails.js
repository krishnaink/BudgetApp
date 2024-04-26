import React from 'react';
import { useExpensesContext } from '../hooks/useExpensesContext';
import { useIncomeContext } from '../hooks/useIncomeContext';

const FinancialStatusDetails = () => {
    const { expenses } = useExpensesContext();
    const { income } = useIncomeContext();

    // Calculate total income
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate difference
    const difference = totalIncome - totalExpenses;

    // Determine financial status
    let status;
    let statusColor;

    if (difference > 0) {
        status = "Good";
        statusColor = "green"; // Set color to green if status is good
    } else if (difference < 0) {
        status = "Bad";
        statusColor = "red"; // Set color to red if status is bad
    } else {
        status = "Balanced";
        statusColor = "black"; // Default color for Balanced status
    }

    return (
        <div>
            <h2>Financial Status</h2>
            <p>Total Income: ${totalIncome}</p>
            <p>Total Expenses: ${totalExpenses}</p>
            <p>Difference: ${difference}</p>
            <p>Status: <span style={{ color: statusColor, fontWeight: 'bold' }}>{status}</span></p>
        </div>

    );
};

export default FinancialStatusDetails;
