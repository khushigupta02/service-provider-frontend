import React, { useEffect, useState } from "react";
import "../../style/header.css";
import CustomerSideBar from "../sidebar/CustomerSideBar";
import api from "../instance/Api";
import "../../style/customerRecentActivity.css";
import {
  FaUserCheck,
  FaClock,
  FaStar,
  FaRegClock,
  FaTimes,
  FaCheckCircle,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaSpinner,
  FaCheck,
  FaBan,
} from "react-icons/fa";
import "../../style/btnStatus.css";
import "../../style/popUpModal.css";

import { Link } from "react-router-dom";
import SingleBookingDetail from "./SingleBookingDetail"; // Import the modal component

const CustomerRecentActivity = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State to track the selected booking ID

  const username = localStorage.getItem("userName");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllBookingDetailsByUsername/${username}`
        );
        setBookingDetails(response.data);
      } catch (error) {
        console.error("Error fetching Booking Details:", error);
        setError(error.message); // Set the error state here

      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };   
    }, [username]);

  const renderStatusIcon = (status) => {
    switch (status) {
      case "DONE":
        return <FaUserCheck className="status-icon done" />;
      case "REVIEW_DONE":
        return <FaStar className="status-icon review-done" />;
      case "REQUEST_SENT":
        return <FaRegClock className="status-icon request-sent" />;
      case "REBOOK_REQUEST_SENT":
        return <FaRegClock className="status-icon rebook-request-sent" />;
      case "CANCEL_BY_USER":
        return <FaTimes className="status-icon cancel-by-user" />;
      case "ACCEPTED":
        return <FaCheckCircle className="status-icon accepted" />;
      case "SCHEDULED":
        return <FaRegCalendarCheck className="status-icon scheduled" />;
      case "RESCHEDULED":
        return <FaRegCalendarPlus className="status-icon rescheduled" />;
      case "ONGOING":
        return <FaSpinner className="status-icon ongoing" />;
      case "CONFIRMED":
        return <FaCheck className="status-icon confirmed" />;
      case "CANCELLED_BY_PROVIDER":
        return <FaBan className="status-icon cancelled-by-provider" />; //
      default:
        return <FaClock className="status-icon pending" />;
    }
  };
  const renderStatusIconBackground = (status) => {
    switch (status) {
      case "DONE":
        return "status-icon-done";
      case "REVIEW_DONE":
        return "status-icon-review-done";
      case "REBOOK_REQUEST_SENT":
        return "status-icon-rebook-request-sent";
      case "REQUEST_SENT":
        return "status-icon-request-sent";
      case "CANCEL_BY_USER":
        return "status-icon-cancel-by-user";
      case "ACCEPTED":
        return "status-icon-accepted";
      case "SCHEDULED":
        return "status-icon-scheduled";
      case "RESCHEDULED":
        return "status-icon-rescheduled";
      case "ONGOING":
        return "status-icon-ongoing";
      case "CONFIRMED":
        return "status-icon-confirmed";
      case "CANCELLED_BY_PROVIDER":
        return "status-icon-cancelled-buprovider";
      default:
        return "";
    }
  };
  const renderStatusButton = (status) => {
    switch (status) {
      case "REQUEST_SENT":
        return "btn-request-sent";
      case "DONE":
        return "btn-done";
      case "REVIEW_DONE":
        return "btn-review-done";
      case "REBOOK_REQUEST_SENT":
        return "btn-rebook-request-sent";
      case "CANCEL_BY_USER":
        return "btn-cancel-by-user";
      case "ACCEPTED":
        return "btn-accepted";
      case "SCHEDULED":
        return "btn-scheduled";
      case "RESCHEDULED":
        return "btn-rescheduled";
      case "ONGOING":
        return "btn-ongoing";
      case "CONFIRMED":
        return "btn-confirmed";
      case "CANCELLED_BY_PROVIDER":
        return "btn-cancelled-by-provider";
      default:
        return "";
    }
  };
  const renderBookingMessage = (status, id) => {
    switch (status) {
      case "DONE":
        return `is completed`;
      case "REVIEW_DONE":
        return `review done`;
        case "REQUEST_SENT":
          return "request has been sent and is pending approval";
      case "REBOOK_REQUEST_SENT":
        return "rebook request has been sent and is pending approval";
      case "CANCEL_BY_USER":
        return "has been canceled by the user";
      case "ACCEPTED":
        return "has been accepted by the service provider";
      case "SCHEDULED":
        return "is scheduled by service provider";
      case "RESCHEDULED":
        return "has been rescheduled by the service provider";
      case "ONGOING":
        return "is currently ongoing";
      case "CONFIRMED":
        return "request is confirmed by service provider";
      case "CANCELLED_BY_PROVIDER":
        return "is cancelled by provider";
      default:
        return `is currently in progress`;
    }
  };
  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleBookingIdClick = (id) => {
    setSelectedBookingId(id); 
    localStorage.setItem("bookingId", id); 
  };

  const handleCloseModal = () => {
    setSelectedBookingId(null);
    localStorage.removeItem("bookingId"); 

  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="container history-cont py-4 mt-3 mb-3">
            <h2 className="edit-heading mb-4">Recent Booking</h2>
            <div className="recent-activity-box">
              {bookingDetails.map((booking) => (
                <div
                  key={booking.id}
                  className="row mx-2 my-2 mb-4 pb-4 activity-item"
                  onClick={() => handleBookingIdClick(booking.id)}
                >
                  <div
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      booking.status
                    )}`}
                  >
                    {renderStatusIcon(booking.status)}
                  </div>
                  <div className="col mx-2 activity-info">
                    <p className="my-2">
                      Booking id
                      <Link
                        style={{ textDecoration: "none" }}
                        onClick={() => handleBookingIdClick(booking.id)} // Call handleBookingIdClick on click
                      >
                        {" "}
                        #{booking.id}
                      </Link>{" "}
                      {renderBookingMessage(booking.status, booking.id)}
                      <span className="acitvities-list-status">
                        <buttton
                          className={`col-auto mx-2  status-btn-recent-activity ${renderStatusButton(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </buttton>
                      </span>
                    </p>
                    <p>{formatDateTime(booking.updatedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedBookingId && (
        <SingleBookingDetail
          bookingId={selectedBookingId}
          onClose={handleCloseModal}
          status={
            bookingDetails.find((booking) => booking.id === selectedBookingId)
              ?.status
          }
          bookingDetails={bookingDetails.find(
            (booking) => booking.id === selectedBookingId
          )}
        />
      )}
    </div>
  );
};

export default CustomerRecentActivity;
