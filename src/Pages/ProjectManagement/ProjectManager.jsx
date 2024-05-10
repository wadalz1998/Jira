import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAllAsync } from "../../Redux/Reducer/ProjectManager";
import { NavLink, useNavigate } from "react-router-dom";
import ProjectItem from "./ProjectItem";

const ProjectManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { arrProjectAll } = useSelector((state) => state.ProjectManager);
  const [filteredProjects, setFilteredProjects] = useState(arrProjectAll || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageInput, setPageInput] = useState("");

  const dispatch = useDispatch();
  
  const getProjectAllApi = async () => {
    const actionThunk = getProjectAllAsync();
    dispatch(actionThunk);
  };
  useEffect(() => {
    getProjectAllApi();
  }, []);
  useEffect(() => {
    setFilteredProjects(
      arrProjectAll.filter((project) =>
        project.alias.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, arrProjectAll]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handleChangePageInput = (e) => {
    setPageInput(e.target.value);
  };


  return (
    <div className="container py-5">
      <h1>Project Manager</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
            <ProjectItem currentItems={currentItems} />
          </tbody>
        </table>
        <div className="text-end">
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}{" "}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <input
              placeholder="Page"
              value={pageInput}
              onChange={handleChangePageInput}
              style={{
                width: "50px",
                display: "inline-block",
                marginLeft: "5px",
              }}
            />
            <button onClick={handleGoToPage}>Go</button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
