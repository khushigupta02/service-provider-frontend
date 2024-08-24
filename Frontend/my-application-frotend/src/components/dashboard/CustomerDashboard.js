import React, { useEffect } from 'react';
import "../../style/header.css";
import CustomerSideBar from '../sidebar/CustomerSideBar';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerBookingDetails from './CustomerBookingDetails';
import CustomerGraph from './CustomerGraph';

const CustomerDashboard = () => {
 
  const username = localStorage.getItem("userName"); 

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-2'>
        <CustomerSideBar username={username} />
        </div>
        <div className='col-lg-10'>
          <CustomerDashboardHeader />
          <CustomerBookingDetails />
          <CustomerGraph />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
