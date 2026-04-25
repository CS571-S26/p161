import React from "react";

function SpendingBarChart({ transactions }) {
  const spendingByCategory = transactions.reduce((totals, transaction) => {
    const category = transaction.category || "Other";
    totals[category] = (totals[category] || 0) + transaction.amount;
    return totals;
  }, {});

  const chartData = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({
      category,
      amount
    }))
    .sort((a, b) => b.amount - a.amount);

  const highestAmount = chartData.length > 0 ? chartData[0].amount : 0;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h2 className="h4 card-title">Category Spending</h2>

        {highestAmount === 0 ? (
          <p className="text-body-secondary mb-0">
            Add transactions to compare spending by category.
          </p>
        ) : (
          <div
            className="d-flex align-items-end gap-3 overflow-auto pt-3"
            style={{ minHeight: "280px" }}
          >
            {chartData.map((item, index) => {
              const barHeight = (item.amount / highestAmount) * 100;

              return (
                <div
                  key={item.category}
                  className="d-flex flex-column align-items-center text-center flex-fill"
                  style={{ minWidth: "85px" }}
                >
                  <span className="fw-semibold mb-2">${item.amount.toFixed(2)}</span>
                  <div
                    className="d-flex align-items-end bg-light rounded w-100"
                    role="progressbar"
                    aria-label={`${item.category} spending`}
                    aria-valuenow={barHeight}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ height: "180px" }}
                  >
                    <div
                      className="rounded-top w-100"
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor: [
                          "#0d6efd",
                          "#198754",
                          "#dc3545",
                          "#ffc107",
                          "#6f42c1",
                          "#20c997",
                          "#fd7e14",
                          "#6610f2"
                        ][index % 8]
                      }}
                    ></div>
                  </div>
                  <span className="fw-semibold mt-2">{item.category}</span>
                  <span className="text-body-secondary small">{barHeight.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SpendingBarChart;
