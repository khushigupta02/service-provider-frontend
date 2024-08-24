import React, { useEffect } from "react";
import "../../style/header.css";
import ServiceProviderSideBar from "../sidebar/ServiceProviderSideBar";
import "../../style/dashboard.css";

import DashboardHeader from "./DashboardHeader";
import DashboardProviderStatistics from "./DashboardProviderStatistics";
import DashboardProviderGraph from "./DashboardProviderGraph";
import DashboardReviewAndSocialUser from "./DashboardReviewAndSocialUser";

const ServiceProviderDashboard = () => {
  const username = localStorage.getItem("userName");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <ServiceProviderSideBar username={username} />
        </div>
        <div className="col-lg-10">
        <DashboardHeader />
        <DashboardProviderStatistics />
        <DashboardProviderGraph />
        <DashboardReviewAndSocialUser />
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
