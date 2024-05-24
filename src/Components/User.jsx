import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [myCommentInfo, setMyCommentInfo] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleProfile = () => {
    navigate(`/users/${myCommentInfo.id}/edit`);
  };
  const handleUsrManager = () => {
    navigate("/users");
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userObject = JSON.parse(userInfo);
      if (userObject && userObject.content) {
        setMyCommentInfo(userObject.content);
      }
    }
  }, []);

  return (
    <div className="user-container userMini">
      admin
      {user ? (
        <Dropdown style={{ paddingLeft: "5px" }}>
          <Dropdown.Toggle
            variant=""
            id="dropdown-basic"
            className="avatar-toggle"
          >
            <img
              src={user.content?.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="avatar"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleUsrManager}>
              User Manager
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
};

export default User;
