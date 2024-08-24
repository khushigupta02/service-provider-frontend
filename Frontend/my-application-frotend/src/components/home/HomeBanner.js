import React, { useState, useEffect } from "react";
import "../../style/home.css";
import images from "../../assets/images";
import Carousel from "react-bootstrap/Carousel";

const HomeBanner = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = [
    "Your Reliable Service Partner",
    "Quality Services, Every Time",
    "Exceeding Expectations",
  ];

  const [subTitleIndex, setSubTitleIndex] = useState(0);
  const subTitles = [
    "Delivering exceptional services to meet your needs",
    "Explore our range of services designed just for you",
    "Experience excellence with our dedicated service team",
  ];

  const [imageIndex, setImageIndex] = useState(0);
  const imageSequence = [images.c4, images.c2, images.c1];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      setSubTitleIndex((prevIndex) => (prevIndex + 1) % subTitles.length);
      setImageIndex((prevIndex) => (prevIndex + 1) % imageSequence.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel>
      {titles.map((title, index) => (
        <Carousel.Item key={index} interval={1500}>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner-content">
                <p className="banner-top">Service Provider , </p>
                <h3 className="banner-title mt-4">{title}</h3>
                <p className="banner-subtitle my-3 mx-2">{subTitles[index]}</p>
                {/* <svg viewBox="45 60 400 320" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="black"
                    d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210"
                    mask="url(#knockout-text)"
                  />
                  <mask id="knockout-text">
                    <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
                    <text x="147" y="227" fill="white">
                      Know More 
                    </text>
                  </mask>
                  
                </svg> */}
                <button className="brk-btn mt-4 mx-2">
                  Know More
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <img className="bannerImg" src={imageSequence[index]} alt="" />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HomeBanner;
