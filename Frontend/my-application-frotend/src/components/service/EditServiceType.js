import React, { useState } from "react";
import axios from "axios";

const EditServiceType = ({ serviceType, onClose }) => {
  const [editedServiceType, setEditedServiceType] = useState({
    ...serviceType,
  });

  const handleChange = (e) => {
    console.log("Changing", e.target.name, e.target.value);
    setEditedServiceType({ ...editedServiceType, name: e.target.value });
  };;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting", editedServiceType);

    try {
      const response = await axios.put(
        `http://localhost:8080/editServiceType/${serviceType.id}`,
        editedServiceType
      );
      console.log("Service Type updated successfully", response.data);
      onClose();
    }catch (error) {
        console.error("Error updating service type:", error.response || error);
      }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="serviceName"
            value={editedServiceType.name}
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

export default EditServiceType;
