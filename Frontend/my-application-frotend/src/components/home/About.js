import React from "react";
import "../../style/home.css";
import images from "../../assets/images";
import { Link } from 'react-router-dom';

const About = () => {
  
  return (
    <div className="about-container  ">
      
     <div className="container-fluid about-inside-container py-4">
     <h3 className="all-home-heading text-center">About Us</h3>
      <div className="container mx-auto py-3">
        <p className="mx-auto about-text">
          Welcome to a world of excellence and reliability. As a premier service
          provider, we pride ourselves on delivering top-notch solutions
          tailored to your needs. Our seasoned professionals are committed to
          innovation, ensuring that you receive unparalleled quality and
          customer satisfaction. Choose us for a partner dedicated to exceeding
          expectations and providing services that stand the test of time.
        </p>
        <div className="text-center py-2">
        <img  className="about-image" src={images.about} alt="" />
        </div>
        <div className="text-center mt-5 mb-1">
        <Link to="/about" >
            <button type="button" className="btn btnAbout" >
              View More
            </button>
          </Link>        
        </div>
      </div>
     </div>
    </div>
  );
};

export default About;
