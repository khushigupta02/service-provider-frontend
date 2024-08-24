import React, { useEffect, useState } from "react";
import "../../style/dashboard.css";
import "../../style/dashboardStatistics.css";
import "../../style/serviceProviderBookingDetails.css";
import {
  FaChartLine,
  FaClipboardList,
  FaHouseUser,
  FaStar,
  FaUserPlus,
  FaRegClock,
  FaUserCheck,
  FaSpinner,
  FaArrowRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import api from "../instance/Api";
const CustomerBookingDetails = () => {
    const [totalBookedService, setTotalBookedService] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalOngoing, setTotalOngoing] = useState(0);
    const [totalRequestSent, setTotalRequestSent] = useState(0);
    const [totalReviewed, setTotalReviewed] = useState(0);
    const navigate = useNavigate();

  const username = localStorage.getItem("userName");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllBookingDetailsByUsername/${username}`
        );
        setTotalBookedService(response.data.length);
        const bookings = response.data;
        const requestSentCount = bookings.filter(
          (booking) =>
            booking.status === "REQUEST_SENT" ||
            booking.status === "REBOOK_REQUEST_SENT" 
           
        ).length;
        setTotalRequestSent(requestSentCount);
        const ongoingCount = bookings.filter(
            (booking) =>
            booking.status === "ACCEPTED" ||
            booking.status === "SCHEDULED" ||
            booking.status === "RESCHEDULED" ||
            booking.status === "ONGOING" ||
            booking.status === "CONFIRMED"
             
          ).length;
          setTotalOngoing(ongoingCount);
          
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
    
  }, [username]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllCustomerHistory/${username}`
        );
        const bookings = response.data;
    
        const completedCount = bookings.filter(
          (booking) => booking.status === "DONE"
        ).length;
       
        setTotalCompleted(completedCount);
      } catch (error) {
        console.error("Error fetching all customers:", error);
      }
    };

    fetchData();
  
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewReviewByCustomer/${username}`
        );
        setTotalReviewed(response.data.length);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
  
  }, [username]);
  const redirectToAppliedService = () => {
    navigate(`/customerRecentActivity`);
  };
  return (
    <div className="container-fluid dashboard-header my-4 py-3 px-4">
      <h4 className="heading-statistic">Analytics</h4>
      <div className="statistics-section" onClick={() =>
                          redirectToAppliedService()
                        }>
        <div className="stat-item">
          <div className="icon total-request">
            <span className="stats-icon ">
              <FaHouseUser />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalBookedService} </span>
            <span className="stat-label">Total Booked Service </span>
          </div>
        </div>

        <div className="stat-item">
          <div className="icon total-service">
            <span className="stats-icon">
              <FaRegClock />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalRequestSent}</span>
            <span className="stat-label">Request Sent </span>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon  total-users-icon">
            <span className="stats-icon">
              <FaSpinner />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalOngoing}</span>
            <span className="stat-label">Ongoing </span>
          </div>
        </div>
        <div className="stat-item">
          <div className="icon  total-completion">
            <span className="stats-icon">
              <FaUserCheck />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalCompleted}</span>
            <span className="stat-label">Completed </span>
          </div>
        </div>
       
        <div className="stat-item">
          <div className="icon total-customer-rating">
            <span className="stats-icon">
              <FaStar />
            </span>
          </div>
          <div className="stats-content">
            <span className="stat-value">{totalReviewed}</span>
            <span className="stat-label">Reviewd</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingDetails;
