import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
const Layouts = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layouts;
