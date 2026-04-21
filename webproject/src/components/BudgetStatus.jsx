import React from "react";

function BudgetStatus({ monthlyBudget = 0, amountSpent = 0 }) {
  const percentUsed = monthlyBudget > 0 ? (amountSpent / monthlyBudget) * 100 : 0;

  let statusText = "On track";
  let backgroundColor = "#d1e7dd";
  let textColor = "#0f5132";

  if (percentUsed >= 60 && percentUsed <= 80) {
    statusText = "Close to budget";
    backgroundColor = "#fff3cd";
    textColor = "#664d03";
  } else if (percentUsed > 80) {
    statusText = "Over budget";
    backgroundColor = "#f8d7da";
    textColor = "#842029";
  }

  return (
    <div
      className="alert shadow-sm"
      role="alert"
      style={{ backgroundColor: backgroundColor, color: textColor }}
    >
      <h5 className="alert-heading mb-1">{statusText}</h5>
      <p className="mb-0">
        ${amountSpent.toFixed(2)} spent of ${monthlyBudget.toFixed(2)}
      </p>
    </div>
  );
}

export default BudgetStatus;
