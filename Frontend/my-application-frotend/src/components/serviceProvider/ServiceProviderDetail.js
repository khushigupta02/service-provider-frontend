import React, { useEffect, useState } from "react";
import "../../style/header.css";
import CustomerSideBar from "../sidebar/CustomerSideBar";
import api from "../instance/Api";
import { Link, useParams } from "react-router-dom";
import {
  FaEnvelopeOpen,
  FaFacebook,
  FaHouseUser,
  FaInstagram,
  FaLinkedin,
  FaStar,
  FaTools,
  FaTwitter,
} from "react-icons/fa";
import images from "../../assets/images";
import "../../style/serviceProviderDetails.css";
const ServiceProviderDetail = () => {
  const [serviceProvider, setServiceProvider] = useState(null);
  const [serviceProviderUsername, setServiceProviderUsername] = useState(null);
  const [userService, setUserServices] = useState(null);

  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/findServiceProviderById/${id}`
        );
        setServiceProvider(response.data);
        setServiceProviderUsername(response.data.userName);
      } catch (error) {
        setError(error.message);
        console.error(
          "There was a problem with fetching service details:",
          error
        );
      }
    };

    fetchServiceDetails();
  }, [id]);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewAllServiceByServiceProviderUsername/${serviceProviderUsername}`
        );
        setUserServices(response.data);
      } catch (error) {
        setError(error.message);
        console.error(
          "There was a problem with fetching service details:",
          error
        );
      }
    };

    fetchService();
  }, [serviceProviderUsername]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar />
        </div>
        <div className="col-lg-10">
          {error && <p>Error: {error}</p>}
          {serviceProvider && (
            <div className="service-req-provider-details-section pb-5 mt-4 px-3 py-2">
              <div className="mx-auto ">
                <div className="row">
                  <div className="col-lg-1 col-sm-1 col-md-1">
                    <div className="provider-avatar">
                      <img
                        src={images.avtar}
                        alt="User Icon"
                        className="provider-icon"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="profiler-header-content">
                      <p className="provider-name-req-page">
                        {serviceProvider.firstName} {serviceProvider.lastName}
                      </p>
                      <p className="provider-name-req-pag-title  ">
                        service provider
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="social-main-icon">
                    <div className="social-icons pb-2">
                      <Link className="mx-1 facebook-icon">
                        <FaFacebook />
                      </Link>
                      <Link className="mx-1 instagram-icon">
                        <FaInstagram />
                      </Link>
                      <Link className="mx-1 linkedin-icon">
                        <FaLinkedin />
                      </Link>
                      <Link className="mx-1 twitter-icon">
                        <FaTwitter />
                      </Link>
                      <Link className="mx-1 email-icon">
                        <FaEnvelopeOpen />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2mx-4">
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <div className="stat-box">
                    <div className="stat-box-item  py-3 px-4">
                      <div className="stat-box-item-content d-flex align-items-center justify-content-between">
                        <div>
                          <p className="stat-label">Total Service Count</p>
                          <p className="stat-value-provider mt-1">24 +</p>
                        </div>
                        <span>
                          <FaHouseUser className="icon-on-provider-profile" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <div className="stat-box">
                    <div className="stat-box-item py-3 px-4">
                      <div className="stat-box-item-content d-flex align-items-center justify-content-between">
                        <div>
                          <p className="stat-label">Served Service Count</p>
                          <p className="stat-value-provider mt-1">24 +</p>
                        </div>
                        <span>
                          <FaTools className="icon-on-provider-profile" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <div className="stat-box">
                    <div className="stat-box-item py-3 px-4">
                      <div className="stat-box-item-content d-flex align-items-center justify-content-between">
                        <div>
                          <p className="stat-label">Rating</p>
                          <p className="stat-value-provider mt-1">4.5/5</p>
                        </div>
                        <span>
                          <FaStar className="icon-on-provider-profile" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 pt-2 mx-4 ">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="provider-info-box provider-personal-info py-3 px-4">
                    <h3 className=" mb-2 pb-1 edit-subheadeing">
                      Personal Information
                    </h3>
                    <div className="row mb-1 ">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            First Name -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.firstName} {""}
                              {serviceProvider.lastName}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Last Name -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.firstName} {""}
                              {serviceProvider.lastName}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-1 ">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Username -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.userName} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Email -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.email} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Gender -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.gender} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Date of Birth -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.dob} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Phone Number -
                            <span className="label-provider-info-value">
                              {" "}
                              +91 - {serviceProvider.phoneNumber} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6"></div>
                    </div>
                    <div className="row mb-1 mt-3">
                      <div className="col-lg-12 col-md-12 col-sm-12¯">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Bio -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.bio} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="provider-info-box provider-address-info  py-3 px-4">
                    <h3 className=" mb-3 edit-subheadeing">
                      Address Information
                    </h3>
                    <div className="row mb-1 ">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Address -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.address.fullAddress} {""}-{" "}
                              {serviceProvider.address.zipCode} {""} ,{" "}
                              {serviceProvider.address.city.name} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-1">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            State -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.address.state.name} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Country -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.address.country.name} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-1 ">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="py-auto">
                          <label className="label-provider-info">
                            Full Address -
                            <span className="label-provider-info-value">
                              {" "}
                              {serviceProvider.address.fullAddress} {""}-{" "}
                              {serviceProvider.address.zipCode} {""} ,{" "}
                              {serviceProvider.address.city.name} {""} ,{" "}
                              {serviceProvider.address.state.name} {""} ,{" "}
                              {serviceProvider.address.country.name} {""}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 pt-2 mx-4 ">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="provier-service-info-box provider-personal-info py-3 px-4">
                    <h3 className=" mb-2 pb-1 edit-subheadeing">
                      Sevice Information
                    </h3>
                    <h3 className="mx-auto mb-2 mt-2 pt-1 edit-subheadeing-for-service">
                      Existing Service Offering
                    </h3>
                    <div className="row mb-3 px-3">
                      <table className="table-data my-2 ">
                        <thead>
                          <tr className="table-heading">
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th></th>
                            <th>Price </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {userService &&
                            userService.map((service, index) => (
                              <tr key={index} className="table-row-service-detail">
                                <td>{index + 1}</td>{" "}
                                {/* Index starts from 0, so add 1 for auto-increment */}
                                <td>{service.serviceName}</td>
                                <td>{service.serviceType.name}</td>
                                <td></td>
                                <td>{`${service.hourlyRate} ₹`}</td>
                                <td><FaTools className="icon-on-provider-profile"/></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetail;
