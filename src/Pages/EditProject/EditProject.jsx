import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProjectDetailAsync } from "../../Redux/Reducer/ProjectDetail";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const EditProject = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { projectDetail } = useSelector((state) => state.ProjectDetail);

  const [formData, setFormData] = useState({
    projectId: "",
    projectName: "",
    projectCategory: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getProjectDetailAsync(id));
    }
  }, [id]);
  console.log(projectDetail);

  useEffect(() => {
    if (projectDetail) {
      setFormData({
        projectId: projectDetail.id || "",
        projectName: projectDetail.name || "",
        projectCategory: projectDetail.category || "",
        description: projectDetail.description || "",
      });
    }
  }, [projectDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  return (
    <div className="container py-5">
      <h1 style={{ fontWeight: "bold" }}>Edit Project</h1>
      <form className="row">
        <div className="col-4">
          <h5 className="fw-bold">Project ID</h5>
          <input
            className="w-100"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="col-4">
          <h5 className="fw-bold">Project name</h5>
          <input
            className="w-100"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <h5 className="fw-bold">Project category</h5>
          <input
            className="w-100"
            name="projectCategory"
            value={formData.projectCategory}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <h5>Description</h5>
          <ReactQuill
            value={formData.description}
            onChange={handleEditorChange}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProject;
