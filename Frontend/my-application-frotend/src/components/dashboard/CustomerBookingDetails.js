import React, { useEffect, useState } from "react";
import "../../style/dashboard.css";
import "../../style/dashboardStatistics.css";
import "../../style/serviceProviderBookingDetails.css";
import { useNavigate } from "react-router-dom";

import {
  FaChartLine,
  FaClipboardList,
  FaHouseUser,
  FaStar,
  FaUserPlus,
  FaRegClock,
  FaUserCheck,
  FaSpinner,
} from "react-icons/fa";
import api from "../instance/Api";
import axios from "axios";

const CustomerBookingDetails = () => {
  const [totalServiceCount, setTotalServiceCount] = useState(0);
  const [totalProviderCount, setTotalProviderCount] = useState(0);
  const [totalBookedService, setTotalBookedService] = useState(0);
  const navigate = useNavigate();

  const username = localStorage.getItem("userName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/viewAllService`
        );
        setTotalServiceCount(response.data.length);
      } catch (error) {
        console.error("Error fetching all services:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/viewAllProvider`
        );
        setTotalProviderCount(response.data.length);
      } catch (error) {
        console.error("Error fetching all services:", error);
      }
    };

    fetchData();
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllBookingDetailsByUsername/${username}`
        );
        setTotalBookedService(response.data.length);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
    
  }, [username]);
  const redirectToServiceDetail = () => {
    navigate(`/customerAllService`);
  };
  const redirectToAppliedService = () => {
    navigate(`/customerRecentActivity`);
  };

  return (
    <div className="container-fluid dashboard-header my-4 py-3 px-4">
      <h4 className="heading-statistic">Analytics</h4>
      <div className="statistics-section">
        <div className="stat-item" onClick={() => redirectToServiceDetail()}>
          <div className="icon total-request">
            <span className="stats-icon ">
              <FaHouseUser />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalServiceCount} +</span>
            <span className="stat-label">Total Service </span>
          </div>
        </div>

        <div className="stat-item" onClick={() => redirectToServiceDetail()}>
          <div className="icon  total-users-icon">
            <span className="stats-icon">
              <FaSpinner />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalProviderCount} +</span>
            <span className="stat-label">Total Provider </span>
          </div>
        </div>
        <div className="stat-item" onClick={() => redirectToAppliedService()}>
          <div className="icon total-service">
            <span className="stats-icon">
              <FaRegClock />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalBookedService} </span>
            <span className="stat-label">Applied Service </span>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon total-completion">
            <span className="stats-icon">
              <FaChartLine />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">90%</span>
            <span className="stat-label">Provider Performance</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="icon total-customer-rating">
            <span className="stats-icon">
              <FaStar />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">4.5/5</span>
            <span className="stat-label">Trusted Provider</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingDetails;
