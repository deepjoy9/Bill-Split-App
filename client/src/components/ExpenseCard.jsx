import React from "react";

const ExpenseCard = ({ expense }) => {
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
    return splits.map((split, index) => {
      if (split.member === paidBy) {
        return (
          <p key={index} className="split-item">
            <strong>{split.member} paid :</strong> Rs. {split.amount}
            {split.description && ` for ${split.description}`}
          </p>
        );
      } else {
        return (
          <p key={index} className="split-item">
            <strong>{split.member} will pay :</strong> Rs. {split.amount} to{" "}
            {paidBy}
            {split.description && ` for ${split.description}`}
          </p>
        );
      }
    });
  };

  // Check if the expense object is defined
  if (!expense) {
    return <div>No expense data available</div>;
  }

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
