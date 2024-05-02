import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginAsync } from "../../Redux/Reducer/RegisterReducer";

const Login = () => {
  const dispatch = useDispatch();
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email không được bỏ trống")
        .email("Email Phải Có Định dạng Email"),
      password: yup
        .string()
        .required("Password không được để trống")
        .min(3, "Password chứa ít nhất 3 ký tự")
        .max(32, "Password tối đa chứa 32 ký tự"),
    }),
    onSubmit: (userLogin) => {
      const actionThunk = userLoginAsync(userLogin);
      dispatch(actionThunk);
    },
  });
  return (
    <div className="Bg__LoginPage">
      <div className="wrap__login">
        <div className="Login__Left">
          <img src="./images/img01.jpg" alt="" />
        </div>
        <div className="Login__Right">
          <h3>Login</h3>
          <div
            className="Form__LoginPage"
            style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}
          >
            <form onSubmit={formLogin.handleSubmit}>
              <div className="row Input__Login">
                <div className="col-2 IconCustom__login">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="col-10 InputCustom__login">
                  <input
                    className="form-control LoginCustom "
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formLogin.values.email}
                    onChange={formLogin.handleChange}
                    onBlur={formLogin.handleBlur}
                  />
                </div>
              </div>
              {formLogin.errors.email && (
                <p className="text text-danger customTextErrorLogin">
                  {formLogin.errors.email}
                </p>
              )}
              <div className="row Input__Login">
                <div className="col-2 IconCustom__login">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <div className="col-10 InputCustom__login ">
                  <input
                    className="form-control LoginCustom "
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formLogin.values.password}
                    onChange={formLogin.handleChange}
                    onBlur={formLogin.handleBlur}
                  />
                </div>
              </div>
              {formLogin.errors.password && (
                <p className="text text-danger customTextErrorLogin">
                  {formLogin.errors.password}
                </p>
              )}
              <button className="LoginButton" type="submit">
                Login
              </button>
              <div className="NavLink__Login">
                <span>
                  Don't have an account yet?
                  <NavLink to="/register" className="NavLinka">
                    Register now
                  </NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
