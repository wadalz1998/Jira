import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Drawer,
  Button,
  Select,
  Slider,
  Row,
  Col,
  Input,
  InputNumber,
  Form as AntForm,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const TaskSchema = Yup.object().shape({
  project: Yup.string().required("Please select a project"),
  taskName: Yup.string().required("Please enter the task name"),
  status: Yup.string().required("Please select the status"),
  priority: Yup.string().required("Please select the priority"),
  taskType: Yup.string().required("Please select the task type"),
  assignees: Yup.array()
    .min(1, "Please select assignees")
    .required("Please select assignees"),
  description: Yup.string().required("Please enter the description"),
});

const TaskContent = ({ open, onClose }) => {
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [spentHours, setSpentHours] = useState(0);

  const formik = useFormik({
    initialValues: {
      project: "",
      taskName: "",
      status: "",
      priority: "",
      taskType: "",
      assignees: [],
      progress: 0,
      description: "",
    },
    validationSchema: TaskSchema,
    onSubmit: (values) => {
      console.log("Form values: ", values);
      onClose();
    },
  });

  const handleEditorChange = (content) => {
    formik.setFieldValue("description", content);
  };

  return (
    <form id="taskForm" layout="vertical" onSubmit={formik.handleSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Project"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.project && formik.errors.project ? "error" : ""
            }
            help={
              formik.touched.project && formik.errors.project
                ? formik.errors.project
                : ""
            }
          >
            <Select
              name="project"
              value={formik.values.project}
              onChange={(value) => formik.setFieldValue("project", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a project</Option>
              <Option value="project1">Project 1</Option>
              <Option value="project2">Project 2</Option>
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
              formik.touched.status && formik.errors.status ? "error" : ""
            }
            help={
              formik.touched.status && formik.errors.status
                ? formik.errors.status
                : ""
            }
          >
            <Select
              name="status"
              value={formik.values.status}
              onChange={(value) => formik.setFieldValue("status", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a status</Option>
              <Option value="todo">To Do</Option>
              <Option value="inProgress">In Progress</Option>
              <Option value="done">Done</Option>
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
              formik.touched.priority && formik.errors.priority ? "error" : ""
            }
            help={
              formik.touched.priority && formik.errors.priority
                ? formik.errors.priority
                : ""
            }
          >
            <Select
              name="priority"
              value={formik.values.priority}
              onChange={(value) => formik.setFieldValue("priority", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a priority</Option>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </AntForm.Item>
        </Col>
        <Col span={10}>
          <AntForm.Item
            label="Task Type"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.taskType && formik.errors.taskType ? "error" : ""
            }
            help={
              formik.touched.taskType && formik.errors.taskType
                ? formik.errors.taskType
                : ""
            }
          >
            <Select
              name="taskType"
              value={formik.values.taskType}
              onChange={(value) => formik.setFieldValue("taskType", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="">Select a task type</Option>
              <Option value="bug">Bug</Option>
              <Option value="feature">Feature</Option>
              <Option value="task">Task</Option>
            </Select>
          </AntForm.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <AntForm.Item
            label="Assignees"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            validateStatus={
              formik.touched.assignees && formik.errors.assignees ? "error" : ""
            }
            help={
              formik.touched.assignees && formik.errors.assignees
                ? formik.errors.assignees
                : ""
            }
          >
            <Select
              mode="multiple"
              name="assignees"
              value={formik.values.assignees}
              onChange={(value) => formik.setFieldValue("assignees", value)}
              onBlur={formik.handleBlur}
            >
              <Option value="user1">User 1</Option>
              <Option value="user2">User 2</Option>
            </Select>
          </AntForm.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24} className="time__TrackingTask">
          <AntForm.Item
            label="Time Tracking"
            labelCol={{ span: 24 }}
          ></AntForm.Item>
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
                value={estimatedHours}
                onChange={(value) => setEstimatedHours(value)}
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
                value={spentHours}
                onChange={(value) => setSpentHours(value)}
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
              max={estimatedHours}
              value={spentHours}
              onChange={(value) => {
                setSpentHours(value);
                formik.setFieldValue("progress", value);
              }}
            />
          </AntForm.Item>
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
    </form>
  );
};

export default TaskContent;
