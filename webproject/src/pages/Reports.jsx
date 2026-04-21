import React from "react";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingBarChart from "../components/SpendingBarChart";
import BudgetStatus from "../components/BudgetStatus";

function Reports( {transactions} ) {
  const monthlyBudget = 1200;
  const amountSpent = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <>
      <div className="container mt-4">
        <BudgetStatus monthlyBudget={monthlyBudget} amountSpent={amountSpent}/>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <CategoryPieChart transactions={transactions}/>
          </div>
          <div className="col-md-6">
            <SpendingBarChart transactions={transactions}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
