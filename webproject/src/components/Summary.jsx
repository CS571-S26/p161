import React from "react";

function Summary() {
    //will implement a way to get these numbers 
  const totalSpent = 167.73;
  const totalBudget = 1200;
  const remainingBudget = totalBudget - totalSpent;
  const totalTransactions = 4;

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Total Spent</h5>
            <h2 className="fw-bold text-danger">${totalSpent.toFixed(2)}</h2>
            <p className="text-muted mb-0">Money spent this month</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Monthly Budget</h5>
            <h2 className="fw-bold text-primary">${totalBudget.toFixed(2)}</h2>
            <p className="text-muted mb-0">Budget for this month</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Remaining</h5>
            <h2 className="fw-bold text-success">${remainingBudget.toFixed(2)}</h2>
            <p className="text-muted mb-0">Budget left</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Transactions</h5>
            <h2 className="fw-bold">{totalTransactions}</h2>
            <p className="text-muted mb-0">Total recent transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;