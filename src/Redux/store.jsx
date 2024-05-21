import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "./Reducer/RegisterReducer";
import ProjectManager from "./Reducer/ProjectManager";
import ProjectDetail from "./Reducer/ProjectDetail";
import CreateProject from "./Reducer/CreateProject";
import UpdateProject from "./Reducer/UpdateProject";
import DeleteProject from "./Reducer/DeleteProject";

export const store = configureStore({
  reducer: {
    RegisterReducer: RegisterReducer,
    ProjectManager: ProjectManager,
    ProjectDetail: ProjectDetail,
    CreateProject:CreateProject,
    UpdateProject:UpdateProject,
    DeletedProject:DeleteProject,
  },
});
