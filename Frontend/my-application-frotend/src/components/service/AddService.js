import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import api from "../instance/Api";
import { toast } from "react-toastify";

const AddService = () => {
  const initialFormData = {
    serviceName: "",
    description: "",
    hourlyRate: "",
    serviceType: "",
    customServiceType: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result = await fetchData();
      setData(result);
    };

    fetchDataAndSetState();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { serviceName, description, hourlyRate, serviceType, customServiceType } = formData;
    const selectedServiceType = serviceType !== "custom" ? { name: serviceType } : { name: customServiceType };

    console.log("Submitting form data: ", formData);  // Debugging line
    try {
      const response = await api.post("http://localhost:8080/addService", {
        serviceName,
        description,
        hourlyRate,
        serviceType: selectedServiceType,
      });

      console.log("Response Data:", response.data);

      if (response.status === 200) {
        // Reset the form fields
        setFormData(initialFormData);
      } else {
        alert("Failed to add service");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/viewAllServiceType");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container service-form">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Service Name</label>
          <input
            type="text"
            name="serviceName"
            className="form-control"
            onChange={handleChange}
            value={formData.serviceName}
            required
            autoComplete="off"

          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            rows="3"
            className="form-control"
            onChange={handleChange}
            value={formData.description}
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Hourly Rate <span style={{ fontSize: "11px" }}>(in Rupees)</span>
          </label>
          <input
            type="text"
            name="hourlyRate"
            className="form-control"
            onChange={handleChange}
            value={formData.hourlyRate}
            required
            autoComplete="off"

          />
        </div>
        <div className="mb-3">
          <label className="form-label">Service Type</label>
          <select
            style={{
              fontFamily: "Noto Sans, sans-serif",
              fontSize: "14px",
            }}
            className="form-select formControl"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Select Service Type</option>
            {data.length > 0 && data.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="custom">Add a new type</option>
          </select>
        </div>
        {formData.serviceType === "custom" && (
          <div className="mb-3">
            <label className="form-label">Add New Service Type</label>
            <input
              type="text"
              name="customServiceType"
              className="form-control"
              onChange={handleChange}
              value={formData.customServiceType}
              required
              autoComplete="off"

            />
          </div>
        )}
        <button type="submit" className="btn add-service-modal-btn my-2">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
