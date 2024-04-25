import React from 'react'
import ExpenseCard from './ExpenseCard';

const MyExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      {expenses.map((expense, index) => (
        <ExpenseCard key={index} expense={expense} />
      ))}
    </div>
  );
};


export default MyExpenseList