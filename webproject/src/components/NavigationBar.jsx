import React from "react";
import { LayoutDashboard, Receipt, Wallet, BarChart3 } from "lucide-react";

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          Spend Smarter
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-1" href="#">
                <LayoutDashboard size={18} />
                Dashboard
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-1" href="#">
                <Receipt size={18} />
                Transactions
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-1" href="#">
                <Wallet size={18} />
                Budgets
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-1" href="#">
                <BarChart3 size={18} />
                Reports
              </a>
            </li>
          </ul>

          <button className="btn btn-dark">Add Expense</button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;