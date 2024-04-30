import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useIncomeContext } from '../hooks/useIncomeContext';
import { useExpensesContext } from '../hooks/useExpensesContext';

const CompletePieChart = () => {
    const { expenses } = useExpensesContext();
    const { income } = useIncomeContext();

    // Calculate total income
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    // If both totalIncome and totalExpenses are 0, create data for a grey-filled pie chart with "N/A" label
    let data = [];
    if (totalIncome === 0 && totalExpenses === 0) {
        data = [{ name: "N/A", value: 1, fill: "#cccccc" }];
    } else {
        data = [
            { name: "Expense", value: totalExpenses },
            { name: "Income", value: totalIncome },
        ];
    }

    const colors = ['#ff6961', '#77dd77']; // Red for expenses, green for income

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name }) => {
        // Display "N/A" label if both totalIncome and totalExpenses are 0
        if (totalIncome === 0 && totalExpenses === 0) {
            return (
                <text x={cx} y={cy} fill="black" textAnchor="middle" dominantBaseline="central">
                    {name}
                </text>
            );
        }

        // Display label only for Income if totalExpenses is 0, or only for Expenses if totalIncome is 0
        if ((totalIncome === 0 && name === 'Income') || (totalExpenses === 0 && name === 'Expense')) {
            return null;
        }

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {name}
            </text>
        );
    };

    return (
        <div className="CompletePieChart">
            <h2 style={{ marginBottom: "25px" }}>
                <span style={{ display: 'block' }}>Expenses vs Income</span>
                <span style={{ display: 'block' }}>Pie-Chart</span>
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        nameKey="name"
                        data={data}
                        cx={200}
                        cy={200}
                        outerRadius={185}
                        fill="#8884d8"
                        label={renderCustomizedLabel} // Use custom label formatter
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill || colors[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </div>
        </div>
    );
};

export default CompletePieChart;
