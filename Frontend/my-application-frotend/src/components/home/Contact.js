import React from "react";
import "../../style/home.css";
import Connect from "../contact/Connect";

const Contact = () => (
  <div className="container-fluid home-contact py-5">
    <div className="container pt-5 pb-2">
      <div className="home-contact-form">
        <div className="row mx-auto">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <h3 className="contact-heading">Get In Touch With Us</h3>
            <p className="contact-text">
              Reach out for exceptional service. Connect with us today!
            </p>
            <Connect />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input type="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile Number *</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message *</label>
                <textarea className="form-control" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-contact-send px-5">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
