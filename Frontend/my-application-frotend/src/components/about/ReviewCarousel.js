import React, { useState, useEffect } from "react";
import "../../style/review.css";
import images from "../../assets/images";
import axios from "axios";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/viewAllReview`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching provider activities:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handleDotClick = (index) => {
    setCurrentReviewIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === totalPages - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <div className="container-fluid review-carousel mt-2 pt-4">
      <h4 className="all-home-heading review-heading pt-4 pb-3 text-center">
        Our Happy Customers
      </h4>

      <div className="container-fluid review-carousel-under pb-1">
        {reviews
          .slice(
            currentReviewIndex * reviewsPerPage,
            currentReviewIndex * reviewsPerPage + reviewsPerPage
          )
          .filter((review) => review.star === 4 || review.star === 5)
          .map(
            (review, index) =>
              review && (
                <div className="review" key={index}>
                  <div
                    className="user-icon-container text-center"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <img
                      src={images.avtar}
                      alt="User Icon"
                      className="user-icon"
                    />
                    {[...Array(5)].map((_, index) => (
                      <span
                        className="mt-5 pt-2"
                        key={index}
                        style={{
                          cursor: "pointer",
                          fontSize: "14px",
                          color:
                            index < review.star ? "#FDBA01" : "rgb(7, 45, 101)",
                          marginRight: "4px",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {/* Uncomment these lines if you want to display the name and feedback */}
                  <h3 className="name mt-4 pt-1">
                    {review.customer.firstName} {review.customer.lastName}
                  </h3>
                  <p className="feedback py-2">" {review.feedback} "</p>
                </div>
              )
          )}
      </div>

      <div className="dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentReviewIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
