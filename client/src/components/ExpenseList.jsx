import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({ expenses, activeTab, filteredExpenses }) => {
  return (
    <div className="view-list">
      {activeTab === "expenses" && (
        <div>
          <h2>Expenses:</h2>
          {expenses.length === 0 ? (
            <p className="no-activity">
              No expenses added yet. Click "Add Expense" to start.
            </p>
          ) : (
            expenses.map((expense, index) => (
              <ExpenseCard key={index} expense={expense} />
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default ExpenseList;
