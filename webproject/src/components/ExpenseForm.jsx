import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';


function ExpenseForm({ onAddTransaction, onClose }) {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
    date: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleCategorySelect(category) {
    setFormData({
      ...formData,
      category: category
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.category) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date
    };

    onAddTransaction(newTransaction);
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Expense</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category</label>
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  variant="dark"
                  id="category-dropdown"
                  className="w-100 text-start"
                >
                  {formData.category || "Select Category of Spending"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  <Dropdown.Item onClick={() => handleCategorySelect("Education")}>Education</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Entertainment")}>Entertainment</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Fitness")}>Fitness</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Food")}>Food</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Gas")}>Gas</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Groceries")}>Groceries</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Health")}>Health</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Insurance")}>Insurance</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Mortgage")}>Mortgage</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Other")}>Other</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Phone")}>Phone</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Rent")}>Rent</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Shopping")}>Shopping</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Subscriptions")}>Subscriptions</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Transportation")}>Transportation</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Travel")}>Travel</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategorySelect("Utilities")}>Utilities</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-dark">
                Add Expense
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
