import React from 'react'
import ServiceProviderSideBar from '../sidebar/ServiceProviderSideBar';
import DashboardHeader from '../dashboard/DashboardHeader';
import ServiceProviderBookingDetails from './ServiceProviderBookingDetails';
import ServiceProviderBookingStatistics from './ServiceProviderBookingStatistics';

const ServiceProviderBookingOverview = () => {
    const username = localStorage.getItem("userName");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <ServiceProviderSideBar username={username} />
        </div>
        <div className="col-lg-10">
        <DashboardHeader />
        <ServiceProviderBookingDetails />
        <ServiceProviderBookingStatistics />
       
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderBookingOverview
