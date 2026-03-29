import React from "react";
import { NavLink } from "react-router";
import { LayoutDashboard, Receipt, Wallet, BarChart3 } from "lucide-react";
import Dashboard from "../pages/Dashboard.jsx";
import Transactions from "../pages/Transactions.jsx";
import Budgets from "../pages/Budgets.jsx";
import Reports from "../pages/Reports.jsx";

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          Spend Smarter
        </NavLink>

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
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Transactions"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <Receipt size={18} />
                Transactions
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Budgets"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <Wallet size={18} />
                Budgets
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/Reports"
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-1 ${isActive ? "active fw-semibold" : ""}`
                }
              >
                <BarChart3 size={18} />
                Reports
              </NavLink>
            </li>
          </ul>

          <button className="btn btn-dark">Add Expense</button>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;