import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/main.css";
import {Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";
import {Navigate } from "react-router-dom";
import MainTemplate from "./Templates/MainTemplate";
import Header from "./Components/Header";
import CyberBoard from "./Pages/CyberBoard/CyberBoard";
import ProjectManager from "./Pages/ProjectManagement/ProjectManager";
import CreateProject from "./Pages/CreateProject/CreateProject";
import Releases from "./Pages/Releases/Releases";
import IssuesFilters from "./Pages/IssuesFilters/IssuesFilters";
import Pages from "./Pages/Pages/Pages";
import Reports from "./Pages/Reports/Reports";
import Components from "./Pages/Components/Components";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Pages/Login/RequireAuth";
import Register from "./Pages/Login/Register";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Detail from "./Pages/Detail/Detail";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <Routes>
        <Route
          path=""
          element={
            <RequireAuth>
              <MainTemplate />
            </RequireAuth>
          }
        >
          {/* <Route index element={<RequireAuth><CyberBoard/></RequireAuth>}></Route> */}
          <Route index element={<ProjectManager />}></Route>
          {/* <Route
            path="/project-management"
            element={<ProjectManager />}
          ></Route> */}
          <Route path="/create-project" element={<CreateProject />}></Route>
          <Route path="/releases" element={<Releases />}></Route>
          <Route path="/issues-and-filters" element={<IssuesFilters />}></Route>
          <Route path="/pages" element={<Pages />}></Route>
          <Route path="/reports" element={<Reports />}></Route>
          <Route path="/component" element={<Components />}></Route>
          <Route path="/projects">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  </HistoryRouter>
);
