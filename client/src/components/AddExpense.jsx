import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { FriendContext } from "../context/FriendContext";

const AddExpense = ({ toggleModal }) => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(0);
  const [paidBy, setPaidBy] = useState("");
  const [splitEqually, setSplitEqually] = useState(false);
  const { addExpense } = useContext(ExpenseContext);
  const { friends } = useContext(FriendContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expenseName.trim() === "") {
      alert("Please enter a expense name");
      return;
    }
    if (paidBy.trim() === "") {
      alert("Please select who paid for the expense");
      return;
    }
    const newExpense = {
      name: expenseName,
      amount: amount,
      paidBy: paidBy,
      splitEqually: splitEqually,
    };
    addExpense(newExpense);
    setExpenseName("");
    setAmount(0);
    setPaidBy("");
    setSplitEqually(false);
    toggleModal();
  };

  return (
    <div className="group-details-page">
      <form>
        <div className="form-group">
          <div className="expense-form-container">
            <label htmlFor="group-name">Add Expense :</label>
            <input
              type="text"
              name="group-name"
              placeholder="Enter expense name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
            ></input>
          </div>
          <div className="expense-form-container">
            <label htmlFor="group-name">Add Amount :</label>
            <input
              type="text"
              name="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            ></input>
          </div>
          <div className="expense-form-container">
            <div className="paid-by-container">
              <label htmlFor="group-name">Paid By :</label>
              <select
                name="paid-by"
                id="paid-by"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                required
              >
                {friends.map((friend, index) => (
                  <option key={index}>{friend.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="split-equally-container">
            <label htmlFor="group-name">Split Equally :</label>
            <input
              type="checkbox"
              id="split-equally"
              name="split-equally"
              checked={splitEqually}
              onChange={(e) => setSplitEqually(e.target.checked)}
            ></input>
          </div>
        </div>
        <button onClick={handleSubmit}>Add Expense</button>
        <button onClick={toggleModal}>Cancel</button>
      </form>
    </div>
  );
};

export default AddExpense;
