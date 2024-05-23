import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, Button } from "antd";
import TaskContent from "./TaskContent";
import { useDispatch } from "react-redux";
import { setCreateTask } from "../Redux/Reducer/TaskContentsReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleTaskSubmit = (taskData) => {
      dispatch(setCreateTask(taskData))
    setVisible(false);
  };

  const handleSubmitClick = () => {
    document.getElementById("hiddenSubmitButton").click();
  };

  return (
    <div className="container">
      <div className="row p-3">
        <NavLink className={"col-6 "} to={"/"}>
          <img
            src="https://static.topcv.vn/company_logos/z1sHNTFwtLk5Zov3quFddxbhrglLYd4i_1663151222____2af398221de2ba2d92dddc58724ce19e.jpeg"
            style={{ width: "90px" }}
          />
        </NavLink>
        <div className="col-5 align-content-center">
          <NavLink className={"nav-link"} to={"/"}>
            <h1 style={{ fontSize: "16px" }}>CyberLearn.vn</h1>
          </NavLink>
          <NavLink
            className="nav-link link-dark"
            to={"/"}
            style={{ fontSize: "12px" }}
          >
            Report bug
          </NavLink>
        </div>
      </div>
      <div className="pt-3">
        <NavLink className="nav-link link-dark p-2" to={"/project-management"}>
          <i className="fa-solid fa-gear"></i> Project management
        </NavLink>
        <NavLink className="nav-link link-dark p-2" to={"/create-project"}>
          <i className="fa-solid fa-gear"></i> Create Project
        </NavLink>
        <NavLink
          className="nav-link link-dark p-2"
          to={"#"}
          onClick={showDrawer}
        >
          <i className="fa-solid fa-gear"></i> Create Task
        </NavLink>
      </div>
      <hr />
      <div className="pt-3">
        <NavLink className="nav-link link-dark p-2" to={"/releases"}>
          <i className="fa-solid fa-truck"></i> Release
        </NavLink>
        <NavLink className="nav-link link-dark p-2" to={"/issues-and-filters"}>
          <i className="fa-solid fa-equals"></i> Issues and filters
        </NavLink>
        <NavLink className="nav-link link-dark p-2" to={"/pages"}>
          <i className="fa-solid fa-paste"></i> Pages
        </NavLink>
        <NavLink className="nav-link link-dark p-2" to={"/reports"}>
          <i className="fa-solid fa-location-arrow"></i> Reports
        </NavLink>
        <NavLink className="nav-link link-dark p-2" to={"/component"}>
          <i className="fa-solid fa-box"></i> Components
        </NavLink>
      </div>
      <Drawer
        title="Create a new task"
        width={720}
        onClose={onClose}
        open={visible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmitClick} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <TaskContent onSubmit={handleTaskSubmit} />
      </Drawer>
    </div>
  );
};

export default NavBar;
