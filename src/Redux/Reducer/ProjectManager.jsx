import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_BACKEND } from "../../utils/config";
import Swal from "sweetalert2";

const initialState = {
  arrProjectAll: [],
  loading: false,
  error: null,
};

const ProjectManager = createSlice({
  name: "ProjectManager",
  initialState,
  reducers: {
    setProjectAll: (state, action) => {
      state.arrProjectAll = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectAllAsync.pending, (state) => {
        state.loading = true;
        Swal.fire({
          title: "Loading...",
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
      })
      .addCase(getProjectAllAsync.fulfilled, (state, action) => {
        state.arrProjectAll = action.payload;
        state.loading = false;
        Swal.close();
      })
      .addCase(getProjectAllAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setProjectAll } = ProjectManager.actions;

export default ProjectManager.reducer;

export const getProjectAllAsync = createAsyncThunk(
  "ProjectManager/getAllProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/getAllProject`,
        method: "GET",
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
