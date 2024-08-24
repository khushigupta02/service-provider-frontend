// ViewAllService.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../style/home.css'
import images from "../../assets/images";
const ViewAllService = () => {
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/viewAllService")
      .then((response) => response.json())
      .then((data) => setServiceDetails(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const firstThreeServices = serviceDetails.slice(0, 3);
  const cardImages = [images.card1, images.card2 , images.card333];

  return (
    <div className="container-fluid home-service ">
      <h3 className="all-home-heading text-center pt-5">Our Service</h3>
      <div className="container  pb-5">
        {/* <div className="row row-cols-1 pt-5 row-cols-md-2 row-cols-lg-4 g-4">
          {serviceDetails.map((service) => (
            <div key={service.id} className="col">
              <Link
                to={`/service/${service.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card">
                  <img
                    className="card-img-top"
                    src={images.service}
                    alt=""
                    style={{ width: "100%", height: "27vh" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{service.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div> */}
       <div className="row row-cols-1 pt-5 row-cols-md-2 row-cols-lg-4 ">
          {firstThreeServices.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-4 col-sm-12">
              <Link
                to={`/service/${service.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={`card home-service-card${index + 1}`}>
                  <div className="card-body py-5">
                    <h5 className="card-title text-center pb-4">{service.serviceName}</h5>
                    {/* <p className="card-text text-center">{service.description}</p> */}
                    <p className="card-text text-center">Hourly Rate: ${service.hourlyRate}</p>
                  </div>
                  <img
                    className="card-img-top"
                    src={cardImages[index]}
                    alt=""
                    style={{ width: "100%", height: "35vh" }}
                  />
                </div>
              </Link>
            </div>
          ))}
          </div>
          <div className="text-center mt-5 mb-1 pb-5">
        <button type="button" class="btn btnAbout mt-4">View All </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllService;
