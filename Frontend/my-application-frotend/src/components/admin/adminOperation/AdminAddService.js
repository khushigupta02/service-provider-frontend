import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminAddService = () => {
  const [formData , setFormData] = useState({
    serviceName: "",
    description: "",
    hourlyRate: "",
    serviceType: "",
    customServiceType: "", 

  });  
  const handleChange =(e) =>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { serviceName, description, hourlyRate, serviceType, customServiceType } = formData;
    
    const selectedServiceType = serviceType !== "custom" ? { name: serviceType } : { name: customServiceType };

    try {
      const response = await axios.post("http://localhost:8080/addService", {
        serviceName,
        description,
        hourlyRate,
        serviceType: selectedServiceType, 
      });
      
      console.log("Response Data:", response.data);
      
      if (response.status === 200) {
        alert("Service Added");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/viewAllServiceType"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const result = await fetchData();
      setData(result);
    };

    fetchDataAndSetState();
  }, []);

  return (
    <div>
    <div className="container service-form">
      <form className="mt-1" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Service Name</label>
          <input type="text" name="serviceName" className="form-control" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" name="description" className="form-control" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Hourly Rate</label>
          <input type="text" name="hourlyRate" className="form-control" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Service Type</label>
          <select className="form-select" name="serviceType" value={formData.serviceType} onChange={handleChange}>
            <option value="">Select Service Type</option>
            {data.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
            <option value="custom">Add a new</option>
          </select>
        </div>
        {formData.serviceType === "custom" && (
          <div className="mb-3">
            <label className="form-label">Custom Service Type</label>
            <input type="text" name="customServiceType" className="form-control" onChange={handleChange}/>
          </div>
        )}
        <button type="submit" className="btn btn-primary my-2">
          Add Service
        </button>
      </form>
    </div>
  </div>
  );
};

export default AdminAddService;
