import React from "react";

function formatDate(date) {
  if (!date) {
    return "No date";
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function Transactions({ transactions, onEditTransaction, onDeleteTransaction }) {
  const totalSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const averageTransaction =
    transactions.length > 0 ? totalSpent / transactions.length : 0;
  const largestTransaction = transactions.reduce(
    (largest, transaction) =>
      transaction.amount > largest.amount ? transaction : largest,
    { amount: 0 }
  );

  const spendingByCategory = transactions.reduce((totals, transaction) => {
    const category = transaction.category || "Other";
    totals[category] = (totals[category] || 0) + transaction.amount;
    return totals;
  }, {});

  const topCategories = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const largestExpenses = [...transactions]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  const transactionsByDate = transactions.reduce((groups, transaction) => {
    const date = transaction.date || "No date";
    groups[date] = groups[date] || [];
    groups[date].push(transaction);
    return groups;
  }, {});

  const groupedTransactions = Object.entries(transactionsByDate).sort(
    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Transactions</h1>

      {transactions.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <p className="text-body-secondary mb-0">No transactions yet.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-title fw-semibold mb-2">Total Spent</p>
                  <p className="h2 fw-bold text-danger">${totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-title fw-semibold mb-2">Transactions</p>
                  <p className="h2 fw-bold">{transactions.length}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-title fw-semibold mb-2">Average</p>
                  <p className="h2 fw-bold">${averageTransaction.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-title fw-semibold mb-2">Largest</p>
                  <p className="h2 fw-bold">${largestTransaction.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h4 card-title">Top Categories</h2>
                  <div className="d-flex flex-wrap gap-2">
                    {topCategories.map((item) => (
                      <span key={item.category} className="badge text-bg-dark fs-6">
                        {item.category}: ${item.amount.toFixed(2)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h4 card-title">Largest Expenses</h2>
                  <ul className="list-group list-group-flush">
                    {largestExpenses.map((transaction) => (
                      <li
                        key={transaction.id}
                        className="list-group-item d-flex justify-content-between px-0"
                      >
                        <span>{transaction.description || transaction.category}</span>
                        <span className="fw-bold">${transaction.amount.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h4 card-title">All Transactions</h2>

              {groupedTransactions.map(([date, dateTransactions]) => (
                <div key={date} className="mb-4">
                  <h3 className="h6 fw-bold border-bottom pb-2">{formatDate(date)}</h3>

                  <div className="table-responsive">
                    <table className="table table-striped align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dateTransactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{transaction.category}</td>
                            <td className="fw-bold text-danger">
                              ${transaction.amount.toFixed(2)}
                            </td>
                            <td>{transaction.description}</td>
                            <td className="text-end">
                              <div className="d-inline-flex gap-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-dark"
                                  onClick={() => onEditTransaction(transaction)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => {
                                    const confirmed = window.confirm(
                                      "Delete this transaction?"
                                    );

                                    if (confirmed) {
                                      onDeleteTransaction(transaction.id);
                                    }
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Transactions;
