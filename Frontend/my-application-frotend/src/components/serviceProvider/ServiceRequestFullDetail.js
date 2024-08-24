import { useEffect, useState, useRef } from "react";
import ServiceProviderSideBar from "../sidebar/ServiceProviderSideBar";
import api from "../instance/Api";
import { Link, useNavigate } from "react-router-dom";
import "../../style/serviceRequest.css";
import { toast } from "react-toastify";
import "../../style/socialMedia.css";

import {
  FaRegUserCircle,
  FaHouseUser,
  FaRegClock,
  FaRegEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaCalendarAlt,
  FaClock,
  FaHistory,
  FaEnvelope,
  FaEnvelopeOpen,
} from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import images from "../../assets/images";

const ServiceRequestFullDetail = () => {
  const [booking, setBooking] = useState(null);
  const [star, setStar] = useState(0);
  const [feeedback, setFeedback] = useState(null);

  const [scheduledDateTime, setScheduledDateTime] = useState(null);
  const [finishedDateTime, setFinishedDateTime] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [comments, setComments] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [totalTimeTaken, setTotalTimeTaken] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = localStorage.getItem("userName");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingId = localStorage.getItem("bookingId");
        if (bookingId) {
          const response = await api.get(
            `http://localhost:8080/viewBookingDetailByBookingId/${bookingId}`
          );
          setBooking(response.data);
          setNewStatus(response.data.status);
          setComments(response.data.comments);
          setAdditionalMessage(response.data.additionalMessage);
          setTotalTimeTaken(response.data.totalTimeTaken);
          setScheduledDateTime(
            formatDateTimeValue(response.data.scheduledDateTime)
          );
          setFinishedDateTime(
            formatDateTimeValue(response.data.finishedDateTime)
          );
          const customerId = response.data.customer.id; 
        const serviceProviderServiceID = response.data.serviceProviderService.id; 
        
        const reviewResponse = await api.get(
          `http://localhost:8080/viewReview/${customerId}/${serviceProviderServiceID}`
          
        );
        setStar(reviewResponse.data.star);
        setFeedback(reviewResponse.data.feedback);
        } else {
          console.error("Booking ID not found in local storage");
          navigate("/serviceProviderNotification", { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingDetails();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // localStorage.removeItem("bookingId");
    };
    // return () => {
    //   localStorage.removeItem("bookingId");
    // };
  }, [navigate]);

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `http://localhost:8080/updateBookedServiceStatus/${booking.id}`,
        {
          status: newStatus,
          comments,
          scheduledDateTime,
          finishedDateTime,
          additionalMessage,
          totalTimeTaken,
        }
      );
      toast("Status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getColor = (status) => {
    switch (status) {
      case "REQUEST_SENT":
        return "#007bff";
      case "DONE":
        return "#19ac4d";
      case "REVIEW_DONE":
        return "rgb(255, 127, 81)";
      case "REBOOK_REQUEST_SENT":
        return "rgb(241, 193, 18)";
      case "CANCEL_BY_USER":
        return "#dc3545";
      case "ACCEPTED":
        return "#2e8b57";
      case "SCHEDULED":
        return "#673ab7";
      case "RESCHEDULED":
        return "#d308c9d3";
      case "ONGOING":
        return "#ffaa0d";
      case "CONFIRMED":
        return "#10bafc";
      case "CANCELLED_BY_PROVIDER":
        return "red";
      default:
        return "";
    }
  };

  const handleStatusChange = (newStatus) => {
    setNewStatus(newStatus);
  };
  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };
  const handleAdditionalMessageChange = (e) => {
    setAdditionalMessage(e.target.value);
  };

  const handleScheduledDateTimeChange = (e) => {
    setScheduledDateTime(e.target.value);
    calculateTotalTimeTaken(e.target.value, finishedDateTime);
  };
  const handleFinishedDateTimeChange = (e) => {
    setFinishedDateTime(e.target.value);
    calculateTotalTimeTaken(scheduledDateTime, e.target.value);
  };
  const calculateTotalTimeTaken = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const totalTimeInMinutes = (endTime - startTime) / (1000 * 60); // convert milliseconds to minutes

    const days = Math.floor(totalTimeInMinutes / (24 * 60));
    const hours = Math.floor((totalTimeInMinutes % (24 * 60)) / 60);
    const minutes = Math.floor(totalTimeInMinutes % 60);

    setTotalTimeTaken(`${days}d ${hours}h ${minutes}m`);
  };

  const formatDateTimeValue = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    // Adjust date format to match datetime-local input format (YYYY-MM-DDTHH:MM)
    return date.toISOString().slice(0, 16);
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
  const redirectToCustomerDetail = (bookingId) => {
    localStorage.setItem("bookingId", bookingId);

    navigate(`/customerDetail/${bookingId}`);
  };
  const redirectToServiceDetail = (bookingId) => {
    localStorage.setItem("bookingId", bookingId);

    navigate(`/bookingServiceDetail/${bookingId}`);
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
  const formatTime = (dateTimeValue) => {
    if (!dateTimeValue) return "";

    const date = new Date(dateTimeValue);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes} ${amPm}`;
  };
  const renderContentBasedOnStatus = () => {
    switch (newStatus) {
      case "REQUEST_SENT":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service Request Received: Acceptance Needed{" "}
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
          </div>
        );
      case "ACCEPTED":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service Request Received: Awaiting Confirmation
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className=" mt-4">
                  <h4 className="mod-service-req">
                    {booking.comments} by -{" "}
                    <span className="highlited-red">
                      {booking.serviceProviderService.serviceProvider.userName}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "CONFIRMED":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service Request Received: Scheduling Pending
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className=" mt-4">
                  <h4 className="mod-service-req">
                    {booking.comments} by -{" "}
                    <span className="highlited-red">
                      {booking.serviceProviderService.serviceProvider.userName}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "SCHEDULED":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service request: Scheduled and will be completed shortly
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2 pb-1">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 mb-3 customer-details-request">
              Service Appointment Information
            </h3>
            <div className="row mt-1 mb-4 pb-2">
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <FaCalendarAlt className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatScheduledDate(booking.scheduledDateTime)} -{" "}
                  {formatScheduledDate(booking.finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {" "}
                  {formatTime(scheduledDateTime)}
                </span>{" "}
                -
                <span className="service-req-title mx-1">
                  {formatTime(finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaHistory className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {booking.totalTimeTaken}
                </span>
              </div>
              <p className=" mt-3 mod-service-req">
                Message -{" "}
                <span className="mx-1 highlited-red">
                  {" "}
                  {booking.additionalMessage}
                </span>
              </p>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className=" mt-4">
                  <h4 className="mod-service-req">
                    {booking.comments} by -{" "}
                    <span className="highlited-red">
                      {booking.serviceProviderService.serviceProvider.userName}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "RESCHEDULED":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service request: Rescheduled and will be completed shortly
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2 pb-1">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 mb-3 customer-details-request">
              Service Appointment Information
            </h3>
            <div className="row mt-1 mb-4 pb-2">
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <FaCalendarAlt className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatScheduledDate(booking.scheduledDateTime)} -{" "}
                  {formatScheduledDate(booking.finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {" "}
                  {formatTime(scheduledDateTime)}
                </span>{" "}
                -
                <span className="service-req-title mx-1">
                  {formatTime(finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaHistory className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {booking.totalTimeTaken}
                </span>
              </div>
              <p className=" mt-3 mod-service-req">
                Message -{" "}
                <span className="mx-1 highlited-red">
                  {" "}
                  {booking.additionalMessage}
                </span>
              </p>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className=" mt-4">
                  <h4 className="mod-service-req">
                    {booking.comments} by -{" "}
                    <span className="highlited-red">
                      {booking.serviceProviderService.serviceProvider.userName}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "ONGOING":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
            Service request: In progress and will be completed shortly<button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2 pb-1">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 mb-3 customer-details-request">
              Service Appointment Information
            </h3>
            <div className="row mt-1 mb-4 pb-2">
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <FaCalendarAlt className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatScheduledDate(booking.scheduledDateTime)} -{" "}
                  {formatScheduledDate(booking.finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {" "}
                  {formatTime(scheduledDateTime)}
                </span>{" "}
                -
                <span className="service-req-title mx-1">
                  {formatTime(finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaHistory className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {booking.totalTimeTaken}
                </span>
              </div>
             
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className=" mt-4">
                  <h4 className="mod-service-req">
                    {booking.comments} by -{" "}
                    <span className="highlited-red">
                      {booking.serviceProviderService.serviceProvider.userName}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "DONE":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
            Service completed : Awaiting customer review

            <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2 pb-1">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 mb-3 customer-details-request">
              Service Appointment Information
            </h3>
            <div className="row mt-1 mb-4 pb-2">
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <FaCalendarAlt className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatScheduledDate(booking.scheduledDateTime)} -{" "}
                  {formatScheduledDate(booking.finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {" "}
                  {formatTime(scheduledDateTime)}
                </span>{" "}
                -
                <span className="service-req-title mx-1">
                  {formatTime(finishedDateTime)}
                </span>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <FaHistory className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {booking.totalTimeTaken}
                </span>
              </div>
             
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <div className=" mt-4">
                  <h4 className="mod-service-req">
                    {booking.comments} by -{" "}
                    <span className="highlited-red">
                      {booking.serviceProviderService.serviceProvider.userName}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "REVIEW_DONE":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service completed: Customer review submitted
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2 pb-1">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <div className="mt-2 pt-3 pb-1">
            <p className="mod-service-req mb-2">
            Provided feedback by -{" "}
                <span
                  className="mx-1 highlited-red"
                  style={{fontWeight:"600" , fontSize:"13px"}}
                >
                  {" "}
                  {booking.customer.userName}
                </span>
              </p>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                style={{
                  cursor: "pointer",
                  fontSize:"14px",
                  color: index < star ? "#FDBA01" : "rgb(7, 45, 101)",
                  marginRight: "4px",
                }}
              >
                ★
              </span>
            ))}
            <p className="mt-2 service-req-title">" {feeedback} "</p>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8"></div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Modified at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "REBOOK_REQUEST_SENT":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
              Service Rebook Request Received: Acceptance Needed{" "}
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pb-1">
              <p className="mod-service-req">
                Requesting Service -{" "}
                <span
                  className="mx-1 highlited-red"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {" "}
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </p>
            </div>
          </div>
        );
      case "CANCEL_BY_USER":
        return (
          <div className="py-2">
            <p className="notifaction-alert">
            Service request Cancelled by customer
              <button
                className="btn servicename-request-page"
                style={{
                  backgroundColor: getColor(newStatus),
                }}
              >
                {booking.status}
              </button>
            </p>
            <div className="row mt-2">
              <div className="col-lg-3 col-md-3 col-sm-3 ">
                <FaRegUserCircle
                  className="service-req-icon"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToCustomerDetail(booking.id)}
                >
                  {booking.customer.firstName} {booking.customer.lastName}
                </span>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <FaHouseUser
                  className="service-req-icon"
                  onClick={() => redirectToServiceDetail(booking.id)}
                />
                <span
                  className="service-req-title mx-1"
                  onClick={() => redirectToServiceDetail(booking.id)}
                >
                  {booking.serviceProviderService.service.serviceName}
                </span>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <FaRegClock className="service-req-icon" />
                <span className="service-req-title mx-1">
                  {formatDateTime(booking.bookedAt)}
                </span>
              </div>
            </div>
            <h3 className="mt-4 customer-details-request">
              customer contact information
            </h3>
            <div className="contact-info">
              <ul className="list-unstyled my-2">
                <li className="mx-auto mb-2">
                  <FaPhoneAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    +91 - {booking.customer.phoneNumber}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaRegEnvelope className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.email}
                  </span>
                </li>
                <li className="mx-auto mb-2">
                  <FaMapMarkerAlt className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {" "}
                    {booking.customer.address.fullAddress} -{" "}
                    {booking.customer.address.zipCode} ,{" "}
                    {booking.customer.address.city.name}{" "}
                    {booking.customer.address.state.name} ,{" "}
                    {booking.customer.address.country.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8"></div>
              <div className="col-lg-4 col-md-4 col-sm-4 ">
                <div className=" mt-3 modification-section">
                  <p className="mod-service-req mx-3 text-center">
                    Cancelled at
                  </p>
                  <FaEdit className="service-req-icon mt-1" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
        case "CANCELLED_BY_PROVIDER":
          return (
            <div className="py-2">
              <p className="notifaction-alert">
              Service request Cancelled by Service Provider
                <button
                  className="btn servicename-request-page"
                  style={{
                    backgroundColor: getColor(newStatus),
                  }}
                >
                  {booking.status}
                </button>
              </p>
              <div className="row mt-2">
                <div className="col-lg-3 col-md-3 col-sm-3 ">
                  <FaRegUserCircle
                    className="service-req-icon"
                    onClick={() => redirectToCustomerDetail(booking.id)}
                  />
                  <span
                    className="service-req-title mx-1"
                    onClick={() => redirectToCustomerDetail(booking.id)}
                  >
                    {booking.customer.firstName} {booking.customer.lastName}
                  </span>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2">
                  <FaHouseUser
                    className="service-req-icon"
                    onClick={() => redirectToServiceDetail(booking.id)}
                  />
                  <span
                    className="service-req-title mx-1"
                    onClick={() => redirectToServiceDetail(booking.id)}
                  >
                    {booking.serviceProviderService.service.serviceName}
                  </span>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <FaRegClock className="service-req-icon" />
                  <span className="service-req-title mx-1">
                    {formatDateTime(booking.bookedAt)}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 customer-details-request">
                customer contact information
              </h3>
              <div className="contact-info">
                <ul className="list-unstyled my-2">
                  <li className="mx-auto mb-2">
                    <FaPhoneAlt className="service-req-icon" />
                    <span className="service-req-title mx-1">
                      {" "}
                      +91 - {booking.customer.phoneNumber}
                    </span>
                  </li>
                  <li className="mx-auto mb-2">
                    <FaRegEnvelope className="service-req-icon" />
                    <span className="service-req-title mx-1">
                      {" "}
                      {booking.customer.email}
                    </span>
                  </li>
                  <li className="mx-auto mb-2">
                    <FaMapMarkerAlt className="service-req-icon" />
                    <span className="service-req-title mx-1">
                      {" "}
                      {booking.customer.address.fullAddress} -{" "}
                      {booking.customer.address.zipCode} ,{" "}
                      {booking.customer.address.city.name}{" "}
                      {booking.customer.address.state.name} ,{" "}
                      {booking.customer.address.country.name}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8"></div>
                <div className="col-lg-4 col-md-4 col-sm-4 ">
                  <div className=" mt-3 modification-section">
                    <p className="mod-service-req mx-3 text-center">
                      Cancelled at
                    </p>
                    <FaEdit className="service-req-icon mt-1" />
                    <span className="service-req-title mx-1">
                      {formatDateTime(booking.updatedAt)}
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <ServiceProviderSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="container service-request-cont px-2 py-3 mt-3 mb-3">
            {booking && (
              <div>
                <h2 className="edit-heading mb-4">
                  Service Request - #{booking.id}
                </h2>
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="service-request-box px-3 py-2">
                      {renderContentBasedOnStatus()}
                    </div>
                    <div className="row my-2">
                      <div className="col-lg-8 col-md-8 col-sm-8"></div>
                      <div
                        className="col-lg-4 col-md-4 col-sm-4 userinfo-req"
                        onClick={() => redirectToCustomerDetail(booking.id)}
                      >
                        <div className="service-req-user-details-section mt-2 px-3 py-2">
                          <div className="mx-auto ">
                            <div className="user-avatar">
                              <img
                                src={images.avtar}
                                alt="User Icon"
                                className="user-icon"
                              />
                            </div>
                          </div>
                          <div className="mx-auto text-center">
                            <p className="username-req-page mb-2 ">
                              {booking.customer.userName}
                            </p>
                            <span className="service-req-title mx-1">
                              {" "}
                              {booking.customer.address.fullAddress} -{" "}
                              {booking.customer.address.zipCode} ,{" "}
                              {booking.customer.address.city.name}{" "}
                            </span>{" "}
                            <span className="service-req-title mx-1">
                              {" "}
                              +91 - {booking.customer.phoneNumber}
                            </span>
                            <div className="social-icons mt-4 pb-2">
                              <Link
                                className="mx-1 facebook-icon"
                                to={booking.customer.socialMedia.facebook}
                              >
                                <FaFacebook />
                              </Link>
                              <Link
                                className="mx-1 instagram-icon"
                                to={booking.customer.socialMedia.instagram}
                              >
                                <FaInstagram />
                              </Link>
                              <Link
                                className="mx-1 linkedin-icon"
                                to={booking.customer.socialMedia.linkedin}
                              >
                                <FaLinkedin />
                              </Link>
                              <Link
                                className="mx-1 twitter-icon"
                                to={booking.customer.socialMedia.twitter}
                              >
                                <FaTwitter />
                              </Link>
                              <Link
                                className="mx-1 email-icon"
                                to={booking.customer.email}
                              >
                                <FaEnvelopeOpen />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="status-change-box px-2 py-2">
                      <form className="my-2 mx-2" onSubmit={handleStatusSubmit}>
                        <p className="mb-2  text-center reuqust-head">
                          Request Status Update
                        </p>
                        <div className="mb-3 mt-4">
                          <label className="form-label mx-1">Status</label>

                          <br></br>
                          <div class="btn-group" ref={dropdownRef}>
                            <button
                              type="button"
                              className="btn px-3 btn-danger dropdown-toggle"
                              style={{
                                backgroundColor: getColor(newStatus),
                                border: "none",
                                borderRadius: "17px",
                                outline: "none !important",
                              }}
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded={dropdownOpen ? "true" : "false"}
                            >
                              {newStatus}
                            </button>
                            {dropdownOpen && (
                              <div className="dropdown-menu option-status-menu">
                                <button
                                  className="dropdown-item"
                                  value="DONE"
                                  onClick={() => {
                                    handleStatusChange("DONE");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Completed
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="REVIEW_DONE"
                                  onClick={() => {
                                    handleStatusChange("REVIEW_DONE");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Review Done
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="REBOOK_REQUEST_SENT"
                                  onClick={() => {
                                    handleStatusChange("REBOOK_REQUEST_SENT");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Rebooking Request Sent
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="REQUEST_SENT"
                                  onClick={() => {
                                    handleStatusChange("REQUEST_SENT");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Request Sent
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="CANCEL_BY_USER"
                                  onClick={() => {
                                    handleStatusChange("CANCEL_BY_USER");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Canceled by User
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="ACCEPTED"
                                  onClick={() => {
                                    handleStatusChange("ACCEPTED");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Accepted
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="SCHEDULED"
                                  onClick={() => {
                                    handleStatusChange("SCHEDULED");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Scheduled
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="RESCHEDULED"
                                  onClick={() => {
                                    handleStatusChange("RESCHEDULED");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Rescheduled
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="ONGOING"
                                  onClick={() => {
                                    handleStatusChange("ONGOING");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Currently Ongoing
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="CONFIRMED"
                                  onClick={() => {
                                    handleStatusChange("CONFIRMED");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Request Confirmed
                                </button>
                                <button
                                  className="dropdown-item"
                                  value="CANCELLED_BY_PROVIDER"
                                  onClick={() => {
                                    handleStatusChange("CANCELLED_BY_PROVIDER");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Canceled
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {["SCHEDULED", "RESCHEDULED"].includes(newStatus) && (
                          <>
                            <label
                              className="form-label mx-1 font-weight-bold highlited-red"
                              style={{ fontSize: "13px" }}
                            >
                              Schedule Service Time
                            </label>
                            <div className="mb-3 ">
                              <label className="form-label mx-1">
                                Service Start Time{" "}
                              </label>
                              <input
                                type="datetime-local"
                                value={scheduledDateTime}
                                onChange={handleScheduledDateTimeChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3 mt-4">
                              <label className="form-label mx-1">
                                Service End Time{" "}
                              </label>
                              <input
                                type="datetime-local"
                                value={finishedDateTime}
                                onChange={handleFinishedDateTimeChange}
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="mb-3 mt-4">
                              <label className="form-label mx-1">
                                Total Time Taken
                              </label>
                              <input
                                type="text"
                                value={totalTimeTaken}
                                className="form-control"
                                readOnly
                              />
                            </div>
                            <div className="mb-3 mt-4">
                              <label className="form-label mx-1">
                                Additional Message
                              </label>
                              <textarea
                                type="text"
                                name="text"
                                rows={3}
                                value={additionalMessage}
                                onChange={handleAdditionalMessageChange}
                                className="form-textarea"
                                autoComplete="off"
                              />
                            </div>
                          </>
                        )}
                        <div className="mb-3 mt-4">
                          <label className="form-label mx-1">
                            Add Status Update Comment
                          </label>
                          <textarea
                            type="text"
                            name="text"
                            rows={2}
                            value={comments}
                            onChange={handleCommentChange}
                            className="form-textarea"
                            autoComplete="off"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-update-status-for-request my-2"
                        >
                          Update Status
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestFullDetail;
