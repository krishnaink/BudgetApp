import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExpensesContextProvider } from './context/ExpenseContext';
import { AuthContextProvider } from './context/AuthContext';
import { IncomeContextProvider } from './context/IncomeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ExpensesContextProvider>
        <IncomeContextProvider>
          <App />
        </IncomeContextProvider>
      </ExpensesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
