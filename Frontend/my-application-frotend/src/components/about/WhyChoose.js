import React from "react";
import "../../style/about.css";
import images from "../../assets/images";

const WhyChoose = () => {
  return (
    <div className="container-fluid why-choose-us-main">
      {/* <h3 className="all-home-heading text-center mt-5  pt-4 pb-2">
        Why choose us?
      </h3> */}

      <div className="container-fluid why-choose-us  py-5">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-first">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-first1">
                <div className="why-choose-point1 ">
                  <div className="icon">
                    <i
                      class="fa fa-cogs"
                      style={{ fontSize: "45px", color: "white" }}
                    ></i>
                  </div>
                  <div className="why-choose-point1-content py-2">
                    <h3 className="mx-auto wcu-h mt-4">Expertise</h3>
                    <p className="mx-auto wcu-p">
                      Our team consists of highly skilled professionals with
                      expertise in describe relevant areas
                    </p>
                  </div>
                </div>
                <div className="why-choose-point2 ">
                  <div className="icon">
                    <i
                      class="fa fa-user"
                      style={{ fontSize: "45px", color: "#5B732F" }}
                    ></i>
                  </div>
                  <div className="why-choose-point2-content py-2">
                    <h3 className="mx-auto wcu-h wcu1-h mt-4">
                      Customer Satisfaction
                    </h3>
                    <p className="mx-auto wcu-p wcu1-p">
                      We prioritize customer satisfaction and go above and
                      beyond to ensure our clients are happy with our services.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12"></div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div className="why-choose-img">
              <img
                src={images.whyy}
                alt=""
                style={{ width: "100%", height: "60vh" }}
              />{" "}
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-5 col-second">
            <div className="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-second1">
                <div class="why-choose-main py-5">
                  <h3 class="why-choose-heading text-center ">
                    WHY <br />
                    CHOOSE US?
                  </h3>
                  <p class="why-choose-para text-center px-4 py-2 mx-4">
                    Reliable expertise tailored to exceed your needs, ensuring
                    satisfaction and success.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="col-lg-6 col-md-6 col-sm-6  why-choose-point1">
                {" "}
                <div className="icon">
                  <i
                    class="fa fa-certificate	"
                    style={{ fontSize: "45px", color: "white" }}
                  ></i>
                </div>
                <div className="why-choose-point1-content py-2">
                  <h3 className="mx-auto wcu-h mt-4">Innovation</h3>
                  <p className="mx-auto wcu-p">
                    We stay ahead of the curve by embracing new technologies to
                    deliver cutting-edge solutions.{" "}
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6  why-choose-point1" style={{background:"black"}}>
                {" "}
                <div className="icon">
                  <i
                    class="fa fa-smile-o"
                    style={{ fontSize: "45px", color: "white" }}
                  ></i>
                </div>
                <div className="why-choose-point1-content py-2">
                  <h3 className="mx-auto wcu-h mt-4">Reliability</h3>
                  <p className="mx-auto wcu-p">
                  Consistent delivery on promises, surpassing expectations, and meeting deadlines unfailingly.{" "}
                  </p>
                </div>
              </div>            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
