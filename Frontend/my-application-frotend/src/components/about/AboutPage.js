import React from "react";
import AboutBanner from "./AboutBanner";
import Header from "../header/Header";
import Card from "./Card";
import Mission from "./Mission";
import Value from "./Value";
import "../../style/about.css";
import WhyChoose from "./WhyChoose";
import ReviewCarousel from "./ReviewCarousel";
import StatsCounter from "./StatsCounter";
import Footer from '../footer/Footer'

const AboutPage = () => {
  return (
    <div>
      <Header />
      <AboutBanner />
      <Card />
      <Mission />
      <Value />
      <WhyChoose />
      <ReviewCarousel />
      <StatsCounter />
      <Footer />
    </div>
  );
};

export default AboutPage;
