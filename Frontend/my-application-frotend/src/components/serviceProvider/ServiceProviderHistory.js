import api from "../instance/Api";
import ServiceProviderSideBar from "../sidebar/ServiceProviderSideBar";
import React, { useEffect, useState } from "react";
import "../../style/serviceProviderHistory.css";
import "../../style/statusIconColor.css";
import "../../style/btnStatus.css";

import "../../style/table.css";
import { useNavigate } from "react-router-dom";

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

const ServiceProviderHistory = () => {
  const username = localStorage.getItem("userName");
  const [providerActivities, setProviderActivities] = useState([]);
  const [error, setError] = useState(null);
  const [customerId, setCustomerID] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllProviderHistoryByUsername/${username}`
        );
        setProviderActivities(response.data);
        setTotalRecords(response.data.length);
        setProviderActivities(response.data);
        setTotalRecords(response.data.length);
        setTotalServices(response.data.length);
        if (
          response.data.length > 0 &&
          response.data[0].customer &&
          response.data[0].customer.id
        ) {
          setCustomerID(response.data[0].customer.id);
        }
        if (response.data.customer && response.data.customer.id) {
          setCustomerID(response.data.customer.id);
        }
      } catch (error) {
        console.error("Error fetching provider activities:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [username]);
  const redirectToCustomerDetail = (customerId) => {
    navigate(`/customerDetail/${customerId}`);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);
  const servicesPerPage = 10;
  const totalPages = Math.ceil(totalServices / servicesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices =
    indexOfLastService > providerActivities.length
      ? providerActivities.slice(indexOfFirstService)
      : providerActivities.slice(indexOfFirstService, indexOfLastService);

  // ... (rest of the code)
  const renderStatusIcon = (status) => {
    switch (status) {
      case "DONE":
        return <FaUserCheck className="status-icon done" />;
      case "REVIEW_DONE":
        return <FaStar className="status-icon review-done" />;
      case "REQUEST_SENT":
      case "REBOOK_REQUEST_SENT":
        return <FaRegClock className="status-icon request-sent" />;
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
        return <FaBan className="status-icon cancelled-by-provider" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const renderStatusIconColor = (status) => {
    switch (status) {
      case "DONE":
        return "status-icon-color-done";
      case "REVIEW_DONE":
        return "status-icon-color-review-done";
      case "REBOOK_REQUEST_SENT":
        return "status-icon-color-rebook-request-sent";
      case "REQUEST_SENT":
        return "status-icon-color-request-sent";
      case "CANCEL_BY_USER":
        return "status-icon-color-cancel-by-user";
      case "ACCEPTED":
        return "status-icon-color-accepted";
      case "SCHEDULED":
        return "status-icon-color-scheduled";
      case "RESCHEDULED":
        return "status-icon-color-rescheduled";
      case "ONGOING":
        return "status-icon-color-ongoing";
      case "CONFIRMED":
        return "status-icon-color-confirmed";
      case "CANCELLED_BY_PROVIDER":
        return "status-icon-color-cancelled-buprovider";
      default:
        return "";
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <ServiceProviderSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="container history-cont py-4 mb-3">
            <h2 className="edit-heading mb-4">Activity Log</h2>
            {error && <p>Error: {error}</p>}
            <h4 className="count-data">
              Total Records : <spann className="count"> {totalRecords}</spann>
            </h4>
            <table className="table-data my-4">
              <thead>
                <tr className="table-heading">
                  <th>Icon</th>
                  <th>Modified At</th>
                  <th>Customer</th>
                  <th>Service Name</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {providerActivities
                  .slice(indexOfFirstService, indexOfLastService)
                  .map((activity) => (
                    <tr key={activity.id}>
                      <td
                        className={`status-icon ${renderStatusIconColor(
                          activity.status
                        )}`}
                      >
                        {renderStatusIcon(activity.status)}
                      </td>
                      <td>
                        <p className="mt-2 activity-date">
                          {formatDate(activity.updatedAt)}
                          <br />
                          <span className="activity-time">
                            {formatTime(activity.updatedAt)}
                          </span>
                        </p>
                      </td>
                      <td
                        onClick={() =>
                          activity.customer && activity.customer.id
                            ? redirectToCustomerDetail(activity.customer.id)
                            : null
                        }
                        className="customer-detail-activity"
                      >
                        {activity.customer ? (
                          <div className="customer-info">
                            <div className="customer-initials">
                              {activity.customer.firstName.charAt(0) +
                                activity.customer.lastName.charAt(0)}
                            </div>
                            <span className="mx-2 customer-name">
                              {activity.customer.userName}
                            </span>
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="service-name-activity">
                        {activity.services.serviceName}
                      </td>
                      <td>
                        {activity.totalTimeTaken
                          ? activity.totalTimeTaken
                          : "-"}
                      </td>
                      <td>
                        <button className={`status-btn-provider-activity   `}>
                          {activity.status}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="btn sortButton mx-3 px-3"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn sortButton px-4"
                onClick={handleNextPage}
                disabled={indexOfLastService >= totalServices}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderHistory;
