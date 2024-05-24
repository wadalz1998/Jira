import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN_BACKEND } from "../../utils/config";

const initialState = {
  arrCommentAll: [],
};

const CommentTaskReducer = createSlice({
  name: "CommentTaskReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getCommentTaskDetaiCommentlAll.fulfilled,
      (state, action) => {
        state.arrCommentAll = action.payload;
      }
    );
    builder.addCase(
      getCommentTaskDetaiCommentlAll.rejected,
      (state, action) => {
        console.error("Error fetching task status:", action.payload);
      }
    );
  },
});

export const {} = CommentTaskReducer.actions;

export default CommentTaskReducer.reducer;

export const getCommentTaskDetaiCommentlAll = createAsyncThunk(
  "CommentTaskReducer/getCommentTaskDetailAll",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Comment/getAll?taskId=${id}`,
        method: "GET",
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
export const setInsertCommentTask = createAsyncThunk(
  "CommentTaskReducer/setInsertCommentTask",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Comment/insertComment`,
        method: "POST",
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
export const updateCommentTaskAsync = createAsyncThunk(
    "CommentTaskReducer/updateCommentTaskAsync",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          url: `${DOMAIN_BACKEND}/Comment/updateComment?id=${data.id}&contentComment=${data.contentComment}`,
          method: "PUT",
          data: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
export const deleteCommentTaskAsync = createAsyncThunk(
  "CommentTaskReducer/deleteCommentTaskAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Comment/deleteComment?idComment=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
