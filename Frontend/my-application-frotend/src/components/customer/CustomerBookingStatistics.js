import React, { useEffect, useState } from "react";
import api from "../instance/Api";
import { Pie } from "react-chartjs-2";
import "../../style/serviceProviderBookingDetails.css";
import "../../style/btnStatus.css";
import images from "../../assets/images";
import {
   
    FaArrowRight
  } from "react-icons/fa";
import { Link } from "react-router-dom";
const CustomerBookingStatistics = () => {
  const [totalBookedService, setTotalBookedService] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalOngoing, setTotalOngoing] = useState(0);
  const [totalRequestSent, setTotalRequestSent] = useState(0);
  const [totalRebookRequestSent, setTotalReBookRequestSent] = useState(0);
  const [totalAccepted, setTotalAccepted] = useState(0);
  const [totalConfirmed, setTotalConfirmed] = useState(0);
  const [totalScheduled, setTotalScheduled] = useState(0);
  const [totalReScheduled, setTotalReScheduled] = useState(0);
  const [totalCancelledByCustomer , setTotalCancelledByCustomer] = useState(0);
  const [totalCancelledByProvider, setTotalCancelledByProvider] = useState(0);
  const [totalReviewed, setTotalReviewed] = useState(0);
  const [serviceAndProvider,   setServiceAndProvider  ] = useState(null);

  const username = localStorage.getItem("userName");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllBookingDetailsByUsername/${username}`
        );
        setTotalBookedService(response.data.length);
            

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
        const requestSentCount = bookings.filter(
            (booking) =>
              booking.status === "REQUEST_SENT" 
          ).length;
          setTotalRequestSent(requestSentCount);
  
          const rebookRequestSentCount = bookings.filter(
              (booking) =>
                booking.status === "REBOOK_REQUEST_SENT" 
            ).length;
            setTotalReBookRequestSent(rebookRequestSentCount);
  
          const ongoingCount = bookings.filter(
              (booking) =>
              booking.status === "ONGOING" 
            ).length;
            setTotalOngoing(ongoingCount);
  
            const acceptedCount = bookings.filter(
              (booking) =>
              booking.status === "ACCEPTED" 
            
            ).length;
            setTotalAccepted(acceptedCount);
  
            const confirmCount = bookings.filter(
              (booking) =>
              booking.status === "CONFIRMED"
            ).length;
            setTotalConfirmed(confirmCount);
  
            const scheduledCount = bookings.filter(
              (booking) =>
              booking.status === "SCHEDULED" 
            ).length;
            setTotalScheduled(scheduledCount);
  
            const reschduledCount = bookings.filter(
              (booking) =>
              booking.status === "RESCHEDULED" 
            ).length;
            setTotalReScheduled(reschduledCount);
  
            const cancelByCustomerCount = bookings.filter(
              (booking) =>
              booking.status === "CANCEL_BY_USER" 
            ).length;
            setTotalCancelledByCustomer(cancelByCustomerCount);
  
            const cancelProviderCount = bookings.filter(
              (booking) =>
              booking.status === "CANCELLED_BY_PROVIDER" 
            ).length;
            setTotalCancelledByProvider(cancelProviderCount);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllServiceAndProvider`
        );
        setServiceAndProvider(response.data);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
    }, 5000);
    return () => {
      clearInterval(interval);
    };    
  }, []);
  const data = {
    labels: ["Accepted", "Cancel By Customer", "Reviewed", "Cancelled by Provider", "Scheduled", "Request Sent", "Re-scheduled", "Re-book Request Sent", "Ongoing", "Confirmed", "Completed"],
    datasets: [
      {
        label: "Count",
        data: [
          totalAccepted,
          totalCancelledByCustomer,
          totalReviewed,
          totalCancelledByProvider,
          totalScheduled,
          totalRequestSent,
          totalReScheduled,
          totalRebookRequestSent,
          totalOngoing,
          totalConfirmed,
          totalCompleted
        ],
        backgroundColor: [
          "#2E8B57", "#dc3545", "#ff4081", "red", "#10bafc", "#ffaa0d",
          "#d308c9d3", "rgb(241, 193, 18)", "#007bff", "rgb(255, 127, 81)",
          "#673ab7"
        ],
        hoverOffset: 4,
      },
    ],
  };

  

  return (
    <div className="container-fluid dashboard-header my-4 py-3 px-4">
      <h4 className="heading-statistic">Booking Summary</h4>
      <div className="row">
      <div className="col-lg-7 col-md-7 col-sm-7">
        <p className="heading-latest mt-3 mb-4 ">Available All Service</p>
        <div className="booking-notifiaction">
            {serviceAndProvider !== null &&
              serviceAndProvider.slice(-4).map((booking, index) => (
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
                    {booking.service.serviceName}
                      <span className="status-text"> - {booking.service.hourlyRate} ₹ (hour per rate)</span>
                    </p>
                    <p className="review-para">{booking.service.description}</p>

                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3">
                    <div className="rating-in-dashboard">
                    <p className="customer-name-in-dashboard">
                        {booking.serviceProvider.firstName} {" "}
                        {booking.serviceProvider.lastName}

                    </p>
                    </div>
                  </div>
                </div>
              ))}
              <Link className="view-allservice-btn btn" to="/customerAllService">View All <FaArrowRight /></Link>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-sm-5">
        <p className="heading-latest  mb-4 ">Booking Records</p>

          <Pie data={data} />
        </div>
      
      </div>
      <div className="row mt-3">
        <div className="col-lg-8 col-md-8 col-sm-8">
          <div className="booking-notifiaction"></div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
        </div>
      </div>
    </div>
  );
};

export default CustomerBookingStatistics;
