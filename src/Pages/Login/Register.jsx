import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import * as yup from "yup";
import { TOKENCYBERSOFT } from "../../utils/config";
import { userRegisterAsync } from "../../Redux/Reducer/RegisterReducer";

const Register = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name không được bỏ trống"),
      email: yup
        .string()
        .required("Email không được bỏ trống")
        .email("Email Phải Có Định dạng Email"),
      password: yup
        .string()
        .required("Password không được để trống")
        .min(3, "Password chứa ít nhất 3 ký tự")
        .max(32, "Password tối đa chứa 32 ký tự"),
      phoneNumber: yup
        .string()
        .required("PhoneNumber không được bỏ trống")
        .matches(/^[0-9]{10}$/, "PhoneNumber Gồm 10 chữ số"),
    }),
    onSubmit: (userRegister) => {
      const actionThunk = userRegisterAsync(userRegister);
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
          <h3>Register</h3>
          <div
            className="Form__LoginPage"
            style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}
          >
            <form onSubmit={formRegister.handleSubmit}>
              <div className="row Input__Login">
                <div className="col-2 IconCustom__login">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="col-10 InputCustom__login">
                  <input
                    className="form-control LoginCustom "
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formRegister.values.name}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                </div>
              </div>
              {formRegister.errors.name && (
                <p className="text text-danger customTextErrorLogin">
                  {formRegister.errors.name}
                </p>
              )}
              <div className="row Input__Login">
                <div className="col-2 IconCustom__login">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="col-10 InputCustom__login">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formRegister.values.email}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                </div>
              </div>
              {formRegister.errors.email && (
                <p className="text text-danger customTextErrorLogin">
                  {formRegister.errors.email}
                </p>
              )}
              <div className="row Input__Login">
                <div className="col-2 IconCustom__login">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="col-10 InputCustom__login">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="PhoneNumber"
                    value={formRegister.values.phoneNumber}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                </div>
              </div>
              {formRegister.errors.phoneNumber && (
                <p className="text text-danger customTextErrorLogin">
                  {formRegister.errors.phoneNumber}
                </p>
              )}
              <div className="row Input__Login">
                <div className="col-2 IconCustom__login">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <div className="col-10 InputCustom__login ">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formRegister.values.password}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                </div>
              </div>
              {formRegister.errors.password && (
                <p className="text text-danger customTextErrorLogin">
                  {formRegister.errors.password}
                </p>
              )}
              <button className="LoginButton" type="submit">
                Register
              </button>
              <div className="NavLink__Login">
                <span>
                  Already have an account?
                  <NavLink to="/login" className="NavLinka">
                    Login now
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

export default Register;
