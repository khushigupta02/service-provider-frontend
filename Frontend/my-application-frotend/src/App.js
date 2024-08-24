import "./App.css";
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddService from "./components/service/AddService";
import AddServiceType from "./components/service/AddServiceType";
import ViewAllUser from "./components/user/ViewAllUser";
import Home from "./components/home/Home";
import ViewAllService from "./components/service/ViewAllService";
import AdminSideBar from "./components/sidebar/AdminSideBar";
import Footer from "./components/footer/Footer";
import AdminUserDataTable from "./components/admin/AdminUserDataTable";
import React from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import AddUser from "./components/user/AddUser";
import EditUser from "./components/user/EditUserDetails";
import DeleteUser from "./components/user/DeleteUser";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminAllServicesDataTable from "./components/admin/AdminAllServicesDataTable";
import AdminAddService from "./components/admin/adminOperation/AdminAddService";
import EditServiceDetail from "./components/service/EditServiceDetail";
import AdminAllCustomerDataTable from "./components/admin/AdminAllCustomerDataTable";
import AdminAllServiceProviderDataTable from "./components/admin/AdminAllServiceProviderDataTable";
import AdminAllServiceTypeDataTable from "./components/admin/AdminAllServiceTypeDataTable";
import HomeBanner from "./components/home/HomeBanner";
import AboutPage from "./components/about/AboutPage";
import ServiceProviderDashboard from "./components/dashboard/ServiceProviderDashboard";
import CustomerDashboard from "./components/dashboard/CustomerDashboard";
import Service from "./components/service/servicePage/Service";
import CustomerEditProfile from "./components/customer/CustomerEditProfile";
import ServiceProviderEditProfile from "./components/serviceProvider/ServiceProviderEditProfile";
import CustomerAllService from "./components/customer/CustomerAllService";
import ServiceDetail from "./components/service/ServiceDetail";
import ServiceProviderDetail from "./components/serviceProvider/ServiceProviderDetail";
import ServiceDetailWithProvider from "./components/service/ServiceDetailWithProvider";
import ServiceProviderNotification from "./components/serviceProvider/ServiceProviderNotification";
import CustomerHistory from "./components/customer/CustomerHistory";
import FeedbackFormModal from "./components/service/servicePage/FeedbackFormModal";
import CustomerRecentBooking from "./components/customer/CustomerRecentBooking";
import ServiceRequestFullDetail from "./components/serviceProvider/ServiceRequestFullDetail";
import CustomerDetails from "./components/customer/CustomerDetails";
import BookingServiceDetail from "./components/service/BookingServiceDetail";
import ServiceProviderHistory from "./components/serviceProvider/ServiceProviderHistory";
import ServiceProviderBookingOverview from "./components/serviceProvider/ServiceProviderBookingOverview";
import CustomerBookingOverview from "./components/customer/CustomerBookingOverview";

const App = () => {

  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customerEditProfile" element={<CustomerEditProfile />} />
      <Route path="/serviceProviderEditProfile" element={<ServiceProviderEditProfile />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/banner" element={<HomeBanner />} />
        <Route path="/viewAllService" element={<ViewAllService />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/addServiceType" element={<AddServiceType />} />
        <Route path="/viewAllUser" element={<ViewAllUser />} />
        <Route path="/adminDashboard" element={<AdminUserDataTable />} />
        <Route path="/adminSideBar" element={<AdminSideBar />} />
        <Route path="/adminAllUserDashboard" element={<AdminUserDataTable />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/deleteUser" element={<DeleteUser />} />        
        <Route path="/adminAllServiceDashboard" element={<AdminAllServicesDataTable />} />
        <Route path="/adminAllCustomerDashboard" element={<AdminAllCustomerDataTable />} />
        <Route path="/adminAllServiceProviderDashboard" element={<AdminAllServiceProviderDataTable />} />
        <Route path="/adminAllServiceTypeDashboard" element={<AdminAllServiceTypeDataTable />} />
        <Route path="/adminAddService" element={<AdminAddService />} />
        <Route path="/editService" element={<EditServiceDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/serviceProviderDashboard" element={<ServiceProviderDashboard />} />
        <Route path="/serrviceRequest/:bookingId" element={<ServiceRequestFullDetail />} />
        <Route path="/customerDetail/:bookingId" element={<CustomerDetails />} />
        <Route path="/bookingServiceDetail/:bookingId" element={<BookingServiceDetail />} />
        <Route path="/serviceProviderDetail/:id" element={<ServiceProviderDetail />} />
        <Route path="/customerDashboard" element={<CustomerDashboard />} />
        <Route path="/customerBookingOverview" element={<CustomerBookingOverview />} />
        <Route path="/customerAllService" element={<CustomerAllService />} />
        <Route path="/customerRecentActivity" element={<CustomerRecentBooking />} />
        <Route path="/serviceDetail/:id" element={<ServiceDetail />} />
        <Route path="/serviceProviderNotification" element={<ServiceProviderNotification />} />
        <Route path="/serviceProviderBookingOverview" element={<ServiceProviderBookingOverview />} />
        <Route path="/serviceProviderHistory" element={<ServiceProviderHistory />} />
        <Route path="/customerHistory" element={<CustomerHistory />} />
        <Route path="/serviceDetailWithProvider/:id" element={<ServiceDetailWithProvider />} />
        <Route path="/services" element={<Service />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
  );
};


export default App;
