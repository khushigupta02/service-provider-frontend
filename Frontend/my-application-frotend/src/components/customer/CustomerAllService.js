import React, { useEffect, useState } from "react";
import "../../style/allService.css";
import CustomerSideBar from "../sidebar/CustomerSideBar";
import axios from "axios";
import api from "../instance/Api.js";
import "../../style/table.css";
import { Link, useNavigate } from "react-router-dom";

const CustomerAllService = () => {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [serviceStatus, setServiceStatus] = useState({});

  const [status, setStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);

  const navigate = useNavigate();

  const servicesPerPage = 10;
  const totalPages = Math.ceil(totalServices / servicesPerPage);

  console.log("Current Page:", currentPage);
  console.log("Total Pages:", totalPages);
  const username = localStorage.getItem("userName");

  useEffect(() => {
    const fetchServices = async (order) => {
      try {
        const url = order
          ? `http://localhost:8080/sortAllService/${order}`
          : "http://localhost:8080/viewAllServiceAndProvider";
        const response = await api.get(url);
        setServices(response.data);
        // Update totalServices with the total count of services
        setTotalServices(response.data.length); // Assuming response.data is an array of services
      } catch (error) {
        setError(error.message);
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchServices(sortOrder);
  }, [sortOrder]);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        let response;
        if (searchKeyword.trim() === "") {
          response = await api.get(
            "http://localhost:8080/viewAllServiceAndProvider"
          );
        } else {
          response = await api.get(
            `http://localhost:8080/searchAllService/${searchKeyword}`
          );
        }
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchKeyword]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await api.get(
          "http://localhost:8080/viewAllServiceAndProvider"
        );
        setServices(response.data);
        if (response.data && response.data.length > 0) {
          setServiceId(response.data[0].service.id); // Assuming response.data is an array and setting the first service ID
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchSearchResults();
  }, []);

  useEffect(() => {
    const fetchStatus = async (username, serviceId) => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewBookedServiceStatus/${username}/${serviceId}`
        );
        setServiceStatus((prevState) => ({
          ...prevState,
          [serviceId]: response.data,
        }));
      } catch (error) {
        setError(error.message);
        console.error(
          "There was a problem with fetching service status:",
          error
        );
      }
    };

    services.forEach((service) => {
      fetchStatus(username, service.id); // Pass username and service.id to fetchStatus
    });
  }, [username, services]); // Remove serviceId dependency

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortOptions(false); // Close the sort options dropdown
  };

  const redirectToServiceDetail = (serviceId) => {
    // Redirect to the service detail page with the service ID
    navigate(`/serviceDetail/${serviceId}`);
  };

  const redirectToProviderDetail = (providerId) => {
    // Redirect to the service detail page with the service ID
    navigate(`/serviceProviderDetail/${providerId}`);
  };

  const redirectToFullServiceDetailWithProvider = (serviceId) => {
    navigate(`/serviceDetailWithProvider/${serviceId}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="container table-content">
            <div className="row edit-heading-row mb-3">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h2 className="edit-heading">Services & Providers</h2>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  value={searchKeyword}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="dropdown">
                  <button
                    className="btn sortButton px-4 py-2 dropdown-toggle"
                    type="button"
                    id="sortButton"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                  >
                    Sort by Price
                  </button>
                  {showSortOptions && (
                    <ul
                      className="dropdown-menu"
                      id="dropdown-menu"
                      aria-labelledby="sortButton"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleSortChange("ASC")}
                        >
                          Lowest to Highest
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleSortChange("DESC")}
                        >
                          Highest to Lowest
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {error && <p>Error: {error}</p>}
            <table className="table-data my-4">
              <thead>
                <tr className="table-heading">
                  <th>ID</th>
                  <th>Service Name</th>
                  <th>Provider Name</th>
                  <th>
                    Price
                    <span
                      style={{
                        textTransform: "lowercase",
                        fontWeight: "300",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      (in hourly)
                    </span>
                  </th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((service, index) => (
                  <tr key={index + indexOfFirstService}>
                    <td>{index + indexOfFirstService + 1}</td>
                    <td>
                      {/* Button to redirect to service detail page */}
                      <p
                        className="service-detail-link"
                        onClick={() => redirectToServiceDetail(service.id)}
                      >
                        {service.service.serviceName}
                      </p>
                    </td>
                    <td>
                      <p
                        className="service-detail-link"
                        onClick={() =>
                          redirectToProviderDetail(service.serviceProvider.id)
                        }
                      >
                        {" "}
                        {service.serviceProvider.firstName}{" "}
                        {service.serviceProvider.lastName}
                      </p>
                    </td>
                    <td>
                      <p>{service.service.hourlyRate} ₹</p>
                    </td>

                    <td>
                      {serviceStatus && serviceStatus[service.id] ? (
                        <Link to={`/serviceDetail/${service.id}`}>
                          <button className="btn booked-service-btn-status ">
                            {serviceStatus[service.id]}
                          </button>
                        </Link>
                      ) : (
                        <Link to={`/serviceDetail/${service.id}`}>
                          <button className="btn book-service-detail-btn ">
                            Book Service
                          </button>
                        </Link>
                      )}
                    </td>

                    <td>
                      <button
                        className="btn view-service-detail-btn"
                        onClick={() =>
                          redirectToFullServiceDetailWithProvider(service.id)
                        }
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                className="btn sortButton mx-3 px-3"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn sortButton px-4"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerAllService;
