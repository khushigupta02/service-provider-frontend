import React, { useEffect, useState } from "react";
import "../../style/header.css";
import ServiceProviderSideBar from "../sidebar/ServiceProviderSideBar";
import axios from "axios";
import api from "../instance/Api";
import "../../style/providerNotification.css";
import "../../style/btnStatus.css";
import { useNavigate } from "react-router-dom";

import { FaRegClock , FaTimes} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ServiceProviderNotification = () => {
  const [bookings, setBookings] = useState([]);
  const username = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [selectedBookingId, setSelectedBookingId] = useState(null); // State to store the selected booking ID


  // Function to fetch bookings
  const fetchBookings = async () => {
    try {
      const response = await api.get(
        `http://localhost:8080/viewBookingByServiceProviderUsername/${username}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => {
      clearInterval(interval);
    };  
  }, []);

  // Function to format date and time
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  // Function to handle updating status
  const handleUpdateStatus = async (bookingId) => {
    try {
      const response = await api.post(
        `http://localhost:8080/updateBookedServiceStatus/${bookingId}`,
        { status: "your_status_here", comments: "your_comments_here" }
      );
      console.log("Status updated successfully:", response.data);
      // After updating the status, fetch updated bookings
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await api.post(
        `http://localhost:8080/updateBookedServiceStatus/${bookingId}`,
        {
          status: "CANCELLED_BY_PROVIDER",
          comments: "Service request is cancelled by service provider",
        }
      );
      toast("Booking cancelled successfully:", response.data);
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
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
  const redirectToServiceRequestFullDetail = (bookingId) => {
    // Redirect to the service detail page with the boo ID
    localStorage.setItem('bookingId', bookingId);

    navigate(`/serrviceRequest/${bookingId}`);

  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <ServiceProviderSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="container notification-cont px-2 py-3 mt-3 mb-3">
            <h2 className="edit-heading mb-4">Notifications</h2>
            <div className="notification-box ">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="notification-item "
                 
                >
                  <div className=" px-3">
                    <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                    <FaTimes className="cancel-icon mt-4" onClick={() => handleCancelBooking(booking.id)} />
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-7 content-notification"  onClick={() => redirectToServiceRequestFullDetail(booking.id)}>
                        <button
                          className={`btn btn-username-notification ${renderStatusButton(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </button>

                        <p className="mt-2 mb-2 notifiction-comment">
                          {booking.comments} -{" "}
                          <span className="notification-serviceName">
                            {booking.serviceProviderService.service.serviceName}
                          </span>
                        </p>
                        <p className="notification-customer-name">
                          {booking.customer.firstName}{" "}
                          {booking.customer.lastName}
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4">
                        <p className="date-show-request">
                          <FaRegClock /> {formatDateTime(booking.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderNotification;
