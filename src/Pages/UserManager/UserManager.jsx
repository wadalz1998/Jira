import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Pagination } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserById,
  getUserAllAsync,
} from "../../Redux/Reducer/UserReducer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { arrUser } = useSelector((state) => state.UserReducer) || {
    arrUser: [],
  };

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageInput, setPageInput] = useState("");

  useEffect(() => {
    dispatch(getUserAllAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!arrUser) return;

    let users = arrUser.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        String(user.userId).toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchText.toLowerCase())
    );

    users = users.sort((a, b) => {
      if (sortOrder === "asc") {
        return String(a.userId).localeCompare(String(b.userId));
      } else {
        return String(b.userId).localeCompare(String(a.userId));
      }
    });

    setSortedData(users);
    setData(users.slice((currentPage - 1) * pageSize, currentPage * pageSize));
  }, [searchText, arrUser, sortOrder, currentPage, pageSize]);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (userId) => {
    navigate(`/users/${userId}/edit`);
    console.log(`Edit user with userId: ${userId}`);
  };

  const handleDelete = (key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserById(key))
          .then(() => {
            Swal.fire("Deleted!", "Your user has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handlePageInputChange = (event) => {
    setPageInput(event.target.value);
  };

  const handlePageInputEnter = (event) => {
    if (event.key === "Enter") {
      handleGoToPage();
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(sortedData.length / pageSize)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: (
        <div
          onClick={handleSort}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>UserId</span>
          <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
        </div>
      ),
      dataIndex: "userId",
      key: "userId",
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.userId)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 style={{ margin: "15px 0" }}>User Manager</h3>
      <Input
        placeholder="Tìm kiếm"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
        prefix={<SearchOutlined />}
      />
      <Table
        columns={columns}
        dataSource={data.map((user) => ({ ...user, key: user.userId }))} // Thêm key duy nhất vào mỗi hàng
        pagination={false}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Input
          placeholder="Go to page"
          value={pageInput}
          onChange={handlePageInputChange}
          onKeyDown={handlePageInputEnter}
          style={{ width: 100 }}
        />
        <Button onClick={handleGoToPage}>Go</Button>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedData.length}
          onChange={handlePageChange}
          showSizeChanger
          onShowSizeChange={handlePageChange}
          style={{ marginLeft: "auto" }}
        />
      </div>
    </div>
  );
};

export default UserManager;
