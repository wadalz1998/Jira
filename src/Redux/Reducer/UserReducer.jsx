import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND } from "../../utils/config";
import axios from "axios";

const initialState = {
  arrUser: null,
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
  },
});

export const {} = UserReducer.actions;

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
