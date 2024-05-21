import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND } from "../../utils/config";
import axios from "axios";
import Swal from "sweetalert2";
import { getProjectAllAsync } from "./ProjectManager";

const initialState = {
  deleteProject: null,
  isLoading: false,
  error: null,
};

export const deleteProject = createAsyncThunk(
  "DeleteProject/deleteProject",
  async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/deleteProject?projectId=${projectId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      dispatch(getProjectAllAsync());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const DeleteProject = createSlice({
  name: "DeleteProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.deleteProject = action.payload;
        state.isLoading = false;
        state.error = null;
        Swal.fire(
          "Thành công!",
          "Dự án đã được xóa thành công!",
          "success"
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        Swal.fire("Thất bại!", "Đã xảy ra lỗi khi xóa dự án!", "error");
      });
  },
});

export default DeleteProject.reducer;
