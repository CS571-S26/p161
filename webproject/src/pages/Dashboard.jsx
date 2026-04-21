import React from "react";
import Summary from "../components/Summary";
import RecentTransactions from "../components/RecentTransactions";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingBarChart from "../components/SpendingBarChart";

function Dashboard( {transactions} ) {
  

  return (
    <>
      <div className="container mt-4">
        <Summary transactionSpending={transactions}/>
        <div className="row g-4 mb-4">
          <div className="col-md-12">
            <CategoryPieChart transactions={transactions}/>
          </div>
        </div>
        <RecentTransactions recentTransactions={transactions}/>
      </div>
    </>
  );
}

export default Dashboard;
