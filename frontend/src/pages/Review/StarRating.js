

import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const stars = [];

  const handleStarClick = (index) => {
    const starValue = index + 1;
    let newRating;

    if (rating === starValue) {
      // If clicked on current rating, increment by 0.5
      newRating = starValue + 0.5;
      if (newRating > 5) {
        newRating = 5; // Clamp the rating to 5 if it exceeds the maximum
      }
    } else if (starValue > rating) {
      // If clicked on a higher star, increase the rating
      newRating = starValue;
    } else {
      // If clicked on a lower star, decrease the rating
      newRating = starValue - 0.5;
    }

    onRatingChange(newRating);
  };

  for (let i = 0; i < 5; i++) {
    const starValue = i + 1;
    const starFill = starValue <= rating;
    const starHalf = starValue - 0.5 === rating;
    stars.push(
      <span
        key={i}
        style={{
          cursor: "pointer",
          color: starHalf ? "#ffc107" : starFill ? "#ffc107" : "#e4e5e9",
          fontSize: starHalf ? "1.2em" : "1em",
        }}
        onClick={() => handleStarClick(i)}
      >
        {starHalf ? "☆" : starFill ? "★" : "☆"}
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default StarRating;