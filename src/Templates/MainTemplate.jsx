import React from "react";
// import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
import User from "../Components/User";

const MainTemplate = () => {
  return (
    <div className="row w-100 h-100">
      <div
        className="col-3 bg-body-secondary"
        id="nav-bar"
        style={{ height: "100vh" }}
      >
        <NavBar />
      </div>
      <div className="col-9" style={{ height: "100vh" }}>
        <User/>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainTemplate;
