import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND } from "../../utils/config";
import axios from "axios";
import Swal from "sweetalert2";
import { getProjectAllAsync } from "./ProjectManager";

const initialState = {
  updateProject: null,
  isLoading: false,
  error: null,
};

export const updateProject = createAsyncThunk(
  "UpdateProject/updateProject", 
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/updateProject?projectId=${data.projectId}`,
        method: "PUT",
        data: data,
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

const UpdateProject = createSlice({
  name: "UpdateProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateProject = action.payload;
        state.isLoading = false;
        state.error = null;
        Swal.fire(
          "Thành công!",
          "Dự án đã được thay đổi thành công!",
          "success"
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        Swal.fire("Thất bại!", "Đã xảy ra lỗi khi sửa dự án!", "error");
      });
  },
});

export default UpdateProject.reducer;
