import React, { useState, useEffect } from "react";
import "../../style/customerSideBar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome, FaToolbox, FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import images from "../../assets/images";

const CustomerSideBar = () => {
  const username = localStorage.getItem("userName");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!username);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/findByUsername/${username}`
        );
        setUser(response.data);
        console.log("User Detail : ", response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleLogout = () => {
    console.log("Logging out...");
    setLoggedIn(false);
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (token && userName && userRole)  {
      console.log("Removing token and username from localStorage...");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");

      console.log("Redirecting to home page...");
      window.location.href = "/";
      toast("Customer Logout successful ✓");
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleCollapse}>
          <span className="hamburger-icon">&#9776;</span>
        </button>
      </div>
      <div className={`sidebar-content ${isCollapsed ? "collapsed" : ""}`}>
        <ul className="sidebar-nav">
          {username && (
            <div className="dashboard-header">
              <li className="sidebar-nav-item dashboard-header-item ">
                <div className="dropdown">
                  <button
                    className="sidebar-nav-link"
                    onClick={toggleDropdown}
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    <div
                      className="user-icon-container"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <img
                        src={images.avtar}
                        alt="User Icon"
                        className="user-icon"
                      />
                      <span className="dashboard-username py-2">
                        {username}
                      </span>
                      <span className="dropdown-arrow py-1 mx-1"> &#9662;</span>
                    </div>
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <Link
                        className=" dropdown-item mx-auto"
                        to="/customerEditProfile"
                      >
                        Edit Profile
                      </Link>

                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </li>
            </div>
          )}

          <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to="/customerDashboard ">
              <FaHome className="sidebar-icon mx-2" />
              Dashboard
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to="/customerRecentActivity">
              <FaToolbox className="sidebar-icon mx-2" />
              Recent Booking
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to="/customerBookingOverview ">
              <FaToolbox className="sidebar-icon mx-2" />
              Booking Overview            
              </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to="/customerAllService">
              <FaToolbox className="sidebar-icon mx-2" />
              Book Service
            </Link>
          </li>
       
         
          <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to="/customerHistory">
              <FaToolbox className="sidebar-icon mx-2" />
              Booking History
            </Link>
          </li>
          
          
          {/* <li className="sidebar-nav-item">
            <Link className="sidebar-nav-link" to="/about">
              <FaInfoCircle className="sidebar-icon mx-2" />
              About Us
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default CustomerSideBar;
