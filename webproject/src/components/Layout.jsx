import React from "react";
import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar.jsx";

function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Layout;