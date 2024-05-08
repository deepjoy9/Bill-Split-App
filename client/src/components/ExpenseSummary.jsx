import React from "react";

const ExpenseSummary = ({ expenses }) => {
  const owedMap = {};

  expenses.forEach((expense) => {
    const splits = expense.splitEqually || expense.splitManually || [];
    splits.forEach((split) => {
      if (split.member !== expense.paidBy) {
        if (!owedMap[split.member]) {
          owedMap[split.member] = [];
        }
        owedMap[split.member].push({
          name: expense.paidBy,
          amount: parseFloat(split.amount),
          expenseName: expense.name,
        });
      }
    });
  });

  return (
    <div>
      <h2>Summary of Payments:</h2>
      {Object.keys(owedMap).map((member, index) => (
        <div className="activity-container" key={index}>
          <div className="activity-info">
            <p>
              <strong>{member}:</strong>
            </p>
            {owedMap[member].map((owed, subIndex) => (
              <p key={`${member}-${owed.expenseName}-${subIndex}`}>
                {member} will {owed.amount > 0 ? "pay" : "get"} Rs.
                {Math.abs(owed.amount)} to {owed.name} for {owed.expenseName}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;
