import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu user từ localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Logic để log out
    console.log('Logged out');
    // Bạn có thể xóa dữ liệu người dùng từ localStorage ở đây nếu cần
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleProfile = () => {
    // Logic để đi đến trang profile
    console.log('Profile page');
  };
console.log(user);
  return (
    <div className="user-container">
      {user ? (
        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic" className="avatar-toggle">
            <img
              src={user.content.avatar} 
              alt="User Avatar"
              className="avatar"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
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
