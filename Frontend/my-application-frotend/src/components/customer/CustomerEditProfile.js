import React, { useState, useEffect } from "react";
import CustomerSideBar from "../sidebar/CustomerSideBar";
import axios from "axios";
import "../../style/customerEditProfile.css";
import images from "../../assets/images";
import "react-country-state-city/dist/react-country-state-city.css";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import api from "../instance/Api";
import { toast } from "react-toastify";
const CustomerEditProfile = () => {
  const username = localStorage.getItem("userName");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    phoneNumber: "",
    photo: "",
    address: {
      fullAddress: "",
      zipCode: "",
      country: {
        name: "",
      },
      state: {
        name: "",
      },
      city: {
        name: "",
      },
    },
    gender: "",
    dob: "",
    bio: "",
    createdAt: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
  });
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`http://localhost:8080/editUser/${userId}`, user);
      toast("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/findByUsername/${username}`
        );
        setUser(response.data);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [username]);
  const EyeIcon = ({ visible, toggleVisibility }) => (
    <span
      className={`eye-icon ${visible ? "visible" : ""}`}
      onClick={toggleVisibility}
    >
      {visible ? "👁️" : "👁️"}
    </span>
  );
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const isFormValid = () => {
    const { firstName, lastName, email, phoneNumber, address, gender, dob, socialMedia ,bio} = user;
    return (
      firstName &&
      lastName &&
      email &&
      phoneNumber &&
      address?.fullAddress &&
      address?.zipCode &&
      address?.country?.name &&
      address?.state?.name &&
      address?.city?.name &&
      gender &&
      dob &&
      bio &&
      socialMedia?.facebook &&
      socialMedia?.twitter &&
      socialMedia?.instagram &&
      socialMedia?.linkedin
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <CustomerSideBar username={username} />
        </div>
        <div className="col-lg-10">
          <div className="edit-profile-container container pt-2">
            <div className="row pt-1">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h2 className="edit-heading mt-4">Update Profile</h2>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 ">
                <img
                  src={images.avtar}
                  className="profile-image-on-page"
                  alt="/"
                />
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <h3 className="mx-auto mb-3 edit-subheadeing">
                Personal Information
              </h3>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={user.firstName}
                      onChange={(e) =>
                        setUser({ ...user, firstName: e.target.value })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="flex-grow-1 ms-2">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={user.lastName}
                      onChange={(e) =>
                        setUser({ ...user, lastName: e.target.value })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      className="form-select edit-gender"
                      value={user.gender}
                      onChange={(e) =>
                        setUser({ ...user, gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      value={user.dob}
                      onChange={(e) =>
                        setUser({ ...user, dob: e.target.value })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      value={user.phoneNumber}
                      onChange={(e) =>
                        setUser({ ...user, phoneNumber: e.target.value })
                      }
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
              </div>
              <h3 className="mx-auto mb-3 mt-5 edit-subheadeing">
                Address Information
              </h3>
              <div className="mb-3">
                <label className="form-label">Address <span style={{ fontSize: "11px" }}>(without country, state, city)</span></label>
               
                <textarea
                  name="textarea"
                  rows="3"
                  className="form-textarea"
                  value={`${user.address?.fullAddress ?? ""}\n${user.address?.city?.name ?? ""
                    } ${user.address?.state?.name ?? ""} ${user.address?.country?.name ?? ""
                    }`}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: {
                        ...user.address,
                        fullAddress: e.target.value.split("\n")[0], // Update fullAddress separately
                      },
                    })
                  }
                  autoComplete="off"
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Country</label>
                    <CountrySelect
                      value={user.address?.country?.id}
                      onChange={(e) => {
                        setCountryid(e.id);
                        setUser({
                          ...user,
                          address: {
                            ...user.address,
                            country: {
                              id: e.id,
                              name: e.name,
                            },
                          },
                        });
                      }}
                      placeHolder="Select Country"
                      className="country-dropdown"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">State</label>
                    <StateSelect
                      countryid={countryid}
                      value={user.address?.state?.id}
                      onChange={(e) => {
                        setstateid(e.id);
                        setUser({
                          ...user,
                          address: {
                            ...user.address,
                            state: {
                              id: e.id,
                              name: e.name,
                            },
                          },
                        });
                      }}
                      placeHolder="Select State"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">City</label>
                    <CitySelect
                      countryid={countryid}
                      stateid={stateid}
                      value={user.address?.city?.id}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          address: {
                            ...user.address,
                            city: {
                              id: e.id,
                              name: e.name,
                            },
                          },
                        });
                      }}
                      placeHolder="Select City"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Zip Code</label>
                    {/* <input
                      type="tel"
                      name="zipCode"
                      className="form-control phone-box"
                      value={user.address.zipCode}
                      onChange={(e) =>
                        setUser({ ...user, zipCode: e.target.value })
                      }
                      autoComplete="off"
                    /> */}
                    <input
                      type="tel"
                      name="zipCode"
                      className="form-control phone-box"
                      value={user.address ? user.address.zipCode : ""}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          address: {
                            ...user.address,
                            zipCode: e.target.value,
                          },
                        })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <h3 className="mx-auto mb-3 mt-5 edit-subheadeing">
                Account Information
              </h3>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">User Name</label>
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      value={user.userName}
                      autoComplete="off"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="flex-grow-1 ms-2 position-relative">
                    <label className="form-label">Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      className="form-control"
                      value={user.password}
                      readOnly
                      autoComplete="off"
                    />
                    <EyeIcon
                      visible={passwordVisible}
                      toggleVisibility={togglePasswordVisibility}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="mx-auto">
                  <label className="form-label">Date Joined</label>
                  <input
                    type="text"
                    name="createdAt"
                    className="form-control"
                    value={user.createdAt}
                    autoComplete="off"
                    readOnly
                  />
                </div>
              </div>
              <h3 className="mx-auto mb-3 mt-5 edit-subheadeing">
                Additional Information
              </h3>
              <div className="mb-3">
                <label className="form-label">Bio / Description</label>
                <br></br>
                <textarea
                  name="textarea"
                  rows="3"
                  className="form-textarea"
                  value={user.bio ? user.bio : ""}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div className="row mb-3">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="mx-auto">
                    <label className="form-label">Profile Picture</label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => {
                        // Handle file upload here
                        const file = e.target.files[0];
                        // You can now do something with the selected file, like display a preview
                        console.log(file);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Social Media Links (if applicable)
                </label>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <input
                      type="text"
                      name="facebook"
                      className="form-control"
                      placeholder="Facebook"
                      value={user.socialMedia ? user.socialMedia.facebook : ""}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialMedia: {
                            ...user.socialMedia,
                            facebook: e.target.value,
                          },
                        })
                      }
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <input
                      type="text"
                      name="twitter"
                      className="form-control"
                      placeholder="Twitter"
                      value={user.socialMedia ? user.socialMedia.twitter : ""}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialMedia: {
                            ...user.socialMedia,
                            twitter: e.target.value,
                          },
                        })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <input
                      type="text"
                      name="instagram"
                      className="form-control"
                      placeholder="Instagram"
                      value={user.socialMedia ? user.socialMedia.instagram : ""}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialMedia: {
                            ...user.socialMedia,
                            instagram: e.target.value,
                          },
                        })
                      }
                      autoComplete="off"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <input
                      type="text"
                      name="linkedin"
                      className="form-control"
                      placeholder="LinkedIn"
                      value={user.socialMedia ? user.socialMedia.linkedin : ""}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialMedia: {
                            ...user.socialMedia,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="px-3 py-2 update-btn btn mt-2"                 
  disabled={!isFormValid()}
  >
                Update{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerEditProfile;
