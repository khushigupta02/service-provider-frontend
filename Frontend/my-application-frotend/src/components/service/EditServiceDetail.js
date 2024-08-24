import React, { useState } from "react";
import axios from "axios";

const EditServiceDetail = ({ service, onClose }) => {
  const [editedService, setEditedService] = useState({ ...service });

  const handleChange = (e) => {
    setEditedService({ ...editedService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/editService/${service.id}`, editedService);
      console.log("Service updated successfully", response.data);
      onClose(); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={editedService.serviceName}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              value={editedService.description}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Hourly Rate</label>
            <input
              type="text"
              name="userName"
              value={editedService.hourlyRate}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Type </label>
            <input
              type="text"
              name="se"
              value={editedService.serviceType.name}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>      
          </form>
    </div>
  );
};

export default EditServiceDetail;
