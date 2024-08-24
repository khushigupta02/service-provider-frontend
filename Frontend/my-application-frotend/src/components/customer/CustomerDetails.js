import React, { useEffect } from 'react';
import "../../style/header.css";
import ServiceProviderSideBar from '../sidebar/ServiceProviderSideBar';
import axios from "axios";
import api from '../instance/Api';

const CustomerDetails = () => {

  const username = localStorage.getItem("userName"); 
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingId = localStorage.getItem("bookingId");
        if (bookingId) {
          const response = await api.get(
            `http://localhost:8080/viewBookingDetailByBookingId/${bookingId}`
          );
          
        } else {
          console.error("Booking ID not found in local storage");
        }
      } catch (error) {
        console.error(error);
      }
    };


    // return () => {
    //   localStorage.removeItem("bookingId");
    // };
    fetchBookingDetails();

  }, []);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-2'>
        <ServiceProviderSideBar username={username} />
        </div>
        <div className='col-lg-10'>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
