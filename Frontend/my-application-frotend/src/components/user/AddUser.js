import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    userType: "",
    serviceName: "", // Added service name field
    serviceDescription: "", // Added service description field

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, password, email, userType, serviceName,
      serviceDescription, } = formData;
    try {
      const response = await axios.post("http://localhost:8080/register", {
        firstName,
        lastName,
        userName,
        password,
        email,
        userType: { roleName: userType },
        serviceName, // Pass service name to backend
        serviceDescription, 
        
      });
      console.log("Response Data:", response.data);
      if (response.status === 200) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <div className="container">
        <form className="mt-1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="userName"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <select
              className="form-select"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select User Type
              </option>
              <option value="Customer">Customer</option>
              <option value="Service Provider">Service Provider</option>
            </select>
          </div>
          {/* Conditional rendering for Service Name and Service Description fields */}
          {formData.userType === "Service Provider" && (
            <>
              <div className="mb-3">
                <label className="form-label">Service Name</label>
                <input
                  type="text"
                  name="serviceName"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Service Description</label>
                <textarea
                  name="serviceDescription"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary my-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
