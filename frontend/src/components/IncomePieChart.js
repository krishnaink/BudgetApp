import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs'
import { useIncomeContext } from '../hooks/useIncomeContext';

const IncomePieChart = () => {
    const { income } = useIncomeContext();
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (income) {
            const labels = income.map(item => item.category);
            const data = income.map(item => item.amount);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                            // Add more colors if needed
                        ],
                        hoverBackgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 159, 64, 0.8)'
                            // Add more colors if needed
                        ]
                    }
                ]
            });
        }
    }, [income]);

    // Custom tooltip function to display both label and value
    const customTooltip = ({ datasetIndex, index }, chartData) => {
        const label = chartData.labels[index];
        const value = chartData.datasets[0].data[index];
        return `${label}: $${value}`;
    };

    return (
        <div style={{ width: '30%', float: 'left' }}>
            <h3>Income Pie Chart</h3>
            {chartData && <Pie data={chartData} options={{ tooltips: { callbacks: { label: customTooltip } } }} />}
        </div>
    );
};

export default IncomePieChart;
