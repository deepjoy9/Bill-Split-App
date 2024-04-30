import React, { useContext, useEffect, useState } from "react";
import { GroupContext } from "../context/GroupContext";
import { ExpenseContext } from "../context/ExpenseContext";
import AddExpense from "../components/AddExpense";
import AddMembers from "../components/AddMembers";
import ExpenseCard from "../components/ExpenseCard";
import GroupMembers from "../components/GroupMembers";
import ActivityCard from "../components/ActivityCard";
import { ActivityContext } from "../context/ActivityContext";
import { useParams } from "react-router-dom";

const GroupDetailsPage = () => {
  const { id } = useParams();
  console.log("Group Id : ", id);
  const { groups } = useContext(GroupContext);
  const { expenses } = useContext(ExpenseContext);
  const { activityLog } = useContext(ActivityContext);
  const [showAddNewMembersModal, setShowAddNewMembersModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showExpenses, setShowExpenses] = useState(true);
  const [activeTab, setActiveTab] = useState("expenses");
  const [groupActivities, setGroupActivities] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    const filteredActivities = activityLog.filter(
      (activity) => activity.groupId === id
    );
    setGroupActivities(filteredActivities);

    const filteredExpenses = expenses.filter(
      (expense) => expense.groupId === id
    );
    console.log("filteredExpenses:", filteredExpenses);
    setFilteredExpenses(filteredExpenses);
  }, [activityLog, expenses, id]);

  const toggleAddNewMembersModal = () => {
    setShowAddNewMembersModal(!showAddNewMembersModal);
  };

  const toggleExpenseModal = () => {
    setShowExpenseModal(!showExpenseModal);
  };

  const toggleMembersModal = () => {
    setShowMembersModal(!showMembersModal);
  };

  const toggleExpenses = () => {
    if (!showExpenses) {
      setShowExpenses(true);
      setShowActivity(false);
    }
  };

  const toggleActivity = () => {
    if (!showActivity) {
      setShowActivity(true);
      setShowExpenses(false);
    }
  };

  return (
    <div className="group-details-page">
      <h1>
        Group Name: {(groups.find((group) => group.groupId === id) || {}).name}
      </h1>

      {/* Group Members modal */}
      <button onClick={toggleMembersModal}>View Group Members</button>
      {showMembersModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleMembersModal}></span>
            <GroupMembers
              groupMembers={
                (groups.find((group) => group.groupId === id) || {})
                  .groupMembers || []
              }
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
              alreadyAddedMembers={
                (groups.find((group) => group.groupId === id) || {})
                  .groupMembers || []
              }
              groupId={id} 
              groupMembers={
                (groups.find((group) => group.groupId === id) || {})
                  .groupMembers || []
              } 
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
            <AddExpense
              toggleModal={toggleExpenseModal}
              groupId={id}
              groupMembers={
                (groups.find((group) => group.groupId === id) || {})
                  .groupMembers || []
              }
            />
          </div>
        </div>
      )}

      {/* Tabs */}

      <div className="group-tabs">
        <div className="group-tab-buttons">
          <button
            onClick={() => {
              toggleExpenses();
              setActiveTab("expenses");
            }}
            className={activeTab === "expenses" ? "active" : ""}
          >
            View Expenses
          </button>
          <button
            onClick={() => {
              toggleActivity();
              setActiveTab("activity");
            }}
            className={activeTab === "activity" ? "active" : ""}
          >
            View Activity
          </button>
        </div>

        {/* Display all list of Expenses */}
        <div>
          {showExpenses && (
            <div className="my-expense-list">
              <h2>Expenses:</h2>
              {filteredExpenses.map((expense, index) => (
                <ExpenseCard key={index} expense={expense} />
              ))}
              {filteredExpenses.length === 0 && (
                <p>No expenses added yet. Click "Add Expense" to start.</p>
              )}
            </div>
          )}
        </div>

        {/* Activity tab */}
        <div>
          {showActivity && (
            <div className="activity-log">
              <h2>Group Activities:</h2>
              {groupActivities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
              ))}
              {groupActivities.length === 0 && (
                <p>No activity data available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
