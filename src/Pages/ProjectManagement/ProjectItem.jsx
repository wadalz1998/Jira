import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteProject } from "../../Redux/Reducer/DeleteProject";

const ProjectItem = ({ currentItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEditProject = (projectId) => {
    navigate(`/projects/${projectId}/edit`);
  };
  const handleDeleteProject = (projectId) => {
    dispatch(deleteProject(projectId))
  };

  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>
              <NavLink to={`/projects/${item.id}`}>{item.alias}</NavLink>
            </td>
            <td>{item.categoryName}</td>
            <td>{item.creator.name}</td>
            <td>
              {item.members && item.members.length > 0
                ? item.members.slice(0, 2).map((member, indx) => {
                    return (
                      <img
                        key={indx}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                        src={member.avatar}
                        alt={member.name}
                        title={member.name}
                      />
                    );
                  })
                : ""}
              {item.members && item.members.length > 2 && (
                <span
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                >
                  +{item.members.length - 2}
                </span>
              )}
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleEditProject(item.id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDeleteProject(item.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </>
  );
};

export default ProjectItem;
