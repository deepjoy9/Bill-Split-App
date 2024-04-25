import React from "react";

const ExpenseCard = ({ expense }) => {
  // Check if the expense object is defined
  if (!expense) {
    return <div>No expense data available</div>;
  }

  const { name, amount, paidBy, splitEqually, splitManually } = expense;

  return (
    <div className="group-container">
      <div className="group-info">
        <h3>{name}</h3>
        <p>
          <strong>Amount:</strong> {amount}
        </p>
        <p>
          <strong>Paid By:</strong> {paidBy}
        </p>
        {splitEqually ? (
          <p>Split Equally</p>
        ) : (
          <div>
            <p>
              <strong>Split Manually:</strong>
            </p>
            <ul className="manual-split-list">
              {splitManually.map((split, index) => (
                <li key={index} className="manual-split-item">
                  <strong>{split.member}:</strong> {split.amount} -{" "}
                  {split.description}
                </li>
              ))}
              {splitManually.length === 0 && (
                <li>No manual splits available</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCard;
