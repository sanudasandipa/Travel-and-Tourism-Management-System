import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import './MyReview.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [sender, setSender] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/validate-token2', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setSender(data.email);
        } else {
          setSender('');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/userReview/by-email/${sender}`);
        setReviews(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to fetch reviews');
        setIsLoading(false);
      }
    };

    if (sender) {
      fetchReviews();
    }
  }, [sender]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/userReview/delete/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (isLoading) {
    return <div className="my-review-loading">Loading...</div>;
  }

  if (error) {
    return <div className="my-review-error">{error}</div>;
  }

  return (
    <div >
    <Navigation />
    <div className="my-review-container">
      <h1 className="my-review-heading">My Reviews</h1>
      <ul className="my-review-list">
        {reviews.map(review => (
          <li key={review._id} className="my-review-item">
            <div className="my-review-email">Email: {review.email}</div>
            <div className="my-review-title">Title: {review.fbtitle}</div>
            <div className="my-review-description">Description: {review.fbdescription}</div>
            <div className="my-review-rating">Rating: {review.rating}</div>
            <div className="my-review-image">{review.img && <img src={review.img} alt="img" className="my-review-img" />}</div>
            <button onClick={() => handleDelete(review._id)} className="my-review-delete-button">Delete</button>
            <Link to={`/UpdateReview/${review._id}`} className="my-review-update-button">Update</Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default ReviewPage;
