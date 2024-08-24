import React, { useEffect, useState } from "react";
import api from "../instance/Api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../style/serviceProviderBookingDetails.css";
import "../../style/btnStatus.css";

import images from "../../assets/images";
ChartJS.register(ArcElement, Tooltip, Legend);
const ServiceProviderBookingStatistics = () => {
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalReviewed, setTotalReviewed] = useState(0);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [bookings, setBookings] = useState(null);

  const username = localStorage.getItem("userName");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllProviderHistoryByUsername/${username}`
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
          `http://localhost:8080/viewReviewOfProvider/${username}`
        );
        setTotalReviewed(response.data.length);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
  }, [username]);
  const data = {
    labels: ["Ongoing", "Completed", "Reviewed"],
    datasets: [
      {
        label: "Count",
        data: [totalOngoing, totalCompleted, totalReviewed],
        backgroundColor: ["#9084F3", "#2AC66F", "#EF7C7D"],
        hoverOffset: 4,
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewBookingByServiceProviderUsername/${username}`
        );
        setBookings(response.data);
        const bookings = response.data;

        const ongoingCount = bookings.filter(
          (booking) =>
            booking.status === "ACCEPTED" ||
            booking.status === "REQUEST_SENT" ||
            booking.status === "REBOOK_REQUEST_SENT" ||
            booking.status === "SCHEDULED" ||
            booking.status === "RESCHEDULED" ||
            booking.status === "ONGOING" ||
            booking.status === "CONFIRMED"
        ).length;
        setTotalOngoing(ongoingCount);
      } catch (error) {
        console.error("Error fetching all customers:", error);
      }
    };

    fetchData();
  }, [username]);
  const getStatusButtonColor = (status) => {
    switch (status) {
      case "REQUEST_SENT":
        return "btn-request-sent";
      case "ACCEPTED":
        return "btn-accepted";
      case "DONE":
        return "btn-done";
      case "REVIEW_DONE":
        return "btn-review-done";
      case "REBOOK_REQUEST_SENT":
        return "btn-rebook-request-sent";
      case "CANCEL_BY_USER":
        return "btn-cancel-by-user";
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

  return (
    <div className="container-fluid dashboard-header my-4 py-3 px-4">
      <h4 className="heading-statistic">Booking Summary</h4>
      <p className="heading-latest mt-3 ">Newest Notification</p>
      <div className="row mt-3">
        <div className="col-lg-8 col-md-8 col-sm-8">
          <div className="booking-notifiaction">
            {bookings !== null &&
              bookings.slice(-4).map((booking, index) => (
                <div className="row pb-4 mb-3 mx-3 mt-3 review-box" key={index}>
                  <div className="col-lg-1 col-md-1 col-sm-1">
                    <div
                      className="user-icon-container my-1"
                      style={{
                        backgroundColor: "transparent",
                        marginLeft: "-20px",
                      }}
                    >
                      <img
                        src={images.avtar}
                        alt="User Icon"
                        className="user-icon"
                      />
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <p className="customer-name-in-dashboard">
                      {booking.customer.userName}
                      <span className="status-text">
                        {" "}
                        - booked at {formatDateTime(booking.bookedAt)}{" "}
                      </span>
                    </p>
                    <p className="review-para">{booking.comments}</p>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="rating-in-dashboard">
                      <button
                        className={`btn btn-status-history rating-in-dashboard ${getStatusButtonColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
          <div
            className="booking-summary pb-3"
            style={{ width: "250px", height: "250px" }}
          >
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderBookingStatistics;
