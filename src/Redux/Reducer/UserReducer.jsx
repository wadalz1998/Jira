import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND } from "../../utils/config";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  arrUser: null,
  arrMyUser: [],
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAllAsync.fulfilled, (state, action) => {
      state.arrUser = action.payload;
    });
    builder.addCase(getUserAllAsync.rejected, (state, action) => {
      console.error("Error fetching User:", action.payload);
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.arrMyUser = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      console.error("Error fetching User:", action.payload);
    });
    builder.addCase(editUserById.fulfilled, (state, action) => {
      Swal.fire("Success", "User updated successfully!", "success");
    });
    builder.addCase(editUserById.rejected, (state, action) => {
      Swal.fire("Error", "Failed to update user.", "error");
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.arrUser = state.arrUser.filter(
        (user) => user.userId !== action.meta.arg
      );
      Swal.fire("Success", "User deleted successfully!", "success");
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      Swal.fire("Error", "Failed to delete user.", "error");
    });
  },
});

export default UserReducer.reducer;

export const getUserAllAsync = createAsyncThunk(
  "UserReducer/getUserAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/getUser`,
        method: "GET",
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

export const getUserById = createAsyncThunk(
  "UserReducer/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/getUser?keyword=${id}`,
        method: "GET",
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

export const editUserById = createAsyncThunk(
  "UserReducer/editUserById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/editUser`,
        method: "PUT",
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
export const deleteUserById = createAsyncThunk(
  "UserReducer/deleteUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/deleteUser?id=${id}`,
        method: "DELETE",
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
