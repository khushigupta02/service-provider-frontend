import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminSideBar from "../sidebar/AdminSideBar";
import "../../style/adminDashboard.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import AdminUserDataTable from "./AdminUserDataTable";

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid mx-0 px-0">
        <div className="row ">
          <div className="col-lg-2 col-md-2 col-sm-2 adminSidebar">
            <AdminSideBar />
          </div>
          <div className="col-lg-10 col-md-10 col-sm-10 p-5">
            <AdminUserDataTable />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
