import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import StarRating from "./StarRating"; // Assuming you have a StarRating component
import Navigation from '../Navigation';
import './Aboutus.css';

function AboutUS() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [highRatingCount, setHighRatingCount] = useState(0); // Define highRatingCount state here

  useEffect(() => {
    // Fetch reviews when the component mounts
    axios.get("http://localhost:8080/userReview/")
      .then((response) => {
        setReviews(response.data);
        // Calculate average rating
        if (response.data.length > 0) {
          const totalRating = response.data.reduce((acc, review) => acc + review.rating, 0);
          setAverageRating(totalRating / response.data.length);

          // Count reviews with rating greater than 4
          const highRatingReviews = response.data.filter(review => review.rating > 4);
          setHighRatingCount(highRatingReviews.length);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div >
        <Navigation />
    <div className="aboutus-root">
      <h1 className="aboutus-heading">About Us</h1>
      <p className="aboutus-description">
        A description of Travel and Tour Management in feedback. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id ullamcorper neque. Nulla facilisi. Integer nec nisi ac ipsum scelerisque tincidunt. Cras eu ex non lorem blandit vestibulum vel et metus. Aenean semper quam eget orci fermentum, vitae accumsan libero aliquet. Sed nec augue sed turpis bibendum scelerisque. 
      </p>
      <div className="aboutus-container">
        <div className="aboutus-card">
          <div className="aboutus-card-header">
            Reputable
          </div>
          <div className="aboutus-card-body">
            <p className="aboutus-card-text">
              <small className="aboutus-card-small">
                At KAYA, we value your feedback and strive to provide exceptional service. Share your experience with us through reviews and feedback. Your input helps us enhance our services and tailor them to your needs. Whether it's a suggestion, comment, or compliment, we welcome your thoughts and opinions. Together, we can create memorable and seamless travel experiences for everyone.
              </small>
            </p>
            <div className="aboutus-rating">
              <StarRating rating={averageRating} />
              <span className="aboutus-rating-info"> : {averageRating.toFixed(2)} , </span>
              <span className="aboutus-rating-count">{highRatingCount} reviews with rating ≥ ★★★★</span>
            </div>
            
            <Link to="/cusreview" className="aboutus-button">Customer Feedback</Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutUS;
