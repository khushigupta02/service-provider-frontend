import React, { useState } from "react";
import axios from "axios";

const EditUserDetails = ({ user, onClose }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/editUser/${user.id}`, editedUser);
      console.log("User updated successfully", response.data);
      onClose(); 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={editedUser.firstName}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={editedUser.lastName}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username </label>
            <input
              type="text"
              name="userName"
              value={editedUser.userName}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email </label>
            <input
              type="text"
              name="email"
              value={editedUser.email}
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

export default EditUserDetails;
