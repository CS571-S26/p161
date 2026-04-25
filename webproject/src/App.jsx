import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Budgets from "./pages/Budgets.jsx";
import Reports from "./pages/Reports.jsx";
import Layout from "./components/Layout.jsx"
import ExpenseForm from "./components/ExpenseForm.jsx";
import BudgetForm from "./components/BudgetForm.jsx";
import transactionsData from "./data/transactionsData.js";

const TRANSACTIONS_STORAGE_KEY = "spend-smarter-transactions";
const MONTHLY_BUDGET_STORAGE_KEY = "spend-smarter-monthly-budget";
const CATEGORY_BUDGETS_STORAGE_KEY = "spend-smarter-category-budgets";

function loadStoredValue(key, fallbackValue) {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch {
    return fallbackValue;
  }
}

function App() {
  const [transactions, setTransactions] = useState(() =>
    loadStoredValue(TRANSACTIONS_STORAGE_KEY, transactionsData)
  );
  const [monthlyBudget, setMonthlyBudget] = useState(() =>
    loadStoredValue(MONTHLY_BUDGET_STORAGE_KEY, 1200)
  );
  const [categoryBudgets, setCategoryBudgets] = useState(() =>
    loadStoredValue(CATEGORY_BUDGETS_STORAGE_KEY, {})
  );
  const [showForm, setShowForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(MONTHLY_BUDGET_STORAGE_KEY, JSON.stringify(monthlyBudget));
  }, [monthlyBudget]);

  useEffect(() => {
    localStorage.setItem(CATEGORY_BUDGETS_STORAGE_KEY, JSON.stringify(categoryBudgets));
  }, [categoryBudgets]);

  function addTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
    setEditingTransaction(null);
    setShowForm(false);
  }

  function saveTransaction(updatedTransaction) {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
    setEditingTransaction(null);
    setShowForm(false);
  }

  function deleteTransaction(transactionId) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId)
    );
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

  function setCategoryBudget(category, amount) {
    setCategoryBudgets((prevBudgets) => ({
      ...prevBudgets,
      [category]: amount
    }));
  }

  function openForm(){
    setEditingTransaction(null);
    setShowForm(true);
  }

  function openEditForm(transaction) {
    setEditingTransaction(transaction);
    setShowForm(true);
  }

  function openBudgetForm(){
    setShowBudgetForm(true);
  }

  function closeForm(){
    setEditingTransaction(null);
    setShowForm(false);
  }

  function closeBudgetForm(){
    setShowBudgetForm(false);
  }

  function resetAllData() {
    const confirmed = window.confirm(
      "Reset all saved transactions and budgets? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
    localStorage.removeItem(MONTHLY_BUDGET_STORAGE_KEY);
    localStorage.removeItem(CATEGORY_BUDGETS_STORAGE_KEY);
    setTransactions(transactionsData);
    setMonthlyBudget(1200);
    setCategoryBudgets({});
    setEditingTransaction(null);
    setShowForm(false);
    setShowBudgetForm(false);
  }

  return (
    <>
      {showForm && (
        <ExpenseForm
          transaction={editingTransaction}
          onSaveTransaction={editingTransaction ? saveTransaction : addTransaction}
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
        <Route
          element={
            <Layout
              openForm={openForm}
              openBudgetForm={openBudgetForm}
              onResetData={resetAllData}
            />
          }
        >
          <Route
            index
            element={<Dashboard transactions={transactions} monthlyBudget={monthlyBudget} />}
          />
          <Route
            path="transactions"
            element={
              <Transactions
                transactions={transactions}
                onEditTransaction={openEditForm}
                onDeleteTransaction={deleteTransaction}
              />
            }
          />
          <Route
            path="budgets"
            element={
              <Budgets
                transactions={transactions}
                categoryBudgets={categoryBudgets}
                onSetCategoryBudget={setCategoryBudget}
              />
            }
          />
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
