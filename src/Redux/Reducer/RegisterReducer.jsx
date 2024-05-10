import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DOMAIN_BACKEND, TOKENCYBERSOFT } from "../../utils/config";
import { history } from "../..";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  userRegister: {},
};

const RegisterReducer = createSlice({
  name: "RegisterReducer",
  initialState,
  reducers: {
    setUserRegister: (state, action) => {
      state.userRegister = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(userLoginAsync.pending, (state, action) => {
      Swal.showLoading();
    });

    builder.addCase(userLoginAsync.fulfilled, (state, action) => {
      Swal.close();
      let timerInterval;
      Swal.fire({
        title: "Thành công!",
        text: "Đăng nhập thành công!",
        icon: "success",
        timer: 2000,
        html: "Chuyển Trang Trong <b></b>.",
        showConfirmButton: false,
        didOpen: () => {
          const timer = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000);
            timer.textContent = timeLeft + " seconds";
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          history.push("/");
        },
      });
    });
    builder.addCase(userLoginAsync.rejected, (state, action) => {
      Swal.close();
      Swal.fire({
        title: "Lỗi!",
        text: "Đăng nhập thất bại",
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    });
    builder.addCase(userRegisterAsync.pending, (state, action) => {
      Swal.showLoading();
    });

    builder.addCase(userRegisterAsync.fulfilled, (state, action) => {
      Swal.close();
      let timerInterval;
      Swal.fire({
        title: "Thành công!",
        text: "Đăng Ký thành công!",
        icon: "success",
        timer: 2000,
        html: "Chuyển Trang Trong <b></b>.",
        showConfirmButton: false,
        didOpen: () => {
          const timer = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            const timeLeft = Math.ceil(Swal.getTimerLeft() / 1000);
            timer.textContent = timeLeft + " seconds";
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          history.push("/login");
        },
      });
    });
    builder.addCase(userRegisterAsync.rejected, (state, action) => {
      Swal.close();
      Swal.fire({
        title: "Lỗi!",
        text: "Email đã tồn tại ",
        icon: "error",
        confirmButtonText: "Thử lại",
      });
    });
  },
});

export const { setUserRegister } = RegisterReducer.actions;

export default RegisterReducer.reducer;

// action thunk
export const userLoginAsync = createAsyncThunk(
  "users/login",
  async (dataUserLogin, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/signin`,
        method: "POST",
        data: dataUserLogin,
        headers: {
          Authorization: `Bearer ${TOKENCYBERSOFT}`,
        },
      });
      // Swal.hideLoading();
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem(
        "accessToken",
        response.data.content.accessToken
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegisterAsync = createAsyncThunk(
  "users/register",
  async (dataUserRegister, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${DOMAIN_BACKEND}/Users/signup`,
        method: "POST",
        data: dataUserRegister,
        headers: {
          Authorization: `Bearer ${TOKENCYBERSOFT}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
