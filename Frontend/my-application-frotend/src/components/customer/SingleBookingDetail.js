import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../style/popUpModal.css";
import "../../style/btnStatus.css";
import "../../style/singleBookingDetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaHouseUser,
  FaRegClock,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHistory,
  FaDollarSign,
  FaEnvelopeOpenText,
  FaBell,
} from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import {
  FaUserCheck,
  FaStar,
  FaTimes,
  FaCheckCircle,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaSpinner,
  FaCheck,
  FaBan,
} from "react-icons/fa";
import images from "../../assets/images";
import FeedbackFormModal from "../service/servicePage/FeedbackFormModal";
import api from "../instance/Api";
const SingleBookingDetail = ({
  bookingId,
  onClose,
  status,
  bookingDetails,
}) => {
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [serviceBookingId, setServiceBookingId] = useState(null);
  const username = localStorage.getItem("userName");

  const openModal = () => {
    console.log("Clickkkk");
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
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
  const formatTime = (dateTimeValue) => {
    if (!dateTimeValue) return "";

    const date = new Date(dateTimeValue);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes} ${amPm}`;
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
  const formatScheduledDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };
  const redirectToServiceDetail = (id) => {
    console.log("Redirecting to service detail page with ID:", id);
    if (id) {
      navigate(`/serviceDetail/${id}`);
    } else {
      console.error("Invalid service ID:", id);
    }
  };
  const redirectToProviderDetail = (providerId) => {
    navigate(`/serviceProviderDetail/${providerId}`);
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
  const renderContentBasedOnStatus = () => {
    switch (status) {
      case "REQUEST_SENT":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your request is pending approval. Please check back soon.
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "ACCEPTED":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your request has been accepted and is awaiting final
                      confirmation. Please await confirmation.
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request updated On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "CONFIRMED":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your request has been confirmed and we are currently
                      checking for available slots to schedule the service.
                      Please await scheduling.
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request updated On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "DONE":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your requested service has been completed. We value your
                      feedback and would appreciate if you could take a moment
                      to leave a review.
                    </p>

                    <p className="service-req-title  mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        booked At -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title  mt-1">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        completed At -
                      </span>
                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>
                    <h4 className="information-heading mt-4">
                      Scheduled Date & Time{" "}
                    </h4>
                    <div className="row mt-2 pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduled At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(
                            bookingDetails.scheduledDateTime
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          completed At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaRegClock className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          total time taken -
                        </span>
                        <span className="service-req-title mx-1">
                          {bookingDetails.totalTimeTaken}
                        </span>
                      </div>
                    </div>
                    <button
                      className={`${getHeaderClassName()} mt-2   btn review-btn`}
                      style={{
                        fontFamily: "Noto Sans, sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        border: "none",
                        borderRadius: "22px",
                        color: "white",
                      }}
                      onClick={openModal}
                    >
                      Give Review
                    </button>
                    {showModal && (
                      <FeedbackFormModal
                        show={showModal}
                        onClose={closeModal}
                        bookingId={localStorage.getItem("bookingId")}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "SCHEDULED":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your requested service has been scheduled. Please await
                      the service provider's arrival at the address provided.
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="service-req-title mx-1 ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request updated On -
                      </span>

                      <span className="service-req-title mx-1 ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaBell className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        message from provider -
                      </span>

                      <span
                        className="service-req-title mx-1 mt-2"
                        style={{ color: "red", fontWeight: "500" }}
                      >
                        {bookingDetails.additionalMessage}
                      </span>
                    </p>
                    <h4 className="information-heading mt-4">
                      Scheduled Date & Time{" "}
                    </h4>
                    <div className="row mt-2 pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduling At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(
                            bookingDetails.scheduledDateTime
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          completing At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaClock className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduling time -{" "}
                          <span className="service-req-title ">
                            {formatTime(bookingDetails.scheduledDateTime)} -
                          </span>
                        </span>
                        <span className="service-req-title ">
                          {formatTime(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaHistory className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          estimated duration -
                        </span>
                        <span className="service-req-title mx-1">
                          {bookingDetails.totalTimeTaken}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "RESCHEDULED":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your requested service has been rescheduled due to some
                      service provider availability issues. Please await the
                      service provider's arrival at the provided address.
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="service-req-title mx-1 ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request updated On -
                      </span>

                      <span className="service-req-title mx-1 ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaBell className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        message from provider -
                      </span>

                      <span
                        className="service-req-title mx-1 mt-2"
                        style={{ color: "red", fontWeight: "500" }}
                      >
                        {bookingDetails.additionalMessage}
                      </span>
                    </p>
                    <h4 className="information-heading mt-4">
                      Scheduled Date & Time{" "}
                    </h4>
                    <div className="row mt-2 pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduling At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(
                            bookingDetails.scheduledDateTime
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          completing At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaClock className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduling time -{" "}
                          <span className="service-req-title ">
                            {formatTime(bookingDetails.scheduledDateTime)} -
                          </span>
                        </span>
                        <span className="service-req-title ">
                          {formatTime(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaHistory className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          estimated duration -
                        </span>
                        <span className="service-req-title mx-1">
                          {bookingDetails.totalTimeTaken}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "ONGOING":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      The service provider is currently at your provided
                      address, and your requested service is in progress. Please
                      await its completion
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="service-req-title mx-1 ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request updated On -
                      </span>

                      <span className="service-req-title mx-1 ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>

                    <h4 className="information-heading mt-4">
                      Scheduled Date & Time{" "}
                    </h4>
                    <div className="row mt-2 pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduling At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(
                            bookingDetails.scheduledDateTime
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          completing At -
                        </span>
                        <span className="service-req-title mx-1">
                          {formatScheduledDate(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row  pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaClock className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          scheduling time -{" "}
                          <span className="service-req-title ">
                            {formatTime(bookingDetails.scheduledDateTime)} -
                          </span>
                        </span>
                        <span className="service-req-title ">
                          {formatTime(bookingDetails.finishedDateTime)}
                        </span>
                      </div>
                    </div>
                    <div className="row pb-1">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <FaHistory className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          estimated duration -
                        </span>
                        <span className="service-req-title mx-1">
                          {bookingDetails.totalTimeTaken}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "REVIEW_DONE":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      This request service has been reviewed by the customer.
                      Would you like to rebook the service?
                    </p>

                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        last requested On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                  </div>
                  <Link
                  className={`${getHeaderClassName()} mt-2   btn review-btn`}
                  style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: "22px",
                    color: "white",
                  }}
                  to="/customerAllService"
                >
                  Rebook
                </Link>
                </div>
                
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "REBOOK_REQUEST_SENT":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                      Your rebook request is pending approval. Please check back soon.
                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "CANCEL_BY_USER":
        return (
          <div className="conatiner-fluid">
            <div className="row mb-3">
              <div className="col">
                <button
                  className={`btn btn-status-history ${getStatusButtonColor(
                    bookingDetails.status
                  )}`}
                  style={{ float: "left" }}
                  onClick={() =>
                    redirectToProviderDetail(
                      bookingDetails.serviceProviderService.id
                    )
                  }
                >
                  {bookingDetails.status}
                </button>
              </div>
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 ">
                <div className="service-provider-info  py-3 px-3">
                  <h4 className="information-heading">Summary </h4>
                  <div className="row mt-2 pb-1">
                    <div className="col-lg-3 col-md-3 col-sm-3 ">
                      <FaHouseUser className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .serviceName
                        }
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4">
                      <FaDollarSign className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {
                          bookingDetails.serviceProviderService.service
                            .hourlyRate
                        }{" "}
                        ₹ per hour
                      </span>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="booking-details mt-3 mb-2">
                    <p className="notifaction-alert">
                      {bookingDetails.comments}
                    </p>
                    <p className="service-req-title mt-1 message-submit">
                    Your request has been cancelled by your approval. Please check back soon if you want to rebook.                    </p>
                    <p className="service-req-title  mt-4">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request sent On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.bookedAt)}
                      </span>
                    </p>
                    <p className="service-req-title  mt-2">
                      <FaCalendarAlt className="service-req-icon" />
                      <span className="service-req-title mx-1 mt-2">
                        request cancelled On -
                      </span>

                      <span className="mx-1  ">
                        {formatDateTime(bookingDetails.updatedAt)}
                      </span>
                    </p>
                  </div>
                  <Link
                  className={`${getHeaderClassName()} mt-2   btn review-btn`}
                  style={{
                    fontFamily: "Noto Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: "22px",
                    color: "white",
                  }}
                  to="/customerAllService"
                >
                  Rebook
                </Link>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-5 ">
                <div className="service-provider-info pt-3 pb-3 px-3">
                  <h4 className="information-heading">
                    Provider Information
                    <span
                      className="serviceprovider-book-detail"
                      onClick={() =>
                        redirectToProviderDetail(
                          bookingDetails.serviceProviderService.id
                        )
                      }
                    >
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
                    </span>
                  </h4>

                  <div className="contact-info">
                    <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                      Name -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .firstName
                      }{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .lastName
                      }
                      <br></br>
                      Username -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .userName
                      }
                      <br></br>
                      Gender -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .gender
                      }
                      <br></br>
                      Bio -{" "}
                      {
                        bookingDetails.serviceProviderService.serviceProvider
                          .bio
                      }
                    </div>

                    <ul className="list-unstyled my-2">
                      <li className="mx-auto mb-2">
                        <FaPhoneAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          +91 -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.phoneNumber
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaRegEnvelope className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.email
                          }
                        </span>
                      </li>
                      <li className="mx-auto mb-2">
                        <FaMapMarkerAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.fullAddress
                          }{" "}
                          -{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.zipCode
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.city.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.state.name
                          }{" "}
                          ,{" "}
                          {
                            bookingDetails.serviceProviderService
                              .serviceProvider.address.country.name
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="social-icons mt-3 pt-1 pb-2">
                    <span className="service-req-title">Get in Touch -</span>

                    <Link
                      className="mx-1 facebook-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.facebook
                      }
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      className="mx-1 instagram-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.instagram
                      }
                    >
                      <FaInstagram />
                    </Link>
                    <Link
                      className="mx-1 linkedin-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.linkedin
                      }
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      className="mx-1 twitter-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .socialMedia.twitter
                      }
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      className="mx-1 email-icon"
                      to={
                        bookingDetails.serviceProviderService.serviceProvider
                          .email
                      }
                    >
                      <FaEnvelopeOpenText />
                    </Link>
                  </div>
                </div>
                <div className="status-icon-bottom my-3">
                  <span
                    className={`col-auto activity-icon ${renderStatusIconBackground(
                      bookingDetails.status
                    )}`}
                  >
                    {renderStatusIcon(bookingDetails.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
        case "CANCELLED_BY_PROVIDER":
          return (
            <div className="conatiner-fluid">
              <div className="row mb-3">
                <div className="col">
                  <button
                    className={`btn btn-status-history ${getStatusButtonColor(
                      bookingDetails.status
                    )}`}
                    style={{ float: "left" }}
                    onClick={() =>
                      redirectToProviderDetail(
                        bookingDetails.serviceProviderService.id
                      )
                    }
                  >
                    {bookingDetails.status}
                  </button>
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-7 ">
                  <div className="service-provider-info  py-3 px-3">
                    <h4 className="information-heading">Summary </h4>
                    <div className="row mt-2 pb-1">
                      <div className="col-lg-3 col-md-3 col-sm-3 ">
                        <FaHouseUser className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService.service
                              .serviceName
                          }
                        </span>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4">
                        <FaDollarSign className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {
                            bookingDetails.serviceProviderService.service
                              .hourlyRate
                          }{" "}
                          ₹ per hour
                        </span>
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1">
                          {formatDateTime(bookingDetails.bookedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="booking-details mt-3 mb-2">
                      <p className="notifaction-alert">
                        {bookingDetails.comments}
                      </p>
                      <p className="service-req-title mt-1 message-submit">
                      Your request has been cancelled by the service provider for some reasons. Please check back soon if you want to rebook                       </p>
                      <p className="service-req-title  mt-4">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1 mt-2">
                          request sent On -
                        </span>
  
                        <span className="mx-1  ">
                          {formatDateTime(bookingDetails.bookedAt)}
                        </span>
                      </p>
                      <p className="service-req-title  mt-2">
                        <FaCalendarAlt className="service-req-icon" />
                        <span className="service-req-title mx-1 mt-2">
                          request cancelled On -
                        </span>
  
                        <span className="mx-1  ">
                          {formatDateTime(bookingDetails.updatedAt)}
                        </span>
                      </p>
                    </div>
                    <Link
                    className={`${getHeaderClassName()} mt-2   btn review-btn`}
                    style={{
                      fontFamily: "Noto Sans, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      border: "none",
                      borderRadius: "22px",
                      color: "white",
                    }}
                    to="/customerAllService"
                  >
                    Rebook
                  </Link>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 ">
                  <div className="service-provider-info pt-3 pb-3 px-3">
                    <h4 className="information-heading">
                      Provider Information
                      <span
                        className="serviceprovider-book-detail"
                        onClick={() =>
                          redirectToProviderDetail(
                            bookingDetails.serviceProviderService.id
                          )
                        }
                      >
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
                      </span>
                    </h4>
  
                    <div className="contact-info">
                      <div className="mt-3 mb-3 serviceprovider-book-detail-username">
                        Name -{" "}
                        {
                          bookingDetails.serviceProviderService.serviceProvider
                            .firstName
                        }{" "}
                        {
                          bookingDetails.serviceProviderService.serviceProvider
                            .lastName
                        }
                        <br></br>
                        Username -{" "}
                        {
                          bookingDetails.serviceProviderService.serviceProvider
                            .userName
                        }
                        <br></br>
                        Gender -{" "}
                        {
                          bookingDetails.serviceProviderService.serviceProvider
                            .gender
                        }
                        <br></br>
                        Bio -{" "}
                        {
                          bookingDetails.serviceProviderService.serviceProvider
                            .bio
                        }
                      </div>
  
                      <ul className="list-unstyled my-2">
                        <li className="mx-auto mb-2">
                          <FaPhoneAlt className="service-req-icon" />
                          <span className="service-req-title mx-1">
                            {" "}
                            +91 -{" "}
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.phoneNumber
                            }
                          </span>
                        </li>
                        <li className="mx-auto mb-2">
                          <FaRegEnvelope className="service-req-icon" />
                          <span className="service-req-title mx-1">
                            {" "}
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.email
                            }
                          </span>
                        </li>
                        <li className="mx-auto mb-2">
                          <FaMapMarkerAlt className="service-req-icon" />
                          <span className="service-req-title mx-1">
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.address.fullAddress
                            }{" "}
                            -{" "}
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.address.zipCode
                            }{" "}
                            ,{" "}
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.address.city.name
                            }{" "}
                            ,{" "}
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.address.state.name
                            }{" "}
                            ,{" "}
                            {
                              bookingDetails.serviceProviderService
                                .serviceProvider.address.country.name
                            }
                          </span>
                        </li>
                      </ul>
                    </div>
  
                    <div className="social-icons mt-3 pt-1 pb-2">
                      <span className="service-req-title">Get in Touch -</span>
  
                      <Link
                        className="mx-1 facebook-icon"
                        to={
                          bookingDetails.serviceProviderService.serviceProvider
                            .socialMedia.facebook
                        }
                      >
                        <FaFacebook />
                      </Link>
                      <Link
                        className="mx-1 instagram-icon"
                        to={
                          bookingDetails.serviceProviderService.serviceProvider
                            .socialMedia.instagram
                        }
                      >
                        <FaInstagram />
                      </Link>
                      <Link
                        className="mx-1 linkedin-icon"
                        to={
                          bookingDetails.serviceProviderService.serviceProvider
                            .socialMedia.linkedin
                        }
                      >
                        <FaLinkedin />
                      </Link>
                      <Link
                        className="mx-1 twitter-icon"
                        to={
                          bookingDetails.serviceProviderService.serviceProvider
                            .socialMedia.twitter
                        }
                      >
                        <FaTwitter />
                      </Link>
                      <Link
                        className="mx-1 email-icon"
                        to={
                          bookingDetails.serviceProviderService.serviceProvider
                            .email
                        }
                      >
                        <FaEnvelopeOpenText />
                      </Link>
                    </div>
                  </div>
                  <div className="status-icon-bottom my-3">
                    <span
                      className={`col-auto activity-icon ${renderStatusIconBackground(
                        bookingDetails.status
                      )}`}
                    >
                      {renderStatusIcon(bookingDetails.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
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
      show={!!bookingId}
      onHide={onClose}
      className={`modal ${status}-modal`}
      dialogClassName="custom-modal"
    >
      <Modal.Header className={getHeaderClassName()} closeButton>
        <Modal.Title className="modal-title-booking-details">
          Booking id #{bookingId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p></p>
        <p>Booking Date: {bookingDetails.date}</p>
        <p>Customer Name: {bookingDetails.customerName}</p>
        Render different content based on the status */}
        {renderContentBasedOnStatus()}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={onClose}
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

export default SingleBookingDetail;
