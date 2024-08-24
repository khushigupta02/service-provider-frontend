import React, { useEffect, useState } from "react";
import "../../style/dashboard.css";
import "../../style/dashboardStatistics.css";

import {
  FaChartLine,
  FaClipboardList,
  FaHouseUser,
  FaStar,
  FaUserPlus,
} from "react-icons/fa";
import api from "../instance/Api";
import axios from "axios";

const DashboardProviderStatistics = () => {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalBookedService, setTotalBookedService] = useState(0);

  const username = localStorage.getItem("userName");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`http://localhost:8080/viewAllCustomer`);
        setTotalCustomer(response.data.length);
      } catch (error) {
        console.error("Error fetching all customers:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/viewAllService`);
        setTotalService(response.data.length);
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
          `http://localhost:8080/viewBookingByServiceProviderUsername/${username}`
        );
        setTotalBookedService(response.data.length);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="container-fluid dashboard-header my-4 py-3 px-4">
      <h4 className="heading-statistic">Analytics</h4>
      <div className="statistics-section">
        <div className="stat-item">
          <div className="icon total-users-icon">
            <span className="stats-icon">
              <FaUserPlus />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalCustomer} +</span>
            <span className="stat-label">Total Customers</span>
          </div>
        </div>

        <div className="stat-item">
          <div className="icon total-service">
            <span className="stats-icon">
              <FaHouseUser />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalService} +</span>
            <span className="stat-label">Total Service</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon total-request">
            <span className="stats-icon">
              <FaClipboardList />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalBookedService} +</span>
            <span className="stat-label">Booked Service</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon total-completion">
            <span className="stats-icon">
              <FaChartLine />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">100%</span>
            <span className="stat-label">Completion Rate</span>
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
            <span className="stat-label">Customer Satisfaction</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardProviderStatistics;