import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "./Reducer/RegisterReducer";
import ProjectManager from "./Reducer/ProjectManager";
import ProjectDetail from "./Reducer/ProjectDetail";

export const store = configureStore({
  reducer: {
    RegisterReducer: RegisterReducer,
    ProjectManager: ProjectManager,
    ProjectDetail: ProjectDetail,
  },
});
