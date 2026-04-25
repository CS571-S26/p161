import React, { useEffect, useState } from "react";
import EXPENSE_CATEGORIES from "../data/expenseCategories";

function getInitialFormData(transaction) {
  return {
    category: transaction?.category || "",
    amount: transaction?.amount?.toString() || "",
    description: transaction?.description || "",
    date: transaction?.date || ""
  };
}

function ExpenseForm({ transaction, onSaveTransaction, onClose }) {
  const [formData, setFormData] = useState(getInitialFormData(transaction));

  useEffect(() => {
    setFormData(getInitialFormData(transaction));
  }, [transaction]);

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

    const newTransaction = {
      id: transaction?.id || Date.now(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date
    };

    onSaveTransaction(newTransaction);
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <p className="h4 card-title">
            {transaction ? "Edit Transaction" : "Add New Expense"}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="expense-category">
                Category
              </label>
              <select
                id="expense-category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category of Spending</option>
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="expense-amount">
                Amount
              </label>
              <input
                id="expense-amount"
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

            <div className="mb-3">
              <label className="form-label" htmlFor="expense-description">
                Description
              </label>
              <input
                id="expense-description"
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="expense-date">
                Date
              </label>
              <input
                id="expense-date"
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark">
                {transaction ? "Save Changes" : "Add Expense"}
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

export default ExpenseForm;
