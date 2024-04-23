import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { ExpenseContext } from "../context/ExpenseContext";
import AddExpense from "../components/AddExpense";

const GroupDetailsPage = () => {
  const { groups } = useContext(GroupContext);
  const { expenses } = useContext(ExpenseContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  console.table(groups[0]?.name);

  return (
    <div className="group-details-page">
      <h1>Group Name: {groups[0]?.name}</h1>

      <button onClick={toggleModal}>Add Expense</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}></span>
            <AddExpense toggleModal={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailsPage;
