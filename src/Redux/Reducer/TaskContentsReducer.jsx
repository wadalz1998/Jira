import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND } from "../../utils/config";
import axios from "axios";

const initialState = {
  taskStatus: null,
  taskPriority: null,
  taskType:null,
};

const TaskContentsReducer = createSlice({
  name: "TaskContentsReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskStatus.fulfilled, (state, action) => {
      state.taskStatus = action.payload;
    });
    builder.addCase(getTaskStatus.rejected, (state, action) => {
      console.error("Error fetching task status:", action.payload);
    });
    builder.addCase(getTaskPriority.fulfilled, (state, action) => {
      state.taskPriority = action.payload;
    });
    builder.addCase(getTaskPriority.rejected, (state, action) => {
      console.error("Error fetching task Priority:", action.payload);
    });
    builder.addCase(getTaskType.fulfilled, (state, action) => {
      state.taskType = action.payload;
    });
    builder.addCase(getTaskType.rejected, (state, action) => {
      console.error("Error fetching task Type:", action.payload);
    });
  },
});

export const {} = TaskContentsReducer.actions;

export default TaskContentsReducer.reducer;

export const getTaskStatus = createAsyncThunk(
  "TaskContentsReducer/taskStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Status/getAll`,
        method: "GET",
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTaskPriority = createAsyncThunk(
  "TaskContentsReducer/taskPriority",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Priority/getAll`,
        method: "GET",
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTaskType = createAsyncThunk(
  "TaskContentsReducer/taskType",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/TaskType/getAll`,
        method: "GET",
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);