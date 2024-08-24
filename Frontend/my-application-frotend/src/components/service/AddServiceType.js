import React, { useState, useEffect } from "react";
import "../../style/addServiceType.css";
import axios from "axios";

const AddServiceType = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name} = formData;
    try {
      const response = await axios.post("http://localhost:8080/addServiceType", {
        name
      });
      console.log("Response Data:", response.data);
      if (response.status === 200) {
        alert("Service Type Added");
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
      <h2 className="my-5 text-center">Add Service Type</h2>
      <div className="container serviceType-form">
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Service Type Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Add Service TYpe
          </button>
          <div className="my-3">
            <label className="form-label">Available Service Type</label>
            <select className="form-select">
              {data.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceType;
