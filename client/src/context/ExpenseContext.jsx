import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expenseData) => {
    // Filter out empty split manually entries
    const filteredSplitManually = expenseData.splitManually.filter(
      (split) => split.member !== "" || split.amount !== ""
    );

    // Create a new expense object with filtered split manually data
    const newExpense = {
      name: expenseData.name,
      amount: expenseData.amount,
      paidBy: expenseData.paidBy,
      splitEqually: expenseData.splitEqually,
      splitManually: filteredSplitManually,
    };

    // Update expenses state with the new expense
    setExpenses([...expenses, newExpense]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
