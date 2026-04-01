import React from "react";
import NavigationBar from "../components/NavigationBar";
import Summary from "../components/Summary";
import RecentTransactions from "../components/RecentTransactions"

function Dashboard( {transactions} ) {
  

  return (
    <>
    <div className="container mt-4">
        <h1>dashboard</h1>
        <Summary transactionSpending={transactions}/>
        <RecentTransactions recentTransactions={transactions}/>
      </div>
    </>
  );
}

export default Dashboard;
