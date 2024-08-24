import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../../style/login.css";
import { toast } from "react-toastify"; 
const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState(""); 
  const [isSubmitted] = useState(false); 


  const customToastStyle = {
    backgroundColor: "#FDBA01",
    BiFontFamily:"Noto Sans sans-serif" ,    
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
      const response = await axios.post("http://localhost:8080/generateToken", {
        userName,
        password,
        userType: {
          roleName: selectedUserType,
        },
      });
      console.log("Response Data:", response.data);
      if (response.status === 200) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data);
        localStorage.setItem("userName", userName); // Store the username from the input field
        localStorage.setItem("userRole", selectedUserType); // Store the username from the input field
        // Close the login modal
        onClose();
        // Show a success toast
        toast("Login successful ✓", {
          position: "top-right",
          style: customToastStyle,
          progressStyle: customProgressBar,
        });
        if (selectedUserType === "Customer") {
          navigate("/customerDashboard"); // Redirect to customer dashboard
        } else if (selectedUserType === "Service Provider") {
          navigate("/serviceproviderdashboard"); // Redirect to service provider dashboard
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login Failed ❌");
    }
  };
  
  useEffect(() => {
    if (isSubmitted) {
      setUserName("");
      setPassword("");
      setSelectedUserType("");
    }
  }, [isSubmitted]); 
  return (
    <>
        <div className="modal-wrapper">      
        <div className="container">
          <div className="login-form">
            <form className="my-2 mx-2" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  className="form-control formControl"
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label ">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control formControl"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">User Type</label>
                <select
                  className="form-select formControl"
                  name="userType"
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value)}
                  required
                  style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "15px",
                  }}
                >
                  <option value="" disabled>
                    Select User Type
                  </option>
                  <option value="Customer">Customer</option>
                  <option value="Service Provider">Service Provider</option>
                </select>
              </div>
              <button type="submit" className="btn buttonLog my-2">
                Login
              </button>
            </form>
            <label className="account">
              Don't have an account?{" "}
              <button  className="btn btn-link-login mb-1"
                style={{ textDecoration: "none" }} onClick={onClose} to="/registration">
                Register 
              </button>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
