import React, { useState, useEffect } from "react";
import '../../style/serviceProvider.css'
import images from "../../assets/images";

const ViewAllServiceProvider = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/viewAllUsers/Service%20Provider")
      .then((response) => response.json())
      .then((data) => setServiceProviders(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Display only the first three service providers
  const firstThreeServiceProviders = serviceProviders.slice(0, 3);

  return (
    <div className="container-fluid home-service">
      <h3 className="all-home-heading text-center pt-5">Our Service Providers</h3>
      <div className="container pb-5">
        <div className="row row-cols-1 pt-5 row-cols-md-2 row-cols-lg-4">
          {firstThreeServiceProviders.map((serviceProvider) => (
            <div key={serviceProvider.id} className="col-lg-4 col-md-4 col-sm-12">
              <div className="card home-service-card">
                <div className="card-body py-5">
                  <h5 className="card-title text-center pb-4">
                    {serviceProvider.firstName} {serviceProvider.lastName}
                  </h5>
                  <p className="card-text text-center">Email: {serviceProvider.email}</p>
                </div>
                {/* Assuming you want to display a default image for each service provider */}
                <img
                  className="card-img-top"
                  src={images.defaultServiceProviderImage} // Replace with your default image
                  alt=""
                  style={{ width: "100%", height: "35vh" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-5 mb-1 pb-5">
          <button type="button" className="btn btnAbout mt-4">View All </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllServiceProvider;
