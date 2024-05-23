import React from "react";
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
  Modal,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const ModalDetailTask = ({
  visible,
  onClose,
  task,
  arrProjectAll,
  taskPriority,
  taskType,
  taskStatus,
  arrUser,
  onSubmit,
}) => {
  const initialValues = task
    ? {
        listUserAsign: task.assigness.map((user) => user.id) || [],
        taskId: task.taskId || "",
        taskName: task.taskName || "",
        description: task.description || "",
        statusId: task.statusId ? task.statusId : "",
        originalEstimate: task.originalEstimate || 0,
        timeTrackingSpent: task.timeTrackingSpent || 0,
        timeTrackingRemaining: task.timeTrackingRemaining || 0,
        projectId: task.projectId || "",
        typeId: task.taskTypeDetail.id ? task.taskTypeDetail.id : "",
        priorityId: task.priorityTask.priorityId
          ? task.priorityTask.priorityId
          : "",
      }
    : {
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
      };

  const formik = useFormik({
    initialValues,
    validationSchema: TaskSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
           resetForm();
      onClose();
    },
    enableReinitialize: true,
  });

  const handleEditorChange = (value) => {
    formik.setFieldValue("description", value);
  };

  if (!task) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      className="custom__ModalEditDetail"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={24} className="labelEditTaskInFo">
              <AntForm.Item label="Edit Task Info" labelCol={{ span: 24 }} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <label style={{ fontWeight: "bold", paddingBottom: "10px" }}>
                Task Name: {task.taskName}
              </label>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <label> Description</label>
              <AntForm.Item
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
          <h3 style={{ paddingTop: "30px" }}>Comments</h3>
          <p>{task.comments}</p>
        </Col>
        <Col span={12}>
          <form id="taskForm" onSubmit={formik.handleSubmit}>
            <Row gutter={16}>
              <Col span={24} style={{ paddingTop: "25px" }}>
                <AntForm.Item
                  label="Task Name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  validateStatus={
                    formik.touched.taskName && formik.errors.taskName
                      ? "error"
                      : ""
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
                    formik.touched.statusId && formik.errors.statusId
                      ? "error"
                      : ""
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
                    onChange={(value) =>
                      formik.setFieldValue("statusId", value)
                    }
                    onBlur={formik.handleBlur}
                  >
                    <Option value="">Select a status</Option>
                    {taskStatus.map((status) => (
                      <Option key={status.statusId} value={status.statusId}>
                        {status.statusName}
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
                    onChange={(value) =>
                      formik.setFieldValue("priorityId", value)
                    }
                    onBlur={formik.handleBlur}
                  >
                    <Option value="">Select a Priority</Option>
                    {taskPriority.map((taskPriority) => (
                      <Option
                        key={taskPriority.priorityId}
                        value={taskPriority.priorityId}
                      >
                        {taskPriority.description}
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
                    onChange={(value) =>
                      formik.setFieldValue("listUserAsign", value)
                    }
                    onBlur={formik.handleBlur}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {arrUser.map((user) => (
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
                <AntForm.Item label="Time Tracking" />
              </Col>
            </Row>

            <Row gutter={16} style={{ justifyContent: "space-between" }}>
              <Col span={10}>
                <AntForm.Item label="Total Estimated Hours">
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
                      style={{
                        width: 60,
                        textAlign: "center",
                        margin: "0 8px",
                      }}
                    />
                  </div>
                </AntForm.Item>
              </Col>
              <Col span={10}>
                <AntForm.Item label="Hours Spent">
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
                      style={{
                        width: 60,
                        textAlign: "center",
                        margin: "0 8px",
                      }}
                    />
                  </div>
                </AntForm.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <AntForm.Item label="Progress">
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

            <Row gutter={16} justify="end">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="primary"
                onClick={formik.submitForm}
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
            </Row>
          </form>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalDetailTask;
