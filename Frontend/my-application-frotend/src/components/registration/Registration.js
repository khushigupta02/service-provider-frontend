import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/registration.css";
import { toast } from "react-toastify";

const Registration = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [hourlyRate, sethourlyRate] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [showServiceType, setShowServiceType] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const customToastStyle = {
    backgroundColor: "#fba3b4",
    BiFontFamily: "Noto Sans sans-serif",
    color: "white",
    fontSize: "17px",
    borderRadius: "8px",
  };
  const customProgressBar = {
    background: "white",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        firstName,
        lastName,
        userName,
        password,
        email,
        hourlyRate,
        userType: {
          roleName: selectedUserType,
        },
        serviceName,
        serviceDescription,
        serviceType: {
          name: selectedServiceType,
        },
      });
      console.log("Registration successful:", response.data);
      setIsSubmitted(true);
      toast("Registration successful ✓", {
        // autoClose: 10000,
        position: "top-right",
        style: customToastStyle,
        progressStyle: customProgressBar,
      });
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/viewAllServiceType"
      );
      return response.data;
    } catch (error) {
      toast.error("Login Failed ❌");
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

  useEffect(() => {
    if (isSubmitted) {
      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");
      setEmail("");
      setServiceName("");
      setServiceDescription("");
      setSelectedUserType("");
      sethourlyRate("");
      setSelectedServiceType("");
      setShowServiceType(false);
    }
  }, [isSubmitted]);
  return (
    <>
      <div className="container">
        <div className="registration-form">
          <form className="my-2 mx-2" onSubmit={handleSubmit}>
            <div className="mb-3 d-flex">
              <div className="flex-grow-1 me-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="login-input"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="login-input"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="mb-3 d-flex">
              <div className="flex-grow-1 me-2">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="userName"
                  className="form-control"
                  id="login-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex-grow-1 ms-2">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  id="login-input"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="login-input"
                name="email"
                value={email}
                className="form-control "
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User Type</label>
              <select
                className="form-select"
                name="userType"
                id="login-input"
                value={selectedUserType}
                onChange={(e) => {
                  setSelectedUserType(e.target.value);
                  setShowServiceType(e.target.value === "Service Provider");
                }}
                required
              >
                <option value="" className="optionValue" disabled>
                  Select User Type
                </option>
                <option value="Customer" className="optionValue">
                  Customer
                </option>
                <option value="Service Provider" className="optionValue">
                  Service Provider
                </option>
              </select>
            </div>

            {selectedUserType === "Service Provider" && (
              <>
                <div className="mb-3">
                  <label className="form-label">Service Type</label>
                  <select
                    className="form-select"
                    name="serviceType"
                    value={selectedServiceType}
                    onChange={(e) => setSelectedServiceType(e.target.value)}
                  >
                    <option value="">Select Service Type</option>
                    {data.length > 0 &&
                      data.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Service Name</label>
                  <input
                    type="text"
                    name="serviceName"
                    id="login-input"
                    value={serviceName}
                    className="form-control"
                    onChange={(e) => setServiceName(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Service Price{" "}
                    <span style={{ fontSize: "11px", fontWeight: "600" }}>
                      {" "}
                      (hourly rate - in Rupees)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="hourlyRate"
                    id="login-input"
                    value={hourlyRate}
                    className="form-control"
                    onChange={(e) => sethourlyRate(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Service Description</label>
                  <textarea
                    name="serviceDescription"
                    id="login-input"
                    className="form-textarea"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    rows={5}
                    autoComplete="off"
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn buttonReg  mt-1 py-2 px-4">
              Register
            </button>
          </form>
          <label className="mx-2 account">
            Already have an Account?{" "}
            <button
              className="btn btn-link mb-1"
              style={{ textDecoration: "none" }}
            >
              Login
            </button>
          </label>
        </div>
      </div>
    </>
  );
};

export default Registration;
