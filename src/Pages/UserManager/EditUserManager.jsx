import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, Avatar, Form as AntForm, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editUserById, getUserById } from "../../Redux/Reducer/UserReducer";
import { useNavigate, useParams } from "react-router-dom";

const ProfileSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("required"),
  name: Yup.string().required("required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{9}$/, "PhoneNumber Gồm 9 chữ số")
    .required("required"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("required"),
});

const EditUserManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { arrMyUser } = useSelector((state) => state.UserReducer);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  const user = arrMyUser.length > 0 ? arrMyUser[0] : {};

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={10} style={{ textAlign: "center" }}>
          <Avatar size={150} src={user.avatar || ""} />
        </Col>
        <Col span={14}>
          <Formik
            enableReinitialize
            initialValues={{
              id: user.userId || "",
              email: user.email || "",
              name: user.name || "",
              phoneNumber: user.phoneNumber || "",
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values, { setSubmitting }) => {
              const { passwordConfirmation, ...dataToSend } = values;
              console.log("Submitted data:", dataToSend);
              setSubmitting(false);
              setFormSubmitted(true);
              dispatch(editUserById(dataToSend));
            }}
          >
            {({
              isSubmitting,
              handleSubmit,
              validateForm,
              errors,
              touched,
              values,
              handleBlur,
            }) => (
              <>
                <h1>User: {values.name}</h1>
                <AntForm layout="vertical">
                  <AntForm.Item label="ID">
                    <Field
                      name="id"
                      as={Input}
                      readOnly
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                  </AntForm.Item>
                  <AntForm.Item label="Email">
                    <Field
                      name="email"
                      as={Input}
                      onBlur={handleBlur}
                      readOnly
                      style={{
                        pointerEvents: "none",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    {formSubmitted && touched.email && errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </AntForm.Item>
                  <AntForm.Item label="Tên">
                    <Field name="name" as={Input} onBlur={handleBlur} />
                    {formSubmitted && touched.name && errors.name && (
                      <div style={{ color: "red" }}>{errors.name}</div>
                    )}
                  </AntForm.Item>
                  <AntForm.Item label="Số điện thoại">
                    <Field name="phoneNumber" as={Input} onBlur={handleBlur} />
                    {formSubmitted &&
                      touched.phoneNumber &&
                      errors.phoneNumber && (
                        <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                      )}
                  </AntForm.Item>
                  <AntForm.Item label="Mật khẩu">
                    <Field
                      name="password"
                      as={Input.Password}
                      onBlur={handleBlur}
                    />
                    {formSubmitted && touched.password && errors.password && (
                      <div style={{ color: "red" }}>{errors.password}</div>
                    )}
                  </AntForm.Item>
                  <AntForm.Item label="Xác nhận mật khẩu">
                    <Field
                      name="passwordConfirmation"
                      as={Input.Password}
                      onBlur={handleBlur}
                    />
                    {formSubmitted &&
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation && (
                        <div style={{ color: "red" }}>
                          {errors.passwordConfirmation}
                        </div>
                      )}
                  </AntForm.Item>
                  <AntForm.Item style={{ textAlign: "right" }}>
                    <Button
                      type="default"
                      style={{ marginRight: "10px" }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        validateForm().then((errors) => {
                          setFormSubmitted(true);
                          if (Object.keys(errors).length === 0) {
                            handleSubmit();
                          }
                        });
                      }}
                      disabled={isSubmitting}
                    >
                      Lưu
                    </Button>
                  </AntForm.Item>
                </AntForm>
              </>
            )}
          </Formik>
        </Col>
      </Row>
    </div>
  );
};

export default EditUserManager;
