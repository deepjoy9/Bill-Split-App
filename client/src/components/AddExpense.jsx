import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { ActivityContext } from "../context/ActivityContext";

const AddExpense = ({ toggleModal, groupMembers, groupId }) => {
  const { addActivity } = useContext(ActivityContext);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitEqually, setSplitEqually] = useState(true);
  const [splitManuallyEnabled, setSplitManuallyEnabled] = useState(false);
  const [splitManually, setSplitManually] = useState([
    { member: "", amount: "", description: "" },
  ]);
  const { addExpense } = useContext(ExpenseContext);
  const [membersInvolved, setMembersInvolved] = useState(groupMembers);
  const [showMembersAccordion, setShowMembersAccordion] = useState(false);
  const [selectOption, setSelectOption] = useState("everyone");

  const [splitOption, setSplitOption] = useState("equally");

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const totalMembers = membersInvolved.length;
    const amountToSplitEqually = parseFloat(amount) / totalMembers;
    const splitEquallyData = membersInvolved.map((member) => ({
      member: member,
      amount: amountToSplitEqually.toFixed(2),
    }));

    const filterSplitManuallyEmptyEntries = splitManually.filter(
      (split) =>
        split.member !== "" || split.amount !== "" || split.description !== ""
    );

    const newExpense = {
      groupId: groupId,
      name: expenseName,
      amount: parseFloat(amount),
      paidBy: paidBy,
      splitEqually: splitEqually,
      splitManually: filterSplitManuallyEmptyEntries,
      membersInvolved: membersInvolved,
    };

    if (splitEqually) {
      newExpense.splitEqually = splitEquallyData;
      newExpense.splitManually = false;
    }

    console.log(newExpense);
    addExpense(newExpense);
    toggleModal();

    // Add activity for each expense added
    const activityMessage = `Added ${expenseName} expense to the group`;
    const activityDetails = {
      groupId: groupId,
      activityMessage: activityMessage,
    };
    addActivity(activityDetails);

    setExpenseName("");
    setAmount("");
    setPaidBy("");
    setSplitEqually(true);
    setSplitManuallyEnabled(false);
    setSplitManually([{ member: "", amount: "", description: "" }]);
  };

  const handleCheckboxChange = (member) => {
    const updatedMembers = [...membersInvolved];
    const memberIndex = updatedMembers.indexOf(member);
    if (memberIndex > -1) {
      // Remove the member if it exists
      updatedMembers.splice(memberIndex, 1);
    } else {
      // Add the member if it doesn't exist
      updatedMembers.push(member);
    }
    setMembersInvolved(updatedMembers);
    setSelectOption("manual");
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log("value : ", value);
    setSelectOption(value);
    if (value === "manual") {
      setMembersInvolved([]);
      setShowMembersAccordion(true);
    }
  };

  const handleManualSplitOnChange = (index, field, value, split) => {
    const updatedSplit = [...splitManually];
    updatedSplit[index][field] = value;
    setSplitManually(updatedSplit);

    // Automatically add a new manual split field if the last field has both member and amount selected
    if (
      index === splitManually.length - 1 &&
      splitManually[index].member !== "" &&
      splitManually[index].amount !== ""
    ) {
      setSplitManually([
        ...splitManually,
        { member: "", amount: "", description: "" },
      ]);
    }
  };

  const handleSplitChange = (event) => {
    const value = event.target.value;
    setSplitOption(value);
    if (value === "manually") {
      setSplitEqually(false);
      setSplitManuallyEnabled(true);
    }
  };

  const handleRemoveManualSplit = (index) => {
    const updatedSplit = [...splitManually];
    updatedSplit.splice(index, 1);
    setSplitManually(updatedSplit);
  };

  return (
    <div className="add-expense">
      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          {/* Expense name */}
          <div className="expense-form-container">
            <label htmlFor="expense-name">Expense Name :</label>
            <input
              type="text"
              id="expense-name"
              name="expense-name"
              placeholder="Enter expense name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div className="expense-form-container">
            <label htmlFor="amount">Amount :</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Paid by */}
          <div className="paid-by-container">
            <label htmlFor="paid-by">Paid By :</label>
            <select
              id="paid-by"
              name="paid-by"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              required
            >
              <option value="">Select...</option>
              {groupMembers.map((member, index) => (
                <option key={index} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          {/* Add Members Involved */}
          <div>
            <div className="members-involved-container">
              <label htmlFor="paid-by"> Add Members Involved :</label>
              <select value={selectOption} onChange={handleSelectChange}>
                <option value="everyone">Everyone</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            {showMembersAccordion && selectOption === "manual" && (
              <div className="add-members-container">
                <div className="checkbox-container">
                  {/* Individual member checkboxes */}
                  {groupMembers.map((member, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`member-${index}`}
                        value={member}
                        checked={membersInvolved.includes(member)}
                        onChange={() => handleCheckboxChange(member)}
                      />
                      <label
                        className="add-members-label"
                        htmlFor={`member-${index}`}
                      >
                        {member}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Split Options */}
          <div>
            <div className="split-options-container">
              <label htmlFor="split-options">Split Options :</label>
              <select
                value={splitOption}
                onChange={handleSplitChange}
                id="split-options"
              >
                <option value="equally">Split Equally</option>
                <option value="manually">Split Manually</option>
              </select>
            </div>

            {/* Split Manually */}
            {splitOption === "manually" && (
              <div className="split-manually-container">
                <div className="manual-split-fields">
                  {splitManually.map((split, index) => (
                    <div key={index} className="manual-split-item">
                      <select
                        value={split.member}
                        onChange={(e) =>
                          handleManualSplitOnChange(
                            index,
                            "member",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select member</option>
                        {groupMembers.map((member, idx) => (
                          <option key={idx} value={member}>
                            {member}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={split.amount}
                        onChange={(e) =>
                          handleManualSplitOnChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                        placeholder="Amount"
                      />
                      <input
                        type="text"
                        value={split.description}
                        onChange={(e) =>
                          handleManualSplitOnChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Description"
                      />
                      {/*  Render remove button only if there are more than one fields */}
                      {splitManually.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveManualSplit(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add Expense and Cancel Button */}
        </div>
        <button type="submit">Add Expense</button>
        <button type="button" onClick={toggleModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
