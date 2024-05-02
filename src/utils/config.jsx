import axios from "axios";
import { history } from "..";
import { jwtDecode } from "jwt-decode";

export const TOKEN = "token";
export const TOKENCYBERSOFT = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3ht bGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ 9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yM DA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3M iOiJzdHJpbmciLCJuYmYiOjE2MjcyOTAzODYsImV4cCI6M  TYyNzI5Mzk4Nn0.75DGRow- syI7Sl6bmYgKuZ8oaG36fOr0TUWbUwAjtDs.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJzdHJpbmciLCJuYmYiOjE2MjcyOTAzODYsImV4cCI6MTYyNzI5Mzk4Nn0.75DGRow-syI7Sl6bmYgKuZ8oaG36fOr0TUWbUwAjtDs';

export const DOMAIN_BACKEND = "https://jiranew.cybersoft.edu.vn/api";
// Cau hinh cho cac file dung chung cho he thong
//  Cau hinh interceptor cho axios (cau hinh cho tat ca request va response khi su dung axios)
// Tao ra 1 phien ban cua axios (instance axios)

export const http = axios.create({
  baseURL: DOMAIN_BACKEND, // Correct property name
  timeout: 30000, // Maximum time for a request
});

// Cau hinh request
http.interceptors.request.use(
  (config) => {
    // Tat ca cac request gui di se duoc chua trong phan header la token dang nhap
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    };
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

//Cau hinh response
http.interceptors.response.use(
  (res) => {
    // Thanh cong
    return res;
  },
  (error) => {
    // Xu ly that bai
    console.log("util", error.response);
    // lay code tu response
    const statusCode = error.response.status;
    // Duong dan khong hop le
    if (statusCode === 400) {
      // Chuyen huong trang ve home
      history.push("/");
    } else if (statusCode === 401) {
      // kiem tra token het han hay chua
      // neu het han thi goi api refreshToken
      const token = localStorage.getItem(TOKEN);

      if (token) {
        try {
          // Decode token
          const decodedToken = jwtDecode(token);
          // Kiểm tra thời gian hết hạn của token
          if (decodedToken.exp * 1000 < Date.now()) {
            // Nếu token hết hạn, gửi yêu cầu refresh token
            console.log("Gọi API refresh token");
          }
        } catch (error) {
          console.log("Lỗi khi giải mã token:", error);
        }
      }
      // khong co token
      alert("Đăng nhập để vào trang này");
      // cần chỉnh lại route
      history.push("/");
    } else if (statusCode === 403) {
      alert("Khong du quyen truy cap");
      history.push("/");
    }
    return Promise.reject(error);
  }
);
