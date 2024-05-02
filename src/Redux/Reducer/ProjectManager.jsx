import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_BACKEND } from "../../utils/config";

const initialState = {
  arrProjectAll: [],
};

const ProjectManager = createSlice({
  name: "ProjectManager",
  initialState,
  reducers: {
    setProjectAll: (state, action) => {
      state.arrProjectAll = action.payload;
    },
  },
});

export const { setProjectAll } = ProjectManager.actions;

export default ProjectManager.reducer;

// action thunk
export const getProjectAllAsync = () => {
  return async (dispatch) => {
    const res = await axios({
      url: `${DOMAIN_BACKEND}/Project/getAllProject`,
      method: "GET",
    });
    const action = setProjectAll(res.data.content);
    dispatch(action);
  };
};
