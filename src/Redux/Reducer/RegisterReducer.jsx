import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND, TOKENCYBERSOFT } from "../../utils/config";
import { history } from "../..";
import axios from "axios";

const initialState = {
  userRegister: {},
  loading: false,
};

const RegisterReducer = createSlice({
  name: "RegisterReducer",
  initialState,
  reducers: {
    setUserRegister: (state, action) => {
      state.userRegister = action.payload;
    },
    setLoadingAction: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegisterAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(userRegisterAsync.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setUserRegister, setLoadingAction } = RegisterReducer.actions;

export default RegisterReducer.reducer;

// action thunk
export const userLoginAsync = createAsyncThunk(
  "users/login",
  async (dataUserLogin, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/signin`,
        method: "POST",
        data: dataUserLogin,
        headers: {
          Authorization: `Bearer ${TOKENCYBERSOFT}`,
        },
      });
      dispatch(setLoadingAction(false));
      localStorage.setItem('user', JSON.stringify(response.data));
      history.push("/");
      return response.data;
    } catch (error) {
      dispatch(setLoadingAction(false));
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegisterAsync = createAsyncThunk(
  "users/register",
  async (dataUserRegister, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingAction(true));
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/signup`,
        method: "POST",
        data: dataUserRegister,
        headers: {
          Authorization: `Bearer ${TOKENCYBERSOFT}`,
        },
      });
      dispatch(setLoadingAction(false));
      history.push("/login");
      return response.data;
    } catch (error) {
      dispatch(setLoadingAction(false));
      return rejectWithValue(error.response.data);
    }
  }
);
