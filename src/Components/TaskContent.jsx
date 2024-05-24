import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  Slider,
  Row,
  Col,
  Input,
  InputNumber,
  Form as AntForm,
  Button,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskPriority,
  getTaskStatus,
  getTaskType,
} from "../Redux/Reducer/TaskContentsReducer";
import { getUserAllAsync } from "../Redux/Reducer/UserReducer";


const { Option } = Select;

const TaskSchema = Yup.object().shape({
  projectId: Yup.string().required("Please select a project"),
  taskName: Yup.string().required("Please enter the task name"),
  statusId: Yup.string()
    .required("Please select the status")
    .matches(/^\d+$/, "Status must be a number"),
  priorityId: Yup.string()
    .required("Please select the priority")
    .matches(/^\d+$/, "Priority must be a number"),
  typeId: Yup.string()
    .required("Please select the task type")
    .matches(/^\d+$/, "Task type must be a number"),
  description: Yup.string().required("Please enter the description"),
});

const TaskContent = ({ onSubmit }) => {
  const dispatch = useDispatch();
 
  const { arrProjectAll } = useSelector((state) => state.ProjectManager);
  const { taskStatus, taskPriority, taskType } = useSelector(
    (state) => state.TaskContentsReducer
  );
 
  const { arrUser } = useSelector((state) => state.UserReducer);
  const formik = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: "",
      typeId: "",
      priorityId: "",
    },
    validationSchema: TaskSchema,
    onSubmit: (values, { resetForm }) => {
      delete values.progress;
      onSubmit(values);
      resetForm();
    },
  });

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };

  useEffect(() => {
    dispatch(getTaskStatus());
    dispatch(getTaskPriority());
    dispatch(getTaskType());
    dispatch(getUserAllAsync());
  }, [dispatch]);

  return (
    <form id="taskForm" layout="vertical" onSubmit={formik.handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Project"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.projectId && formik.errors.projectId ? "error" : ""
            }
            help={
              formik.touched.projectId && formik.errors.projectId
                ? formik.errors.projectId
                : ""
            }
          >
            <Select
              name="project"
              value={formik.values.projectId}
              onChange={(value) => formik.setFieldValue("projectId", value)}
              onBlur={formik.handleBlur}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Select a project</Option>
              {arrProjectAll.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.projectName}
                </Option>
              ))}
            </Select>
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Task Name"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.taskName && formik.errors.taskName ? "error" : ""
            }
            help={
              formik.touched.taskName && formik.errors.taskName
                ? formik.errors.taskName
                : ""
            }
          >
            <Input
              name="taskName"
              value={formik.values.taskName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Status"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.statusId && formik.errors.statusId ? "error" : ""
            }
            help={
              formik.touched.statusId && formik.errors.statusId
                ? formik.errors.statusId
                : ""
            }
          >
            <Select
              name="status"
              value={formik.values.statusId}
              onChange={(value) => formik.setFieldValue("statusId", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a status</Option>
              {taskStatus?.map((taskStatus) => (
                <Option key={taskStatus.statusId} value={taskStatus.statusId}>
                  {taskStatus.statusName}
                </Option>
              ))}
            </Select>
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16} justify="space-between">
        <Col span={10}>
          <AntForm.Item
            label="Priority"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.priorityId && formik.errors.priorityId
                ? "error"
                : ""
            }
            help={
              formik.touched.priorityId && formik.errors.priorityId
                ? formik.errors.priorityId
                : ""
            }
          >
            <Select
              name="priority"
              value={formik.values.priorityId}
              onChange={(value) => formik.setFieldValue("priorityId", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a Priority</Option>
              {taskPriority?.map((taskPriority) => (
                <Option
                  key={taskPriority.priorityId}
                  value={taskPriority.priorityId}
                >
                  {taskPriority.priority}
                </Option>
              ))}
            </Select>
          </AntForm.Item>
        </Col>
        <Col span={10}>
          <AntForm.Item
            label="Task Type"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.typeId && formik.errors.typeId ? "error" : ""
            }
            help={
              formik.touched.typeId && formik.errors.typeId
                ? formik.errors.typeId
                : ""
            }
          >
            <Select
              name="taskType"
              value={formik.values.typeId}
              onChange={(value) => formik.setFieldValue("typeId", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a Task Type</Option>
              {Array.isArray(taskType) &&
                taskType.map((taskType) => (
                  <Option key={taskType.id} value={taskType.id}>
                    {taskType.taskType}
                  </Option>
                ))}
            </Select>
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Assigners"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.listUserAsign && formik.errors.listUserAsign
                ? "error"
                : ""
            }
            help={
              formik.touched.listUserAsign && formik.errors.listUserAsign
                ? formik.errors.listUserAsign
                : ""
            }
          >
            <Select
              mode="multiple"
              name="listUserAsign"
              value={formik.values.listUserAsign}
              onChange={(value) => formik.setFieldValue("listUserAsign", value)}
              onBlur={formik.handleBlur}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">Select a User</Option>
              {arrUser?.map((user) => (
                <Option key={user.userId} value={user.userId}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} className="time__TrackingTask">
          <AntForm.Item label="Time Tracking" labelCol={{ span: 24 }} />
        </Col>
      </Row>

      <Row gutter={16} style={{ justifyContent: "space-between" }}>
        <Col span={10}>
          <AntForm.Item
            label="Total Estimated Hours"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <InputNumber
                className="custom__inputTaskHours"
                min={0}
                value={formik.values.originalEstimate}
                onChange={(value) => {
                  formik.setFieldValue("originalEstimate", value);
                  formik.setFieldValue(
                    "timeTrackingRemaining",
                    value - formik.values.timeTrackingSpent
                  );
                }}
                style={{ width: 60, textAlign: "center", margin: "0 8px" }}
              />
            </div>
          </AntForm.Item>
        </Col>
        <Col span={10}>
          <AntForm.Item
            label="Hours Spent"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <InputNumber
                className="custom__inputTaskHours"
                min={0}
                value={formik.values.timeTrackingSpent}
                onChange={(value) => {
                  formik.setFieldValue("timeTrackingSpent", value);
                  formik.setFieldValue(
                    "timeTrackingRemaining",
                    formik.values.originalEstimate - value
                  );
                }}
                style={{ width: 60, textAlign: "center", margin: "0 8px" }}
              />
            </div>
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Progress"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Slider
              min={0}
              max={formik.values.originalEstimate}
              value={formik.values.timeTrackingSpent}
              onChange={(value) => {
                formik.setFieldValue("timeTrackingSpent", value);
                formik.setFieldValue(
                  "timeTrackingRemaining",
                  formik.values.originalEstimate - value
                );
                formik.setFieldValue("progress", value);
              }}
            />
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16} justify="space-between">
        <Col span={12}>
          <p>Hours Spent: {formik.values.timeTrackingSpent}</p>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <p>Hours Remaining: {formik.values.timeTrackingRemaining}</p>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
              style={{ height: "150px" }}
            />
          </AntForm.Item>
        </Col>
      </Row>
      <Button
        type="primary"
        htmlType="submit"
        style={{ display: "none" }}
        id="hiddenSubmitButton"
      >
        Submit
      </Button>
    </form>
  );
};

export default TaskContent;
