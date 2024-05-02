import React, { useEffect } from "react";
import SearchBar from "../SearchingBar/SearchingBar";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAllAsync } from "../../Redux/Reducer/ProjectManager";

const ProjectManager = () => {
  const { arrProjectAll } = useSelector((state) => state.ProjectManager);
  const dispatch = useDispatch();
  const getProjectAllApi = async () => {
    const actionThunk = getProjectAllAsync();
    dispatch(actionThunk);
  };
  useEffect(() => {
    getProjectAllApi();
  }, []);
  console.log(arrProjectAll);

  return (
    <div className="container py-5">
      <h1>Project Manager</h1>
      <SearchBar />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Category Name</th>
              <th>Creator</th>
              <th>Member</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrProjectAll && arrProjectAll.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.alias}</td>
                <td>{item.categoryName}</td>
                <td>{item.creator.name}</td>
                <td>{item.member}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;
