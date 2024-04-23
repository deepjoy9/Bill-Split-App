import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setexpenses] = useState([]);

  const addExpense = (expenseName) => {
    const newExpense = {
      name: expenseName,
    };
    setexpenses([...expenses, newExpense]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
