import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { ExpenseContext } from "../context/ExpenseContext";
import AddExpense from "../components/AddExpense";
import AddMembers from "../components/AddMembers";

const GroupDetailsPage = () => {
  const { groups } = useContext(GroupContext);
  const { expenses } = useContext(ExpenseContext);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const toggleMembersModal = () => {
    setShowMembersModal(!showMembersModal);
  };

  const toggleExpenseModal = () => {
    setShowExpenseModal(!showExpenseModal);
  };

  return (
    <div className="group-details-page">
      <h1>Group Name: {groups[0]?.name}</h1>
      <button onClick={toggleMembersModal}>Add Members</button>
      {showMembersModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleMembersModal}></span>
            <AddMembers toggleModal={toggleMembersModal} />
          </div>
        </div>
      )}
      <button onClick={toggleExpenseModal}>Add Expense</button>
      {showExpenseModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleExpenseModal}></span>
            <AddExpense toggleModal={toggleExpenseModal} />
          </div>
        </div>
      )}
      {expenses.length === 0 && (
        <p>No expenses added yet. Click "Add Expense" to start.</p>
      )}
    </div>
  );
};

export default GroupDetailsPage;
