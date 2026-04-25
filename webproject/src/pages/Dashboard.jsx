import React from "react";
import Summary from "../components/Summary";
import RecentTransactions from "../components/RecentTransactions";
import CategoryPieChart from "../components/CategoryPieChart";

function Dashboard({ transactions, monthlyBudget }) {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <Summary transactionSpending={transactions} monthlyBudget={monthlyBudget}/>
      <div className="row g-4 mb-4">
        <div className="col-md-12">
          <CategoryPieChart transactions={transactions}/>
        </div>
      </div>
      <RecentTransactions recentTransactions={transactions}/>
    </div>
  );
}

export default Dashboard;
