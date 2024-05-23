import React, { useState, useEffect } from "react";
import { Row, Col, Button, Divider, Input, List, Modal } from "antd";
import { useDispatch } from "react-redux";
import {
  DeleteUserProjectAsync,
  UpdateUserProjectAsync,
  getProjectDetailAsync,
} from "../../Redux/Reducer/ProjectDetail";

const { Search } = Input;

const ModalSelectUser = ({
  projectId,
  arrUser,
  members,
  numberToCheckModal,
  onUpdateMembers,
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [arrNewUser, setArrNewUser] = useState(
    members.map((member) => ({ projectId, userId: member.userId }))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setArrNewUser(
      members.map((member) => ({ projectId, userId: member.userId }))
    );
  }, [members, projectId, numberToCheckModal]);

  const notYetAddedUsers = arrUser.filter(
    (user) => !arrNewUser.some((member) => member.userId === user.userId)
  );

  const filteredNotYetAddedUsers = notYetAddedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredMembers = arrNewUser.filter((user) =>
    arrUser.some(
      (u) =>
        u.userId === user.userId &&
        u.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const handleAddMember = (user) => {
    const newUser = { projectId, userId: user.userId };
    dispatch(UpdateUserProjectAsync(newUser))
      .then(() => {
        dispatch(getProjectDetailAsync(projectId));
      })
      .catch((error) => console.error("Add member failed:", error));
  };
  const handleRemoveMember = (user) => {
    const newUser = { projectId, userId: user.userId };
    dispatch(DeleteUserProjectAsync(newUser))
      .then(() => {
        dispatch(getProjectDetailAsync(projectId));
      })
      .catch((error) => console.error("Remove member failed:", error));
  };

  const handleUpdateMembers = () => {
    onUpdateMembers(projectId);
    handleOk();
  };

  return (
    <Modal
      title="Add User to Project"
      open={isModalVisible}
      onOk={handleUpdateMembers}
      onCancel={handleCancel}
      width={800}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Search
            placeholder="Search user"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ marginBottom: 16 }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Divider orientation="left">Not Yet Added</Divider>
          <List
            bordered
            dataSource={filteredNotYetAddedUsers}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleAddMember(user)}>
                    Add
                  </Button>,
                ]}
              >
                {user.name}
              </List.Item>
            )}
            style={{ maxHeight: "300px", overflowY: "auto" }}
          />
        </Col>
        <Col span={12}>
          <Divider orientation="left">Added Members</Divider>

          <List
            bordered
            dataSource={filteredMembers.map((member) => ({
              ...member,
              name:
                arrUser.find((user) => user.userId === member.userId)?.name ||
                "Unknown User",
            }))}
            renderItem={(user) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleRemoveMember(user)}>
                    Remove
                  </Button>,
                ]}
              >
                {user.name}
              </List.Item>
            )}
            style={{ maxHeight: "300px", overflowY: "auto" }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalSelectUser;
