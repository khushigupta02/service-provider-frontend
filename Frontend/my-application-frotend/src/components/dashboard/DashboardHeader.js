import React from "react";
import { BsSearch, BsBell } from "react-icons/bs";
import images from "../../assets/images";
import "../../style/dashboard.css"
const DashboardHeader = () => {

  const username = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");
  return (
    <div className="container-fluid dashboard-header my-4 py-3">
      <div className="row ">
        <div className="col-lg-7 col-md-7 col-sm-7">
          <div className="px-3 mt-2">
            <BsBell className="icon-notification mx-2" />
            <BsSearch className="icon-notification mx-2" />
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
          <div className="profile-content  ">
            <p className="profile-content-username">{username}</p>

            <p className="profile-user-type">{userRole}</p>
          </div>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1">
          <div className="user-profile">
            <div
              className="user-icon-container"
              style={{ backgroundColor: "transparent" }}
            >
              <img src={images.avtar} alt="User Icon" className="user-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
