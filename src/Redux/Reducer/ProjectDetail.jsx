import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_BACKEND } from "../../utils/config";
import Swal from "sweetalert2";

const initialState = {
  projectDetail: null,
  isLoading: false,
  error: null,
};

const ProjectDetail = createSlice({
  name: "ProjectDetail",
  initialState,
  reducers: {
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectDetailAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectDetailAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getProjectDetailAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(UpdateTaskDetail.pending, (state, action) => {
        Swal.showLoading();
      })
      .addCase(UpdateTaskDetail.fulfilled, (state, action) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        }).fire({
          icon: "success",
          title: "Thêm Thành Công",
        });
      })
      .addCase(UpdateTaskDetail.rejected, (state, action) => {
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        }).fire({
          icon: "error",
          title: "Đã xảy ra lỗi",
        });
      });
  },
});

export const { setProjectDetail } = ProjectDetail.actions;

export default ProjectDetail.reducer;

export const getProjectDetailAsync = createAsyncThunk(
  "ProjectDetail/getProjectById",
  async (id, { rejectWithValue }) => {
    let accessToken = localStorage.getItem("accessToken");
    accessToken = accessToken.trim().replace(/"/g, "");
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/getProjectDetail?id=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.content;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const UpdateTaskDetail = createAsyncThunk(
  "ProjectDetail/UpdateTaskDetail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/updateTask`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateUserProjectAsync = createAsyncThunk(
  "ProjectDetail/UpdateUserProjectAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/assignUserProject`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const DeleteUserProjectAsync = createAsyncThunk(
  "ProjectDetail/DeleteUserProjectAsync",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/removeUserFromProject`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);