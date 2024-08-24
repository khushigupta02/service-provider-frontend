import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import "../../style/socialMedia.css";
import "../../style/tabs.css";
import api from "../instance/Api";
import images from "../../assets/images";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DashboardReviewAndSocialUser = () => {
  const [value, setValue] = useState(0);
  const [reviewData, setReviewData] = useState(null);
  const username = localStorage.getItem("userName");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/viewReviewOfProvider/${username}`
        );
        setReviewData(response.data);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
  }, [username]);
  return (
    <div className="row">
      <div className="col-lg-8 col-md-8 col-sm-8">
        <div className="dashboard-header py-3 px-4">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab className="tabs-name" label="Reviews" {...a11yProps(0)} />
                <Tab className="tabs-name" label="Comments" {...a11yProps(1)} />
                <Tab
                  className="tabs-name"
                  label="Recommendation"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {reviewData ? (
                <div>
                  {reviewData
                    .filter((review) => review.star === 4 || review.star === 5)
                    .map((review) => (
                      <div key={review.id}>
                        <div className="row pb-3 mb-3 review-box">
                          <div className="col-lg-1 col-md-1 col-sm-1">
                            <div
                              className="user-icon-container my-1"
                              style={{
                                backgroundColor: "transparent",
                                marginLeft: "-20px",
                              }}
                            >
                              <img
                                src={images.avtar}
                                alt="User Icon"
                                className="user-icon"
                              />
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-8">
                          <p className="customer-name-in-dashboard">
                              {review.customer.firstName}{" "}
                              {review.customer.lastName}
                              <span className="status-text"> - review provided by </span>
                            </p>
                            <p className="review-para">{review.feedback}</p>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-3">
                           <div className="rating-in-dashboard">
                           {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "14px",
                                  color:
                                    index < review.star
                                      ? "#FDBA01"
                                      : "rgb(7, 45, 101)",
                                  marginRight: "4px",
                                }}
                              >
                                ★
                              </span>
                            ))}
                           </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>Loading review data...</p>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              
            </CustomTabPanel>
          </Box>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4">
        <div className="dashboard-header py-3 px-4">
          <h4 className="heading-statistic">Social Media Users</h4>
          <ul className="social-icons mt-4 pb-2 list-unstyled">
            <li className="mx-1 my-4 facebook-icon">
              <FaFacebook />
              <span className=" mx-2 social-icontext">Facebook</span>
              <span className="bar">
                <CircularProgressbar
                  value={50}
                  className="circularbar"
                  strokeWidth={16}
                  styles={buildStyles({
                    pathColor: "#3b5998", // Change the color here
                  })}
                />
              </span>
            </li>
            <li className="mx-1 my-4 instagram-icon">
              <FaInstagram />{" "}
              <span className="mx-2 social-icontext">Instagram</span>
              <span className="bar">
                <CircularProgressbar
                  value={30}
                  className="circularbar"
                  strokeWidth={18}
                  styles={buildStyles({
                    pathColor: "#f02840",
                  })}
                />
              </span>
            </li>
            <li className="mx-1 my-4 linkedin-icon">
              <FaLinkedin />{" "}
              <span className="mx-2 social-icontext">Linkedin</span>
              <span className="bar">
                <CircularProgressbar
                  value={70}
                  className="circularbar"
                  strokeWidth={18}
                  styles={buildStyles({
                    pathColor: "#0077b5",
                  })}
                />
              </span>
            </li>
            <li className="mx-1 my-4 twitter-icon">
              <FaTwitter />{" "}
              <span className=" mx-2 social-icontext">Twitter</span>
              <span className="bar">
                <CircularProgressbar
                  value={40}
                  className="circularbar"
                  strokeWidth={18}
                  styles={buildStyles({
                    pathColor: "#1da1f2",
                  })}
                />
              </span>
            </li>
            <li className="mx-1 mt-4 email-icon">
              <FaEnvelope /> <span className="mx-2 social-icontext">Email</span>
              <span className="bar">
                <CircularProgressbar
                  value={79}
                  className="circularbar"
                  strokeWidth={18}
                  styles={buildStyles({
                    pathColor: "#009155",
                  })}
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardReviewAndSocialUser;
