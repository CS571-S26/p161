import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Budgets from "./pages/Budgets.jsx";
import Reports from "./pages/Reports.jsx";
import Layout from "./components/Layout.jsx"
import ExpenseForm from "./components/ExpenseForm.jsx";
import transactionsData from "./data/transactionsData.js";

function App() {

  const [transactions, setTransactions] = useState(transactionsData);
  const [showForm, setShowForm] = useState(false);

  function addTransaction(newTransaction) {
    setTransactions((prev) => [...prev, newTransaction]);
    setShowForm(false);
  }


  function openForm(){
    setShowForm(true);
  }

  function closeForm(){
    setShowForm(false);
  }

  return (
    <>
      {showForm && (
        <ExpenseForm
          onAddTransaction={addTransaction}
          onClose={closeForm}
        />
      )}

      <Routes>
        <Route element={<Layout openForm={openForm} />}>
          <Route index element={<Dashboard transactions={transactions} />} />
          <Route
            path="transactions"
            element={<Transactions transactions={transactions} />}
          />
          <Route path="budgets" element={<Budgets />} />
          <Route path="reports" element={<Reports transactions={transactions}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;