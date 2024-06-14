import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import './CoustormerReview.css';

const CustomerReview = () => {
  const [allFeedback, setFeedback] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function getFeedback() {
      axios
        .get("http://localhost:8080/userReview/")
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getFeedback();
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/validate-token', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserRole();
  }, []);

  const ComponentsRef = useRef();

  return (
    <div >
    <Navigation />
    <div className="customerreview-container">
      <div className="customerreview-container">
        <div className="customerreview-reviews-container" ref={ComponentsRef}>
          <h1>KAYA Reviews</h1>
          <p>Since 2000, we've been curating unforgettable travel experiences for our customers. With over 24 years of expertise, we offer tailored holiday packages to Sri Lanka and more. Our dedicated team ensures personalized itineraries and significant savings, thanks to our long-standing supplier relationships. Join over satisfied customers and discover why they trust us with their dream getaways.</p>

          <h2>Customer Service Reviews</h2>
          <ul className="customerreview-feedback-list">
            {allFeedback && allFeedback.map((feedback) => (
              <li key={feedback._id} className="customerreview-feedback-item">
                <h3>{feedback.fbtitle}</h3>
                <h3>{feedback.fbdescription}</h3>
                <div className="customerreview-feedback-info">
                  <span></span> <StarRating rating={feedback.rating} />
                  <h3>{feedback.createdAt && formatDistanceToNow(new Date(feedback.createdAt))} ago</h3>
                </div>
                {feedback.img && <img src={feedback.img} alt="img" className="customerreview-feedback-image" />}
              </li>
            ))}
          </ul>
        </div>
        <div className="customerreview-image-card">
          <div className="customerreview-card">
            {isLoggedIn && (
              <>
                <div>
                  <Link to="/addfeedback">
                    <button className="customerreview-add-feedback-button">Add Review</button>
                  </Link>
                  <Link to="/MyReview">
                    <button className="customerreview-my-review-button">My Review</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CustomerReview;
