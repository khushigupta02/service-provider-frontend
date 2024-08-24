import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/serviceProvider.css"; // Import your CSS file for styling
import images from "../../assets/images";

const OurServiceProvider = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/viewAllUsers/Service%20Provider")
      .then((response) => response.json())
      .then((data) => setServiceProviders(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const firstThreeServiceProviders = serviceProviders.slice(0, 4);
  const defaultImage = images.defaultServiceProviderImage;

  return (
    <div className="container-fluid text-center home-service-provider pt-3">
      <h3 className="all-home-heading text-center pt-5">
        Our Service Providers
      </h3>
      <div className="container pt-3 pb-5 mt-2 mb-5">
        <div className="row row-cols-1 pt-5 row-cols-md-2 row-cols-lg-4">
          {firstThreeServiceProviders.map((serviceProvider) => (
            <div
              key={serviceProvider.id}
              className="col-lg-3 col-md-6 col-sm-12 service-provider-card"
            >
              <Link
                to={`/service/${serviceProvider.id}`}
                className="card-link "
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="home-service-provider-card">
                  <img
                    className="img-top"
                    src={images.ourteam}
                    alt="Service Provider"
                  />
                  <h5 className="pt-4  service-provider-name text-center">
                    {serviceProvider.firstName} {serviceProvider.lastName}
                  </h5>
                  {serviceProvider.serviceName && (
                    <p className="service-provider-service-name">
                      <b className="fixed-service">Service Provided : </b>
                      <span className="selected">{serviceProvider.serviceName}</span>
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 mb-1 pb-5">
          <button type="button" className="btn btnServiceProvider  mt-4">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurServiceProvider;
