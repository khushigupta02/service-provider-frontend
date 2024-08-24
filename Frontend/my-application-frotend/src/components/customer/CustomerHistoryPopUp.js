import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../style/customerHisoryPopup.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaBan,
  FaCalendarAlt,
  FaCheck,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaEnvelopeOpenText,
  FaFacebook,
  FaHistory,
  FaHouseUser,
  FaInstagram,
  FaLinkedin,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaRegCalendarCheck,
  FaRegCalendarPlus,
  FaRegClock,
  FaRegEnvelope,
  FaSpinner,
  FaStar,
  FaTimes,
  FaTwitter,
  FaUserCheck,
} from "react-icons/fa";
import images from "../../assets/images";

const CustomerHistoryPopUp = ({ show, status, onHide, activity }) => {
  const navigate = useNavigate();

  if (!activity) {
    return null;
  }
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
  const getHeaderClassName = () => {
    switch (status) {
      case "REQUEST_SENT":
        return "modal-request-sent";
      case "DONE":
        return "modal-done";
      case "REVIEW_DONE":
        return "modal-review-done";
      case "ACCEPTED":
        return "modal-accepted";
      case "REBOOK_REQUEST_SENT":
        return "modal-rebook-request-sent";
      case "CANCEL_BY_USER":
        return "modal-cancel-by-user";
      case "SCHEDULED":
        return "modal-scheduled";
      case "RESCHEDULED":
        return "modal-rescheduled";
      case "ONGOING":
        return "modal-ongoing";
      case "CONFIRMED":
        return "modal-confirmed";
      case "CANCELLED_BY_PROVIDER":
        return "modal-cancelled-buprovider";
      default:
        return "";
    }
  };
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
      case "CANCELLED_BY_PROVIDER":
        return "btn-cancelled-by-provider";
      case "SCHEDULED":
        return "btn-scheduled";
      case "RESCHEDULED":
        return "btn-rescheduled";
      case "ONGOING":
        return "btn-ongoing";
      case "CONFIRMED":
        return "btn-confirmed";
      default:
        return "";
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
  const redirectToProviderDetail = (providerId) => {
    navigate(`/serviceProviderDetail/${providerId}`);
  };
  const renderContentBasedOnStatus = () => {
    switch (status) {
      case "REQUEST_SENT":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "ACCEPTED":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "CONFIRMED":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "DONE":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "SCHEDULED":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "RESCHEDULED":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "ONGOING":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "REVIEW_DONE":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "REBOOK_REQUEST_SENT":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "CANCEL_BY_USER":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      case "CANCELLED_BY_PROVIDER":
        return <div className="conatiner-fluid">
           <div className="conatiner-fluid">
            <div className="row mb-3 ">
              <div className="col" style={{ float: "right" }}>
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    activity.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(activity.serviceProviderService.id)
                  }
                >
                  {activity.status}
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-6 col-md-6 col-sm-6 ">
                      <FaHouseUser className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Service Name -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.serviceName} {""}
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <FaDollarSign className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Price -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.services.hourlyRate} ₹ per hour{""}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaCalendarAlt className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Request sent on -
                        <span className="label-provider-info-value">
                          {" "}
                          {formatDateTime(activity.updatedAt)}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <FaHistory className="service-req-icon" />{" "}
                      <label className="label-provider-info">
                        Total Time Taken -
                        <span className="label-provider-info-value">
                          {" "}
                          {activity.totalTimeTaken
                            ? formatDateTime(activity.totalTimeTaken)
                            : "0"}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="customer-info" style={{ float: "right" }}>
                       
                        <span className="mx-2 customer-name">
                          {activity.services.serviceProvider.userName}
                        </span>
                        <div className="customer-initials">
                          {activity.services.serviceProvider.firstName.charAt(
                            0
                          ) +
                            activity.services.serviceProvider.lastName.charAt(
                              0
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="status-icon-bottom mt-3 ">
                  <span
                    className={`status-icon ${renderStatusIconColor(
                      activity.status
                    )}`}
                  >
                    {renderStatusIcon(activity.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>;
      default:
        return (
          <div>
            <p>No additional information available for this status.</p>
          </div>
        );
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      className={`modal ${status}-modal`}
      dialogClassName="custom-modal-history"
    >
      <Modal.Header className={getHeaderClassName()} closeButton>
        <Modal.Title className="modal-title-booking-details">
          Overview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderContentBasedOnStatus()}</Modal.Body>
      <Modal.Footer>
        <Button
          className={getHeaderClassName()}
          style={{
            fontFamily: "Noto Sans, sans-serif",
            fontSize: "13px",
            fontWeight: "600",
            border: "none",
            borderRadius: "22px",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerHistoryPopUp;
