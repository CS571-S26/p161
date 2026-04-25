import React, { useState } from "react";

function Budgets({ transactions, categoryBudgets, onSetCategoryBudget }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: ""
  });

  const spendingByCategory = transactions.reduce((totals, transaction) => {
    const category = transaction.category || "Other";
    totals[category] = (totals[category] || 0) + transaction.amount;
    return totals;
  }, {});

  const categories = Array.from(
    new Set([
      ...Object.keys(spendingByCategory),
      ...Object.keys(categoryBudgets),
      "Food",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Bills"
    ])
  );

  const budgetRows = categories
    .map((category) => {
      const budget = categoryBudgets[category] || 0;
      const spent = spendingByCategory[category] || 0;
      const percentUsed = budget > 0 ? (spent / budget) * 100 : 0;

      return {
        category,
        budget,
        spent,
        percentUsed,
        remaining: budget - spent
      };
    })
    .filter((item) => item.budget > 0 || item.spent > 0);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.category) {
      return;
    }

    onSetCategoryBudget(formData.category, parseFloat(formData.amount));
    setFormData({
      category: "",
      amount: ""
    });
  }

  function getStatusColors(percentUsed) {
    if (percentUsed > 100) {
      return {
        backgroundColor: "#f8d7da",
        color: "#842029",
        barColor: "#dc3545",
        text: "Over budget"
      };
    }

    if (percentUsed >= 80) {
      return {
        backgroundColor: "#fff3cd",
        color: "#664d03",
        barColor: "#ffc107",
        text: "Close to budget"
      };
    }

    return {
      backgroundColor: "#d1e7dd",
      color: "#0f5132",
      barColor: "#198754",
      text: "On track"
    };
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Budgets</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h4 card-title">Set Category Budget</h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="budget-category">
                  Category
                </label>
                <select
                  id="budget-category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Budget Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label" htmlFor="budget-amount">
                  Monthly Budget
                </label>
                <input
                  id="budget-amount"
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-dark w-100">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {budgetRows.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <p className="text-body-secondary mb-0">
              Set a category budget or add transactions to start tracking category spending.
            </p>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {budgetRows.map((item) => {
            const status = getStatusColors(item.percentUsed);
            const progressWidth = Math.min(item.percentUsed, 100);

            return (
              <div className="col-md-6" key={item.category}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 className="h5 card-title mb-1">{item.category}</h3>
                        <p className="text-body-secondary mb-0">
                          ${item.spent.toFixed(2)} spent of ${item.budget.toFixed(2)}
                        </p>
                      </div>

                      <span
                        className="badge"
                        style={{
                          backgroundColor: status.backgroundColor,
                          color: status.color
                        }}
                      >
                        {item.budget > 0 ? status.text : "No budget set"}
                      </span>
                    </div>

                    <div className="progress mb-3" style={{ height: "22px" }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${progressWidth}%`,
                        backgroundColor: item.budget > 0 ? status.barColor : "#6c757d",
                        color: "#212529"
                      }}
                    >
                        {item.budget > 0 ? `${item.percentUsed.toFixed(0)}%` : ""}
                      </div>
                    </div>

                    <p className="mb-0 fw-semibold">
                      {item.budget === 0
                        ? "Set a budget for this category."
                        : item.remaining >= 0
                          ? `$${item.remaining.toFixed(2)} remaining`
                          : `$${Math.abs(item.remaining).toFixed(2)} over budget`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Budgets;
