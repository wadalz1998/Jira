import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducer/UserReducer";
import RegisterReducer from "./Reducer/RegisterReducer";
import ProjectManager from "./Reducer/ProjectManager";

export const store = configureStore({
  reducer: {
    UserReducer: UserReducer,
    RegisterReducer: RegisterReducer,
    ProjectManager: ProjectManager,
  },
});
