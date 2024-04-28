import React from "react";

const ExpenseCard = ({ expense }) => {
  // Check if the expense object is defined
  if (!expense) {
    return <div>No expense data available</div>;
  }

  const { name, amount, paidBy, splitEqually, splitManually, membersInvolved } =
    expense;

  // Function to calculate split equally
  const calculateEquallySplit = () => {
    const splitAmount = amount / membersInvolved.length;
    return membersInvolved.map((member, index) => ({
      member: member,
      amount: splitAmount,
    }));
  };

  // Function to calculate manual split
  const calculateManualSplit = () => {
    return splitManually.map((split) => ({
      member: split.member,
      amount: split.amount,
      description: split.description,
    }));
  };

  // Determine the splits based on the split type
  const splits = splitEqually
    ? calculateEquallySplit()
    : calculateManualSplit();

  // Render the splits
  const renderSplits = () => {
    return splits.map((split, index) => (
      <p key={index} className="split-item">
        <strong>{split.member} :</strong> Rs. {split.amount}
        {split.description && ` - ${split.description}`}
      </p>
    ));
  };

  return (
    <div className="group-container">
      <div className="group-info">
        <h3>{name}</h3>
        <p>
          <strong>Amount :</strong> Rs. {amount}
        </p>
        <p>
          <strong>Paid By :</strong> {paidBy}
        </p>
        {membersInvolved && (
          <p>
            <strong>Members Involved :</strong> {membersInvolved.join(", ")}
          </p>
        )}
        <div>
          <p className="split-amounts">
            <strong>
              Split Amount : {splitEqually ? "Equally" : "Manually"}
            </strong>
          </p>
          <div className="split-list">{renderSplits()}</div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
