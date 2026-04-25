import React from "react";

function Summary( {transactionSpending, monthlyBudget} ) {
    
  const totalSpent = transactionSpending.reduce(
    (sum, transaction) => sum + transaction.amount, 0
  );
  const totalBudget = monthlyBudget;
  const remainingBudget = totalBudget - totalSpent;
  const totalTransactions = transactionSpending.length;

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <p className="card-title fw-semibold mb-2">Total Spent</p>
            <p className="h2 fw-bold text-danger">${totalSpent.toFixed(2)}</p>
            <p className="text-body-secondary mb-0">Money spent this month</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <p className="card-title fw-semibold mb-2">Monthly Budget</p>
            <p className="h2 fw-bold text-primary">${totalBudget.toFixed(2)}</p>
            <p className="text-body-secondary mb-0">Budget for this month</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <p className="card-title fw-semibold mb-2">Remaining</p>
            <p className="h2 fw-bold text-success">${remainingBudget.toFixed(2)}</p>
            <p className="text-body-secondary mb-0">Budget left</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <p className="card-title fw-semibold mb-2">Transactions</p>
            <p className="h2 fw-bold">{totalTransactions}</p>
            <p className="text-body-secondary mb-0">Total transactions this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
