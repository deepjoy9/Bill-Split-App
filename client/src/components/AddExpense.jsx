import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { FriendContext } from "../context/FriendContext";

const AddExpense = ({ toggleModal }) => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(0);
  const { addExpense } = useContext(ExpenseContext);
  const members = ["Jett", "Sage", "Viper", "Reyna"];
  const { friends } = useContext(FriendContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim() === "") {
      alert("Please enter a expense name");
      return;
    }
    addExpense(expenseName);
    setExpenseName("");
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
              name="group-name"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            ></input>
          </div>
          <div className="expense-form-container">
            <div className="paid-by-container">
              <label htmlFor="group-name">Paid By :</label>
              <select name="members" id="members">
                {friends.map((friend, index) => (
                  <option key={index}>{friend.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="split-equally-container">
            <label htmlFor="group-name">Split Equally :</label>
            <input type="checkbox" id="group-name" name="group-name"></input>
          </div>
        </div>
        <button onClick={handleSubmit}>Add Expense</button>
        <button onClick={toggleModal}>Cancel</button>
      </form>
    </div>
  );
};

export default AddExpense;
