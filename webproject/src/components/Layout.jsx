import React from "react";
import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar.jsx";

function Layout({ openForm, openBudgetForm, onResetData }) {
  return (
    <>
      <NavigationBar
        onOpenForm={openForm}
        onOpenBudgetForm={openBudgetForm}
        onResetData={onResetData}
      />
      <Outlet />
    </>
  );
}

export default Layout;
