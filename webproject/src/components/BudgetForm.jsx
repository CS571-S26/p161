import React, { useState } from "react";

function BudgetForm({ currentBudget, onUpdateBudget, onClose }) {
  const [formData, setFormData] = useState({
    action: "set",
    amount: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateBudget({
      action: formData.action,
      amount: parseFloat(formData.amount)
    });
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <p className="h4 card-title">Update Monthly Budget</p>
          <p className="text-body-secondary mb-3">
            Current budget: ${currentBudget.toFixed(2)}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="budget-action">
                Budget Action
              </label>
              <select
                id="budget-action"
                name="action"
                className="form-select"
                value={formData.action}
                onChange={handleChange}
              >
                <option value="set">Set budget to amount</option>
                <option value="add">Add to current budget</option>
                <option value="subtract">Subtract from current budget</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="monthly-budget-amount">
                Amount
              </label>
              <input
                id="monthly-budget-amount"
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

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark">
                Update Budget
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BudgetForm;
