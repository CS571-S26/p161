import React from "react";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingBarChart from "../components/SpendingBarChart";

function Reports( {transactions} ) {
  const totalSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const averageTransaction =
    transactions.length > 0 ? totalSpent / transactions.length : 0;

  const spendingByCategory = transactions.reduce((totals, transaction) => {
    const category = transaction.category || "Other";
    totals[category] = (totals[category] || 0) + transaction.amount;
    return totals;
  }, {});

  const categoryCounts = transactions.reduce((counts, transaction) => {
    const category = transaction.category || "Other";
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});

  const categoryAnalysis = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      count: categoryCounts[category],
      percent: totalSpent > 0 ? (amount / totalSpent) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  const largestTransaction = transactions.reduce(
    (largest, transaction) =>
      transaction.amount > largest.amount ? transaction : largest,
    { amount: 0, category: "None", description: "None" }
  );

  const smallestTransaction = transactions.reduce(
    (smallest, transaction) =>
      transaction.amount < smallest.amount ? transaction : smallest,
    transactions[0] || { amount: 0, category: "None", description: "None" }
  );

  const mostUsedCategory = Object.entries(categoryCounts).sort(
    ([, countA], [, countB]) => countB - countA
  )[0];

  const highestSpendingCategory = categoryAnalysis[0];
  const largestTransactionPercent =
    totalSpent > 0 ? (largestTransaction.amount / totalSpent) * 100 : 0;

  return (
    <>
      <div className="container mt-4">
        {transactions.length === 0 ? (
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-0">Add transactions to see spending reports.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Total Spent</h5>
                    <h2 className="fw-bold text-danger">${totalSpent.toFixed(2)}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Average Transaction</h5>
                    <h2 className="fw-bold">${averageTransaction.toFixed(2)}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Largest Expense</h5>
                    <h2 className="fw-bold">${largestTransaction.amount.toFixed(2)}</h2>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Most Frequently Used Category</h5>
                    <h2 className="fw-bold">
                      {mostUsedCategory ? mostUsedCategory[0] : "None"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <CategoryPieChart transactions={transactions}/>
              </div>
              <div className="col-md-6">
                <SpendingBarChart transactions={transactions}/>
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">Category Analysis</h5>

                <div className="table-responsive">
                  <table className="table table-striped align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Total Spent</th>
                        <th>% of Spending</th>
                        <th># Transactions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryAnalysis.map((item) => (
                        <tr key={item.category}>
                          <td>{item.category}</td>
                          <td>${item.amount.toFixed(2)}</td>
                          <td>{item.percent.toFixed(1)}%</td>
                          <td>{item.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Transaction Patterns</h5>
                    <p className="mb-2">
                      Most frequent category:{" "}
                      <span className="fw-bold">
                        {mostUsedCategory ? mostUsedCategory[0] : "None"}
                      </span>
                    </p>
                    <p className="mb-2">
                      Average expense amount:{" "}
                      <span className="fw-bold">${averageTransaction.toFixed(2)}</span>
                    </p>
                    <p className="mb-2">
                      Largest transaction:{" "}
                      <span className="fw-bold">
                        {largestTransaction.description || largestTransaction.category} - $
                        {largestTransaction.amount.toFixed(2)}
                      </span>
                    </p>
                    <p className="mb-0">
                      Smallest transaction:{" "}
                      <span className="fw-bold">
                        {smallestTransaction.description || smallestTransaction.category} - $
                        {smallestTransaction.amount.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Insights</h5>
                    <p className="mb-2">
                      {highestSpendingCategory.category} is your highest spending category,
                      making up {highestSpendingCategory.percent.toFixed(1)}% of total
                      spending.
                    </p>
                    <p className="mb-0">
                      Your largest purchase was{" "}
                      {largestTransaction.description || largestTransaction.category}, making up{" "}
                      {largestTransactionPercent.toFixed(1)}% of total spending.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Reports;
