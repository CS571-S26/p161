import React from "react";
import { Outlet } from "react-router";
import NavigationBar from "./NavigationBar.jsx";

function Layout({ openForm }) {
  return (
    <>
      <NavigationBar onOpenForm={openForm}/>
      <Outlet />
    </>
  );
}

export default Layout;