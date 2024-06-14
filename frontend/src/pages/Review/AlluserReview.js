import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';
import StarRating from "./StarRating";
import { useReactToPrint } from "react-to-print";

const AlluserReview = () => {
  const [allFeedback, setFeedback] = useState([]); // State to store all feedback

  // Fetch all feedback from the server when component mounts
  useEffect(() => {
    function getFeedback() {
      axios
        .get("http://localhost:8080/userReview/")
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          alert(err.message); // Show error message if fetching fails
        });
    }

    getFeedback();
  }, []);

  // Reference for printing
  const ComponentsRef = useRef();

  // Function to handle printing feedbacks report
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Feedbacks",
    onafterprint: () => alert("Feedbacks report successfully downloaded"),
  });

  return (
    <div className="container" ref={ComponentsRef} style={{ position: "relative", boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px" }}>
      <h1 style={{ textAlign: "center" }}>All Feedback</h1>
      {/* List of feedback */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {allFeedback && allFeedback.map((feedback) => (
          <li key={feedback._id} style={{ marginBottom: "20px", padding: "10px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px", position: "relative" }}>
            <h3 style={{ marginBottom: "10px" }}>Title: {feedback.fbtitle}</h3>
            <p>Description: {feedback.fbdescription}</p>
            <p>{feedback.createdAt && formatDistanceToNow(new Date(feedback.createdAt))} ago</p>
            <div style={{ marginTop: "10px" }}>
              <span style={{ fontWeight: "bold" }}>Rating:</span> <StarRating rating={feedback.rating} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlluserReview;
