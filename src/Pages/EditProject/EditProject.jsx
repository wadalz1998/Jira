import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetailAsync } from "../../Redux/Reducer/ProjectDetail";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form as AntdForm, Input, Select, Button, Row, Col } from "antd";
import { updateProject } from "../../Redux/Reducer/UpdateProject";

const { Option } = Select;

const EditProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { projectDetail } = useSelector((state) => state.ProjectDetail);

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetailAsync(id));
    }
  }, [id]);

  const categories = [
    { id: 1, name: "Dự án web" },
    { id: 2, name: "Dự án phần mềm" },
    { id: 3, name: "Dự án di động" },
  ];

  const formik = useFormik({
    initialValues: {
      projectId: projectDetail?.id || "",
      projectName: projectDetail?.projectName || "",
      creator: projectDetail?.creator.id || "",
      categoryId: projectDetail?.projectCategory?.id || "",
      description: projectDetail?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      projectName: Yup.string().required("Required"),
      categoryId: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(updateProject(values));
    },
  });

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };

  const handleCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    formik.resetForm();
  }, []);
  return (
    <div className="container py-5">
      <h1 style={{ fontWeight: "bold" }}>Edit Project</h1>
      <AntdForm layout="vertical" onSubmitCapture={formik.handleSubmit}>
        <Row gutter={16} style={{ marginBottom: "30px" }}>
          <Col span={8}>
            <AntdForm.Item
              label="Project ID"
              validateStatus={
                formik.touched.projectId && formik.errors.projectId
                  ? "error"
                  : ""
              }
              help={
                formik.touched.projectId && formik.errors.projectId
                  ? formik.errors.projectId
                  : ""
              }
            >
              <Input
                name="projectId"
                readOnly
                disabled
                value={formik.values.projectId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </AntdForm.Item>
          </Col>
          <Col span={8}>
            <AntdForm.Item
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
            </AntdForm.Item>
          </Col>
          <Col span={8}>
            <AntdForm.Item
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
                {categories.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </AntdForm.Item>
          </Col>
          <Col span={24}>
            <AntdForm.Item
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
            </AntdForm.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right", marginTop: "24px" }}>
            <Button onClick={handleCancel} style={{ marginRight: "8px" }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </AntdForm>
    </div>
  );
};

export default EditProject;
