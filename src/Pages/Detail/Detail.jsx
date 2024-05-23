import React, { useEffect, useState } from "react";
import { Row, Col, Divider, Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getUserAllAsync } from "../../Redux/Reducer/UserReducer";
import { useParams } from "react-router-dom";
import {
  getProjectDetailAsync,
  UpdateTaskDetail,
  UpdateUserProjectAsync,
} from "../../Redux/Reducer/ProjectDetail";
import ModalSelectUser from "./ModalSelectUser";
import ModalDetailTask from "./ModalDetailTask";
import {
  getTaskPriority,
  getTaskStatus,
  getTaskType,
} from "../../Redux/Reducer/TaskContentsReducer";

const { Text } = Typography;

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { arrUser } = useSelector((state) => state.UserReducer);
  const { projectDetail } = useSelector((state) => state.ProjectDetail);
  const { taskStatus, taskPriority, taskType } = useSelector(
    (state) => state.TaskContentsReducer
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberToCheckModal, setNumberToCheckModal] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetailVisible, setTaskDetailVisible] = useState(false);
  useEffect(() => {
    dispatch(getUserAllAsync());
    dispatch(getProjectDetailAsync(id));
    dispatch(getTaskStatus());
    dispatch(getTaskPriority());
    dispatch(getTaskType());
  }, [dispatch, id]);

  const showModal = () => {
    setNumberToCheckModal(numberToCheckModal + 1);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleUpdateMembers = (id) => {
    dispatch(getProjectDetailAsync(id));
    handleOk();
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const newProjectDetail = JSON.parse(JSON.stringify(projectDetail));
    const sourceColumn = newProjectDetail.lstTask.find(
      (task) => task.statusId.toString() === source.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const [movedTask] = sourceColumn.lstTaskDeTail.splice(source.index, 1);
      sourceColumn.lstTaskDeTail.splice(destination.index, 0, movedTask);
    } else {
      const destColumn = newProjectDetail.lstTask.find(
        (task) => task.statusId.toString() === destination.droppableId
      );

      const sourceTasks = Array.from(sourceColumn.lstTaskDeTail);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.statusId = destination.droppableId;
      const destinationTasks = Array.from(destColumn.lstTaskDeTail);
      destinationTasks.splice(destination.index, 0, movedTask);

      newProjectDetail.lstTask.find(
        (task) => task.statusId.toString() === source.droppableId
      ).lstTaskDeTail = sourceTasks;
      newProjectDetail.lstTask.find(
        (task) => task.statusId.toString() === destination.droppableId
      ).lstTaskDeTail = destinationTasks;

      const taskToUpdate = {
        listUserAsign: movedTask.assigness.map((user) => user.id),
        taskId: movedTask.taskId,
        taskName: movedTask.taskName,
        description: movedTask.description,
        statusId: movedTask.statusId,
        originalEstimate: movedTask.originalEstimate,
        timeTrackingSpent: movedTask.timeTrackingSpent,
        timeTrackingRemaining: movedTask.timeTrackingRemaining,
        projectId: movedTask.projectId,
        typeId: movedTask.taskTypeDetail.id,
        priorityId: movedTask.priorityTask.priorityId,
      };
      await dispatch(UpdateTaskDetail(taskToUpdate));
      dispatch(getProjectDetailAsync(id));
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDetailVisible(true);
  };

  const closeTaskDetailModal = () => {
    setTaskDetailVisible(false);
    setSelectedTask(null);
  };

  const handleSubmitDetailTask = (values) => {
    dispatch(UpdateTaskDetail(values)).then(() => {
      dispatch(getProjectDetailAsync(id));
      setTaskDetailVisible(false);
      setSelectedTask(null);
    });
  };

  if (!projectDetail || !projectDetail.lstTask) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div>
        <h1>Project: {projectDetail && projectDetail.projectName}</h1>
      </div>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Divider orientation="left">
            Creator: {projectDetail && projectDetail.creator.name}
          </Divider>
        </Col>
        <Col span={12}>
          <Divider orientation="left">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Text strong>Add Member: </Text>
              {projectDetail?.members.map((member, index) => (
                <Text key={member.userId} style={{ marginLeft: "10px" }}>
                  <img
                    key={index}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                    src={member.avatar}
                    alt={member.name}
                    title={member.name}
                  />
                </Text>
              ))}
              <Button
                type="primary"
                shape="circle"
                icon="+"
                size="small"
                onClick={showModal}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </Divider>
        </Col>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row gutter={16}>
          {projectDetail.lstTask.map((status) => (
            <Col span={6} key={status.statusId}>
              <Divider orientation="left">
                {status.statusName.charAt(0).toUpperCase() +
                  status.statusName.slice(1)}
              </Divider>
              <Droppable droppableId={status.statusId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: "lightgrey",
                      padding: "8px",
                      minHeight: "200px",
                    }}
                  >
                    {status.lstTaskDeTail.map((task, index) => (
                      <Draggable
                        key={
                          task.id
                            ? task.id.toString()
                            : `task-${status.statusId}-${index}`
                        }
                        draggableId={
                          task.id
                            ? task.id.toString()
                            : `task-${status.statusId}-${index}`
                        }
                        index={index}
                      >
                        {(provided) => (
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskClick(task)}
                              style={{
                                userSelect: "none",
                                padding: "16px",
                                margin: "0 0 8px 0",
                                minHeight: "50px",
                                backgroundColor: "#fff",
                                cursor: "pointer",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <p>Task Name: {task.taskName}</p>
                              <div
                                className="row"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <h5 style={{ margin: 0, paddingBottom: "5px" }}>
                                  {task.priorityTask.priority}
                                </h5>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  {task.assigness.length > 0 ? (
                                    task.assigness.map((user, index) => (
                                      <img
                                        key={index}
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          borderRadius: "50%",
                                        }}
                                        src={user.avatar}
                                        alt={user.name}
                                        title={user.name}
                                      />
                                    ))
                                  ) : (
                                    <i
                                      className="fa fa-user"
                                      aria-hidden="true"
                                    ></i>
                                  )}
                                </div>
                              </div>
                            </div>
                            {selectedTask && selectedTask.id === task.id && (
                              <ModalDetailTask
                                visible={taskDetailVisible}
                                onClose={closeTaskDetailModal}
                                task={selectedTask}
                                arrProjectAll={[]}
                                arrUser={arrUser}
                                taskStatus={taskStatus}
                                taskPriority={taskPriority}
                                taskType={taskType}
                                onSubmit={(values) =>
                                  handleSubmitDetailTask(values)
                                }
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          ))}
        </Row>
      </DragDropContext>

      {isModalVisible && (
        <ModalSelectUser
          projectDetail={projectDetail}
          arrUser={arrUser}
          projectId={projectDetail.id}
          members={projectDetail?.members}
          numberToCheckModal={numberToCheckModal}
          onUpdateMembers={handleUpdateMembers}
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Detail;
