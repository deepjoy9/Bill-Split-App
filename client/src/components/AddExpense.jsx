import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { FriendContext } from "../context/FriendContext";

const AddExpense = ({ toggleModal }) => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitEqually, setSplitEqually] = useState(false);
  const [splitManuallyEnabled, setSplitManuallyEnabled] = useState(false);
  const [splitManually, setSplitManually] = useState([
    { member: "", amount: "", description: "" },
  ]);
  const { addExpense } = useContext(ExpenseContext);
  const { friends } = useContext(FriendContext);
  const [membersInvolved, setMembersInvolved] = useState([]);
  const [showMembersAccordion, setShowMembersAccordion] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // if (expenseName.trim() === "") {
    //   alert("Please enter an expense name");
    //   return;
    // }

    // if (!splitEqually && !splitManuallyEnabled) {
    //   alert("Please select a split option");
    //   return;
    // }

    // const emptyManualSplit = splitManually.some(
    //   (split) =>
    //     split.member === "" || split.amount === "" || split.description === ""
    // );

    // if (emptyManualSplit) {
    //   alert("Please add at least one manual split entry");
    //   return;
    // }
    const filterSplitManuallyEmptyEntries = splitManually.filter(
      (split) =>
        split.member !== "" || split.amount !== "" || split.description !== ""
    );

    const newExpense = {
      name: expenseName,
      amount: parseFloat(amount),
      paidBy: paidBy,
      splitEqually: splitEqually,
      splitManually: filterSplitManuallyEmptyEntries,
      membersInvolved: membersInvolved,
    };
    console.log(newExpense);
    addExpense(newExpense);

    setExpenseName("");
    setAmount("");
    setPaidBy("");
    setSplitEqually(false);
    setSplitManuallyEnabled(false);
    setSplitManually([{ member: "", amount: "", description: "" }]);
    toggleModal();
  };

  const toggleMembersAccordion = () => {
    setShowMembersAccordion(!showMembersAccordion);
  };

  const handleCheckboxChange = (memberName) => {
    if (membersInvolved.includes(memberName)) {
      setMembersInvolved(membersInvolved.filter((name) => name !== memberName));
    } else {
      setMembersInvolved([...membersInvolved, memberName]);
    }
  };

  const handleManualSplitOnChange = (index, field, value) => {
    const updatedSplit = [...splitManually];
    updatedSplit[index][field] = value;
    setSplitManually(updatedSplit);

    // Automatically add a new manual split field if the last field has both member and amount selected
    if (
      index === splitManually.length - 1 &&
      value !== "" &&
      splitManually[index].amount !== ""
    ) {
      setSplitManually([
        ...splitManually,
        { member: "", amount: "", description: "" },
      ]);
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
              // required
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
              // required
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
              // required
            >
              <option value="">Select...</option>
              <option value="You">You</option>
              {friends.map((friend, index) => (
                <option key={index} value={friend.name}>
                  {friend.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Members Involved Accordion */}
          <div>
            <button type="button" onClick={toggleMembersAccordion}>
              Add Members Involved
            </button>
            {showMembersAccordion && (
              <div className="add-members-container">
                <div className="checkbox-container">
                  {friends.map((member, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`member-${index}`}
                        value={member.name}
                        checked={membersInvolved.includes(member.name)}
                        onChange={() => handleCheckboxChange(member.name)}
                      />
                      <label
                        className="add-members-label"
                        htmlFor={`member-${index}`}
                      >
                        {member.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Split Equally */}
          <div className="split-equally-container">
            <label htmlFor="split-equally">Split Equally :</label>
            <input
              type="checkbox"
              id="split-equally"
              name="split-equally"
              checked={splitEqually}
              onChange={(e) => setSplitEqually(e.target.checked)}
              disabled={splitManuallyEnabled}
            />
          </div>

          {/* Split Manually */}
          <div className="split-manually-container">
            <div className="split-manually-label-and-checkbox">
              <label htmlFor="split-manually">Split Manually :</label>
              <input
                type="checkbox"
                id="split-manually"
                name="split-manually"
                checked={splitManuallyEnabled}
                onChange={(e) => setSplitManuallyEnabled(e.target.checked)}
                disabled={splitEqually}
              />
            </div>
            {splitManuallyEnabled && (
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
                      <option value="You">You</option>
                      {friends.map((friend, idx) => (
                        <option key={idx} value={friend.name}>
                          {friend.name}
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
                    {splitManually.length > 1 && ( // Render remove button only if there are more than one fields
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
