import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_BACKEND } from "../../utils/config";
import Swal from "sweetalert2";
import { getProjectAllAsync } from "./ProjectManager";

const initialState = {
  createProject: null,
  isLoading: false,
  error: null,
};

export const creatProjectAsync = createAsyncThunk(
  "CreateProject/newProject",
  async (dataProject, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Project/createProjectAuthorize`,
        method: "POST",
        data: dataProject,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    //   dispatch(getProjectAllAsync());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const CreateProject = createSlice({
  name: "CreateProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(creatProjectAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatProjectAsync.fulfilled, (state, action) => {
        state.createProject = action.payload;
        state.isLoading = false;
        state.error = null;
        Swal.fire("Thành công!", "Dự án đã được tạo thành công!", "success");
      })
      .addCase(creatProjectAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        Swal.fire("Thất bại!", "Đã xảy ra lỗi khi tạo dự án!", "error");
      });
  },
});

export default CreateProject.reducer;
