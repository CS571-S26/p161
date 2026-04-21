import React from "react";
import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar.jsx";

function Layout({ openForm, openBudgetForm }) {
  return (
    <>
      <NavigationBar onOpenForm={openForm} onOpenBudgetForm={openBudgetForm}/>
      <Outlet />
    </>
  );
}

export default Layout;
