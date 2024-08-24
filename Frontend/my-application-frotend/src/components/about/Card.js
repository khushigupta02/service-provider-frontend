import React from "react";
import "../../style/about.css";
import images from "../../assets/images";

const AboutCard = ({ title, subTitle, image }) => {
  return (
    <div className="col-lg-4 col-md-4 col-sm-4">
      <div className="rounded-circle-container">
        <img src={image} alt="" className="rounded-circle" />
        <div className="content mx-2">
          <h3 className="about-card-heading pt-3">{title}</h3>
          <p className="about-card-text-para">{subTitle}</p>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  const cardData = [
    {
      title: "Quality Commitment",
      subTitle: "Delivering top-tier services through continuous professional development.",
      image: images.avtar,
    },
    {
      title: "Customer-Centric",
      subTitle: "Delivering top-tier services through continuous professional development.",
      image: images.avtar,
    },
    {
      title: "Innovation,Adaptability",
      subTitle: "Staying cutting-edge with evolving technologies and methodologies.",
      image: images.avtar,
    },
  ];

  return (
    <div className="container-fluid about-card py-3">
      <div className="container about-card-container">
        <div className="row py-2">
          {cardData.map((card, index) => (
            <AboutCard
              key={index}
              title={card.title}
              subTitle={card.subTitle}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
