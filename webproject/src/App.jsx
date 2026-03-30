import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Budgets from "./pages/Budgets.jsx";
import Reports from "./pages/Reports.jsx";
import Layout from "./components/Layout.jsx"

function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/reports" element={<Reports />} />
        </Route>
    </Routes>
  );
}

export default App;