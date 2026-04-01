import React from "react";

function Transactions({ transactions }) {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Transactions</h1>

      <div className="card shadow-sm">
        <div className="card-body">
          {transactions.length === 0 ? (
            <p className="text-muted mb-0">No transactions yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.category}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;