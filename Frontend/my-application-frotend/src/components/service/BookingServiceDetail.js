import React, { useEffect } from 'react';
import "../../style/header.css";
import ServiceProviderSideBar from '../sidebar/ServiceProviderSideBar';
import axios from "axios";

const BookingServiceDetail = () => {

  const username = localStorage.getItem("userName"); 

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

export default BookingServiceDetail;
