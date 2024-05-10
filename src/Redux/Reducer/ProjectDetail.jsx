import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_BACKEND } from "../../utils/config";

const initialState = {
  projectDetail: null, // Thay đổi thành chữ thường ở đây để thống nhất
  isLoading: false,
  error: null,
};

const ProjectDetail = createSlice({
  name: "ProjectDetail",
  initialState,
  reducers: {
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload; // Thống nhất việc sử dụng chữ thường
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
      });
  },
});

export const { setProjectDetail } = ProjectDetail.actions; // Khai báo để sử dụng action này

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
