import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { ExpenseContext } from "../context/ExpenseContext";
import AddExpense from "../components/AddExpense";
import AddMembers from "../components/AddMembers";
import ExpenseCard from "../components/ExpenseCard";
import GroupMembers from "../components/GroupMembers";

const GroupDetailsPage = () => {
  const { groups } = useContext(GroupContext);
  const { expenses } = useContext(ExpenseContext);
  const [showAddNewMembersModal, setShowAddNewMembersModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);

  const toggleAddNewMembersModal = () => {
    setShowAddNewMembersModal(!showAddNewMembersModal);
  };

  const toggleExpenseModal = () => {
    setShowExpenseModal(!showExpenseModal);
  };

  const toggleMembersModal = () => {
    setShowMembersModal(!showMembersModal);
  };

  return (
    <div className="group-details-page">
      <h1>Group Name: {groups[0]?.name}</h1>

      {/* Group Members modal */}
      <button onClick={toggleMembersModal}>View Group Members</button>
      {showMembersModal && (
        <div className="modal">
          <div className="modal-content">
          <span className="close" onClick={toggleMembersModal}></span>
            <GroupMembers
              groupMembers={groups[0]?.groupMembers || []}
              toggleModal={toggleMembersModal}
            />
          </div>
        </div>
      )}

      {/* Add New Members modal */}
      <button onClick={toggleAddNewMembersModal}>Add New Members</button>
      {showAddNewMembersModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleAddNewMembersModal}></span>
            <AddMembers
              toggleModal={toggleAddNewMembersModal}
              alreadyAddedMembers={groups[0]?.groupMembers || []}
              groupId={groups[0]?.groupId}
            />
          </div>
        </div>
      )}

      {/* Add Expense modal */}
      <button onClick={toggleExpenseModal}>Add Expense</button>
      {showExpenseModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleExpenseModal}></span>
            <AddExpense toggleModal={toggleExpenseModal} />
          </div>
        </div>
      )}

      {/* Display all list of Expenses */}
      <div className="my-expense-list">
        <h2>Expenses:</h2>
        {expenses.map((expense, index) => (
          <ExpenseCard key={index} expense={expense} />
        ))}
      </div>
      {expenses.length === 0 && (
        <p>No expenses added yet. Click "Add Expense" to start.</p>
      )}
    </div>
  );
};

export default GroupDetailsPage;
