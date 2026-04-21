import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Budgets from "./pages/Budgets.jsx";
import Reports from "./pages/Reports.jsx";
import Layout from "./components/Layout.jsx"
import ExpenseForm from "./components/ExpenseForm.jsx";
import BudgetForm from "./components/BudgetForm.jsx";
import transactionsData from "./data/transactionsData.js";

function App() {

  const [transactions, setTransactions] = useState(transactionsData);
  const [monthlyBudget, setMonthlyBudget] = useState(1200);
  const [showForm, setShowForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  function addTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
    setShowForm(false);
  }

  function updateBudget(budgetUpdate) {
    setMonthlyBudget((prevBudget) => {
      if (budgetUpdate.action === "add") {
        return prevBudget + budgetUpdate.amount;
      }

      if (budgetUpdate.action === "subtract") {
        return Math.max(0, prevBudget - budgetUpdate.amount);
      }

      return budgetUpdate.amount;
    });

    setShowBudgetForm(false);
  }

  function openForm(){
    setShowForm(true);
  }

  function openBudgetForm(){
    setShowBudgetForm(true);
  }

  function closeForm(){
    setShowForm(false);
  }

  function closeBudgetForm(){
    setShowBudgetForm(false);
  }

  return (
    <>
      {showForm && (
        <ExpenseForm
          onAddTransaction={addTransaction}
          onClose={closeForm}
        />
      )}

      {showBudgetForm && (
        <BudgetForm
          currentBudget={monthlyBudget}
          onUpdateBudget={updateBudget}
          onClose={closeBudgetForm}
        />
      )}

      <Routes>
        <Route element={<Layout openForm={openForm} openBudgetForm={openBudgetForm} />}>
          <Route
            index
            element={<Dashboard transactions={transactions} monthlyBudget={monthlyBudget} />}
          />
          <Route
            path="transactions"
            element={<Transactions transactions={transactions} />}
          />
          <Route path="budgets" element={<Budgets />} />
          <Route
            path="reports"
            element={<Reports transactions={transactions} monthlyBudget={monthlyBudget}/>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
