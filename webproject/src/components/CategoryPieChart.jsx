import React from "react";

function getSlicePath(startAngle, endAngle, radius, center) {
  const startX = center + radius * Math.cos(startAngle);
  const startY = center + radius * Math.sin(startAngle);
  const endX = center + radius * Math.cos(endAngle);
  const endY = center + radius * Math.sin(endAngle);
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    `M ${center} ${center}`,
    `L ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    "Z"
  ].join(" ");
}

function CategoryPieChart({ transactions }) {
  const spendingByCategory = transactions.reduce((totals, transaction) => {
    const category = transaction.category || "Other";
    totals[category] = (totals[category] || 0) + transaction.amount;
    return totals;
  }, {});

  const chartData = Object.entries(spendingByCategory).map(([category, amount]) => ({
    category,
    amount
  }));

  const totalSpent = chartData.reduce((sum, item) => sum + item.amount, 0);
  const size = 220;
  const center = size / 2;
  const radius = 95;
  let currentAngle = -Math.PI / 2;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">Spending by Category</h5>

        {totalSpent === 0 ? (
          <p className="text-muted mb-0">Add transactions to see your spending breakdown.</p>
        ) : (
          <div className="row align-items-center g-3">
            <div className="col-md-6 text-center">
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label="Pie chart showing spending by category"
              >
                {chartData.map((item, index) => {
                  const sliceAngle = (item.amount / totalSpent) * Math.PI * 2;
                  const startAngle = currentAngle;
                  const endAngle = currentAngle + sliceAngle;
                  currentAngle = endAngle;

                  return (
                    <path
                      key={item.category}
                      d={getSlicePath(startAngle, endAngle, radius, center)}
                      fill={
                        [
                          "#0d6efd",
                          "#198754",
                          "#dc3545",
                          "#ffc107",
                          "#6f42c1",
                          "#20c997",
                          "#fd7e14",
                          "#6610f2"
                        ][index % 8]
                      }
                    />
                  );
                })}
              </svg>
            </div>

            <div className="col-md-6">
              {chartData.map((item, index) => {
                const percent = ((item.amount / totalSpent) * 100).toFixed(1);

                return (
                  <div
                    key={item.category}
                    className="d-flex justify-content-between align-items-center border-bottom py-2"
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="rounded-circle d-inline-block"
                        style={{
                          width: "12px",
                          height: "12px",
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
                      ></span>
                      <span>{item.category}</span>
                    </div>
                    <span className="fw-semibold">
                      ${item.amount.toFixed(2)} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPieChart;
