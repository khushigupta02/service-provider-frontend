import React, { useState } from "react";
import "../../style/header.css";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { Modal } from "react-bootstrap"; // Import Modal component
import Registration from "../registration/Registration";
import Login from "../login/Login";

const Header = ({ username }) => {
  const [loggedIn, setLoggedIn] = useState(!!username); // Check if user is logged in
  const [showRegistrationModal, setShowRegistrationModal] = useState(false); // State for showing registration modal
  const [showLoginModal, setShowLoginModal] = useState(false); // State for showing login modal

  const handleLogout = () => {
    console.log("Logging out...");
    // Perform logout actions here, such as clearing local storage
    setLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    {/* <Link className="navbar-brand" style={{ textDecoration: "none" }} to="/">
      <img src={images.logo} alt="" />
    </Link> */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div className="navbar-nav-container d-flex justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" style={{ textDecoration: "none" }} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={{ textDecoration: "none" }} to="/services">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={{ textDecoration: "none" }} to="/about">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={{ textDecoration: "none" }} to="#">
              Contact
            </Link>
          </li>
          {loggedIn ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" style={{ textDecoration: "none" }} to="#">
                  <img src={images.userIcon} alt="User Icon" /> {username}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ textDecoration: "none" }} to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" style={{ textDecoration: "none" }} onClick={() => setShowLoginModal(true)}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ textDecoration: "none" }} onClick={() => setShowRegistrationModal(true)}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </div>

  {/* Registration Modal */}
  <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title className="registrationHeader">Registration</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Registration onClose={() => setShowRegistrationModal(false)} />
    </Modal.Body>
  </Modal>

  {/* Login Modal */}
  <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
    <Modal.Header className="login-model-header" closeButton>
      <Modal.Title className="registrationHeader">Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Login onClose={() => setShowLoginModal(false)} />
    </Modal.Body>
  </Modal>
</nav>
  );
};

export default Header;
