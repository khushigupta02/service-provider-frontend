import React, { useEffect, useState } from "react";
import "../../style/header.css";
import "../../style/singleServiceDetail.css";
import CustomerSideBar from "../sidebar/CustomerSideBar";
import api from "../instance/Api";
import { useParams, Link } from "react-router-dom";
import { FaDollarSign, FaMoneyBill, FaTools, FaUsersCog } from "react-icons/fa";
import { toast } from "react-toastify";
import FeedbackFormModal from "./servicePage/FeedbackFormModal";
import images from "../../assets/images";

const ServiceDetail = () => {
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState();
  const [serviceStatus, setServiceStatus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [rebookButtonText, setRebookButtonText] = useState("");

  const [showResponseButton, setShowResponseButton] = useState(false);
  const [cancelButtonVisible, setCancelButtonVisible] = useState(false);
  const [rebookButtonVisible, setRebookButtonVisible] = useState(false);
  const [bookServiceButtonVisible, setBookServiceButtonVisible] =
    useState(true);
  const [rebookButtonDisabled, setRebookButtonDisabled] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [serviceBookingId, setServiceBookingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const customToastStyle = {
    backgroundColor: "blue",
    BiFontFamily: "Noto Sans sans-serif",
    color: "white",
    fontSize: "17px",
    borderRadius: "8px",
  };
  const customProgressBar = {
    background: "white",
  };
  const username = localStorage.getItem("userName");
  const { id } = useParams();
  const openModal = () => {
    console.log("Clickkkk");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewServiceByID/${id}`
        );
        setService(response.data);
      } catch (error) {
        setError(error.message);
        console.error(
          "There was a problem with fetching service details:",
          error
        );
      }
    };
    fetchServiceDetails();

    const interval = setInterval(() => {      fetchServiceDetails();    }, 10000);
    return () => {
      clearInterval(interval);
    };    
  }, [id]);
  useEffect(() => {
    const fetchServiceBookingId = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/getBookingId/${username}/${id}`
        );
        setServiceBookingId(response.data);
        localStorage.setItem("bookingId", response.data);
      } catch (error) {
        setError(error.message);
        console.error(
          "There was a problem with fetching service booking details:",
          error
        );
      }
    };

    fetchServiceBookingId();

    const interval = setInterval(() => {
      fetchServiceBookingId();
    }, 6000);

    return () => clearInterval(interval);
  }, [username, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewBookedServiceStatus/${username}/${id}`
        );
        console.log("Response data:", response.data);

        if (response.data === "CANCEL_BY_USER") {
          // If the response is "CANCEL_BY_USER", show only the rebook button
          setRebookButtonVisible(true);
          setCancelButtonVisible(false);
          setBookServiceButtonVisible(false);
          setShowResponseButton(false);
          setRebookButtonVisible(true);
          setRebookButtonDisabled(false);
        } else if (response.data === "REBOOK_REQUEST_SENT") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "ACCEPTED") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "ACCEPTED") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "ONGOING") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "SCHEDULED") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "RESCHEDULED") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "CONFIRMED") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "DONE") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(false);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data === "REVIEW_DONE") {
          setRebookButtonVisible(false);
          setCancelButtonVisible(false);
          setBookServiceButtonVisible(false);
          setShowResponseButton(true);
          setResponseText(response.data);
          setShowResponseButton(false);
          setRebookButtonVisible(true);
          setButtonDisabled(false);
        } else if (response.data === "CANCELLED_BY_PROVIDER") {
          setRebookButtonVisible(true);
          setCancelButtonVisible(false);
          setBookServiceButtonVisible(false);
          setButtonDisabled(true);
          setShowResponseButton(true);
          setResponseText(response.data);
          setButtonDisabled(true);
        } else if (response.data) {
          setButtonText(response.data);
          setResponseText(response.data);
          setShowResponseButton(true);
          const disableButton = response.data === "REQUEST_SENT";
          setButtonDisabled(true);
          setCancelButtonVisible(true);
          setBookServiceButtonVisible(!disableButton);
          setRebookButtonVisible(false);
        } else {
          setShowResponseButton(false);
        }
      } catch (error) {
        console.error("Error fetching service status:", error);
      }
    };

    fetchData();

  
  }, [username, id]);

  const handleBookService = async () => {
    try {
      const response = await api.post(
        `http://localhost:8080/bookService/${id}`
      );

      if (response.data.status) {
        // Update the state

        setBookingId(response.data.id); // Store the booking ID
        localStorage.setItem(`bookingId`, response.data.id);

        setServiceStatus(response.data.status);
        setButtonText(response.data.status);
        setResponseText(response.data.status);
        setShowResponseButton(true); // Show the response button
        setButtonDisabled(true); // Disable the button after booking
        setBookServiceButtonVisible(false); // Hide the "Book Service" button
        setCancelButtonVisible(true); // Show the "Cancel Request" button
        // Show success toast message after state update
        toast.success("Service booked successfully!");
      } else {
        // Handle the case when the response doesn't have a status
        setResponseText("No response available");
        setShowResponseButton(true);
      }
    } catch (error) {
      console.error("Error booking service:", error);
      // Handle the error case
      setResponseText("Error booking service");
      setShowResponseButton(true);
    }
  };
  const handleReBookService = async () => {
    try {
      const response = await api.post(
        `http://localhost:8080/reBookService/${id}`
      );

      if (response.data.status) {
        // Update the state
        setServiceStatus(response.data.status);
        setButtonText(response.data.status);
        setRebookButtonText(response.data.status);

        setResponseText(response.data.status);
        setShowResponseButton(true); // Show the response button
        setButtonDisabled(true); // Disable the button after booking
        setBookServiceButtonVisible(false); // Hide the "Book Service" button
        setShowResponseButton(true);
        setRebookButtonVisible(false);
        setCancelButtonVisible(true); // Show the "Cancel Request" button
        // Show success toast message after state update
        toast.success("Service Re-booked successfully!");
      } else {
        // Handle the case when the response doesn't have a status
        setResponseText("No response available");
        setShowResponseButton(true);
      }
    } catch (error) {
      console.error("Error booking service:", error);
      // Handle the error case
      setResponseText("Error booking service");
      setShowResponseButton(true);
    }
  };

  const handleCancelService = async () => {
    try {
      const bookingId = localStorage.getItem("bookingId");
      const response = await api.get(
        `http://localhost:8080/cancelBookedService/${bookingId}`
      );
      setShowResponseButton(true);
      localStorage.removeItem("bookingId"); // Remove the booking ID from localStorage

      toast.success("Service Cancelled by Customer successfully!");
      setRebookButtonVisible(true); // Set the rebook button to be visible
      setCancelButtonVisible(false); // Hide the cancel button
      setRebookButtonDisabled(false); // Enable the rebook button
      setBookServiceButtonVisible(false); // Hide the book service button
      setShowResponseButton(false); // Hide the response button

      // Additionally, you can reset the service status or response text if needed
      setServiceStatus(null);
      setResponseText("");
    } catch (error) {
      console.error("Error cancelling service:", error);
    }
  };
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewReviewByServiceId/${id}`
        );
        setReviews(response.data);
      } catch (error) {
        setError(error.message);
        console.error(
          "There was a problem with fetching service details:",
          error
        );
      }
    };

    fetchServiceDetails();

    const interval = setInterval(() => {
      fetchServiceDetails();
    }, 6000);

    return () => {
      clearInterval(interval);
      localStorage.removeItem("bookingId");
    };
  }, [id]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar />
        </div>
        <div className="col-lg-10">
          <button className="btn gobackButton px-3 mb-2 mt-3">
            <Link
              to="/customerAllService"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => localStorage.removeItem("bookingId")}
            >
              Go Back
            </Link>
          </button>
          {error && <p>Error: {error}</p>}
          {service && (
            <div className="container individual-service ">
              <div className="row mb-4 pb-1">
              <div className="col-lg-6 col-md-6 col-sm-6">
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 ">
                  {bookServiceButtonVisible && (
                    <button
                      className="btn sortButton bookService px-3 py-2"
                      onClick={handleBookService}
                      disabled={buttonDisabled}
                    >
                      Book Service
                    </button>
                  )}
                  {cancelButtonVisible && (
                    <button
                      className="btn sortButton bookService px-3 py-2"
                      onClick={handleCancelService}
                    >
                      Cancel Request
                    </button>
                  )}
                  {showResponseButton && (
                    <button
                      className="btn sortButton bookService px-3 py-2"
                      disabled={buttonDisabled}
                    >
                      {responseText}
                    </button>
                  )}{" "}
                  {rebookButtonVisible && (
                    <button
                      className="btn sortButton bookService px-3 py-2"
                      onClick={handleReBookService}
                      disabled={responseText === "REBOOK_REQUEST_SENT"}
                    >
                      Rebook
                    </button>
                  )}{" "}
                  {responseText === "DONE" && (
                    <button
                      className="btn sortButton bookService px-3 py-2"
                      onClick={openModal}
                    >
                      Give Feedback
                    </button>
                  )}
                  {showModal && (
                    <FeedbackFormModal
                      show={showModal}
                      onClose={closeModal}
                      bookingId={localStorage.getItem("bookingId")}
                    />
                  )}
                 
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="service-details-page  ">
                    <div className="service-detail-header px-3 ">
                      <h2 className="service-heading-detail pt-3">
                        Service Detail
                      </h2>
                    </div>
                    <div className="service-detail-body px-3 pt-4 pb-4">
                      <div className="row mb-1 ">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="py-auto">
                            <label className="label-provider-service-info">
                              Service Name -
                              <span className="label-provider-service-value">
                                {" "}
                                {service.serviceName}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                          <div className="py-auto">
                            <label className="label-provider-service-info">
                              Service Type -
                              <span className="label-provider-service-value">
                                {" "}
                                {service.serviceType.name}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-1 ">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="py-auto">
                            <label className="label-provider-service-info">
                              Description -
                              <span className="label-provider-service-value">
                                {" "}
                                {service.description}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3 ">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="py-auto">
                            <label className="label-provider-service-info">
                              Rate per Hour (in Rupees) -
                              <span className="label-provider-service-value">
                                {" "}
                                {service.hourlyRate} ₹ (per hour)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  </div>
                  <div className="service-details-page mt-4">
                  <div className="service-detail-header px-3 ">
                      <h2 className="service-heading-detail pt-3">
                        Service Attribute
                      </h2>
                    </div>
                    <div className="service-detail-body px-3 pt-2 pb-4">
                      <div className="row pb-2 mb-1 mt-2 px-3">
                        <div className="col-lg-11 col-md-11 col-sm-11">
                          <Link
                            className="provided-name"
                            to={`/serviceProviderDetail/${service.serviceProvider.id}`}
                          >
                            <label className="label-provider-service-info ">
                              Provided By -
                              <span className="label-provider-service-value provider-name-hover">
                                {" "}
                                {service.serviceProvider.firstName}{" "}
                                {service.serviceProvider.lastName}
                              </span>
                            </label>
                          </Link>
                        </div>
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
                      </div>
                      <div className="row pb-2  mt-1 px-3">
                        <div className="col-lg-11 col-md-11 col-sm-11">
                          <Link
                            className="provided-name"
                            to={`/serviceProviderDetail/${service.serviceProvider.id}`}
                          >
                            <label className="label-provider-service-info ">
                              Service Type -
                              <span className="label-provider-service-value provider-name-hover">
                                {" "}
                                {service.serviceType.name}
                              </span>
                            </label>
                          </Link>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1">
                          <span className="icon-container">
                            <FaTools className="icon-on-provider-profiles" />
                          </span>
                        </div>
                      </div>
                      <div className="row pb-2  mt-1 px-3">
                        <div className="col-lg-11 col-md-11 col-sm-11">
                          <Link
                            className="provided-name"
                            to={`/serviceProviderDetail/${service.serviceProvider.id}`}
                          >
                            <label className="label-provider-service-info ">
                              Hourly Rate -
                              <span className="label-provider-service-value provider-name-hover">
                                {" "}
                                {service.hourlyRate}
                              </span>
                            </label>
                          </Link>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1">
                          <span className="icon-container">
                            <FaDollarSign className="icon-on-provider-profiles" />
                          </span>
                        </div>
                      </div>
                      <div className="row  mt-1 px-3">
                       
                        <div className="col-lg-1 col-md-1 col-sm-1">
                        
                          <FaUsersCog className="service-icon" />

                        </div>
                        <div className="col-lg-11 col-md-11 col-sm-11">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5 col-md-5 col-sm-5">
                <div className="service-details-page">
                  <div className="service-detail-header px-3 ">
                      <h2 className="service-heading-detail pt-3">
                        Service Review
                      </h2>
                    </div>
                    <div className="service-detail-body px-3 pt-1 pb-4">
                      <div className="row pb-2 mb-1 mt-1 ">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                        {reviews.length > 0 ? (
                      reviews.slice(0, 5).map((review, index) => (
                        <div className="row pb-3 mb-3 mt-4 mx-1 review-box">
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
                          <div className="col-lg-8 col-md-8 col-sm-8 px-4">
                            <p className="customer-name-in-dashboard">
                              {review.customer.firstName}{" "}
                              {review.customer.lastName}
                              <span className="status-text">
                                {" "}
                                - review provided by{" "}
                              </span>
                            </p>
                            <p className="review-para">{review.feedback}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="rating-in-dashboard">
                              {[...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    color:
                                      index < review.star
                                        ? "#FDBA01"
                                        : "rgb(7, 45, 101)",
                                    marginRight: "4px",
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available.</p>
                    )}
                    {error && <p className="error-text">{error}</p>}{" "}
                        </div>
                       
                      </div>
                    
                     
                    </div>
                  </div>
                 
                </div>
              </div>
            
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
