import React, { useEffect } from "react";
import { Form, Input, Row, Col, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { creatProjectAsync } from "../../Redux/Reducer/CreateProject";
// import { createProjectAsync } from "../../Redux/Reducer/CreateProject";

const { Option } = Select;

const CreateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const projectCategories = [
    { id: 1, name: "Dự án web" },
    { id: 2, name: "Dự án phần mềm" },
    { id: 3, name: "Dự án Di Động" },
  ];

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      alias: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Required"),
      categoryId: Yup.number().required("Chưa chọn dự án").nullable(),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(creatProjectAsync(values));
      // console.log(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("alias", formik.values.projectName);
  }, [formik.values.projectName]);

  useEffect(() => {
    formik.resetForm();
  }, []);

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container py-5">
      <h1 style={{ fontWeight: "bold" }}>Create Project</h1>
      <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
        <Row gutter={16} style={{ marginBottom: "30px" }}>
          <Col span={12}>
            <Form.Item
              label="Project Name"
              validateStatus={
                formik.touched.projectName && formik.errors.projectName
                  ? "error"
                  : ""
              }
              help={
                formik.touched.projectName && formik.errors.projectName
                  ? formik.errors.projectName
                  : ""
              }
            >
              <Input
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Project Category"
              validateStatus={
                formik.touched.categoryId && formik.errors.categoryId
                  ? "error"
                  : ""
              }
              help={
                formik.touched.categoryId && formik.errors.categoryId
                  ? formik.errors.categoryId
                  : ""
              }
            >
              <Select
                name="categoryId"
                value={formik.values.categoryId}
                onChange={(value) => formik.setFieldValue("categoryId", value)}
                onBlur={formik.handleBlur}
              >
                <Option value="">Select a project category</Option>
                {projectCategories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              validateStatus={
                formik.touched.description && formik.errors.description
                  ? "error"
                  : ""
              }
              help={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : ""
              }
            >
              <ReactQuill
                value={formik.values.description}
                onChange={handleEditorChange}
                style={{ height: "300px" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right", marginTop: "24px" }}>
            <Button onClick={handleCancel} style={{ marginRight: "8px" }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateProject;
