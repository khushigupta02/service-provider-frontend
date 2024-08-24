import React, { useEffect, useState } from "react";
import "../../style/header.css";
import CustomerSideBar from "../sidebar/CustomerSideBar";
import api from "../instance/Api";
import "../../style/table.css";
import "../../style/customerHistory.css";
import "../../style/btnStatus.css";

import CustomerHistoryPopUp from "./CustomerHistoryPopUp";
import { FaMoneyBillAlt, FaClock, FaCalendarAlt } from "react-icons/fa";

const CustomerHistory = () => {
  const [customerActivities, setCustomerActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(9); // Number of activities per page
  const [modalShow, setModalShow] = useState(false); // State for modal visibility
  const [selectedActivity, setSelectedActivity] = useState(null); // State for selected activity
  const username = localStorage.getItem("userName");
  const [error, setError] = useState(null);
  const formatTime = (dateTimeValue) => {
    if (!dateTimeValue) return "";

    const date = new Date(dateTimeValue);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes} ${amPm}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllCustomerHistory/${username}`
        );
        setCustomerActivities(response.data);
      } catch (error) {
        console.error("Error fetching customer activities:", error);
        setError(error.message); // Set the error state here
      }
    };

    fetchData();
  }, [username]);

  const getCardColor = (status) => {
    switch (status) {
      case "REQUEST_SENT":
        return "card-request-sent";
      case "ACCEPTED":
        return "card-accepted";
      case "DONE":
        return "card-done";
      case "REVIEW_DONE":
        return "card-review-done";
      case "REBOOK_REQUEST_SENT":
        return "card-rebook-request-sent";
      case "CANCEL_BY_USER":
        return "card-cancel-by-user";
      case "SCHEDULED":
        return "card-scheduled";
      case "RESCHEDULED":
        return "card-rescheduled";
      case "ONGOING":
        return "card-ongoing";
      case "CONFIRMED":
        return "card-confirmed";
      case "CANCELLED_BY_PROVIDER":
        return "card-cancelled-by-provider";
      default:
        return "";
    }
  };

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

  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = customerActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewFullDetail = (activity) => {
    setSelectedActivity(activity);
    setModalShow(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="container history-cont py-4 mt-3 mb-3">
            <h2 className="edit-heading mb-4">Service Interaction Record</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {currentActivities.map((activity, index) => (
                <div key={index} className="col history-card">
                  <div className={`card mt-1 ${getCardColor(activity.status)}`}>
                    <div className="card-body">
                      <div className="row mb-2">
                        <div className="col">
                          <h4 className="card-service-name-hist mt-2">
                            {activity.services.serviceName}
                          </h4>
                        </div>
                        <div className="col">
                          <button
                            className={`btn btn-status-history ${getStatusButtonColor(
                              activity.status
                            )}`}
                          >
                            {activity.status}
                          </button>
                        </div>
                      </div>
                      <div className="row  mt-3">
                        <div className="col">
                          <p>
                            <FaCalendarAlt />{" "}
                            {new Date(activity.updatedAt).toLocaleDateString()}{" "}
                            {/* Display only the date */}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            <FaMoneyBillAlt /> {activity.services.hourlyRate}₹
                            (hourly)
                          </p>
                        </div>
                      </div>
                      <div className="row mt-2 mb-3">
                        <div className="col">
                          <p>
                            <FaClock />{" "}
                            {formatTime(activity.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <p>
                        <b>Provider: </b>
                        {activity.services.serviceProvider.firstName}{" "}
                        {activity.services.serviceProvider.lastName}
                      </p>
                      <button
                        className="btn view-full-history-detail-btn mt-3 mb-2 py-1 px-3"
                        onClick={() => handleViewFullDetail(activity)}
                      >
                        Full Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <nav aria-label="Page navigation ">
              <ul className="pagination justify-content-center my-5">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className={`page-link ${
                      currentPage === 1 ? "disabled-button" : "prev-next-button"
                    }`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Back
                  </button>
                </li>
                {Array.from(
                  {
                    length: Math.ceil(
                      customerActivities.length / activitiesPerPage
                    ),
                  },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`page-link page-number ${
                          currentPage === i + 1 ? "active-page-number" : ""
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                <li
                  className={`page-item ${
                    currentPage ===
                    Math.ceil(customerActivities.length / activitiesPerPage)
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className={`page-link ${
                      currentPage ===
                      Math.ceil(customerActivities.length / activitiesPerPage)
                        ? "disabled-button"
                        : "prev-next-button"
                    }`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={
                      currentPage ===
                      Math.ceil(customerActivities.length / activitiesPerPage)
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <CustomerHistoryPopUp
          show={modalShow}
          onHide={closeModal}
          activity={selectedActivity}
          status={selectedActivity ? selectedActivity.status : ""}

        />
      </div>

    </div>
  );
};

export default CustomerHistory;
