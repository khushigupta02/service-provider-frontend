import React from 'react'
import CustomerSideBar from '../sidebar/CustomerSideBar';
import CustomerDashboardHeader from '../dashboard/CustomerDashboardHeader';
import CustomerBookingDetails from './CustomerBookingDetails';
import CustomerBookingStatistics from './CustomerBookingStatistics';

const CustomerBookingOverview = () => {
    const username = localStorage.getItem("userName");
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar username={username} />
        </div>
        <div className="col-lg-10">
        <CustomerDashboardHeader />
        <CustomerBookingDetails/>
        <CustomerBookingStatistics/>
        </div>
      </div>
    </div>
  )
}

export default CustomerBookingOverview
