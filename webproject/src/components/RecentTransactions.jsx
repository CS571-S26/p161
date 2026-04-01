import React from "react";

function RecentTransactions( {recentTransactions} ) {
   
  const transactions = recentTransactions.slice(-5).reverse()

  return (
    <div className="row g-4 mb-4">
      <div className="col-md-12">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title">Recent transactions</h5>
            {transactions.map((transaction, index) => (
              <div key={index} className="d-flex justify-content-between border-bottom py-2">
                <span>{transaction.category}</span>
                <span className="fw-bold">${transaction.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;