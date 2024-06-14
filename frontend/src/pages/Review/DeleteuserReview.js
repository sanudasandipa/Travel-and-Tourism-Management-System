import React from "react";
import axios from "axios";

const DeleteuserReview = ({ feedbackId, onDeleteuserReview }) => {
  // Function to handle deletion of feedback
  const handleDelete = async () => {
    try {
      // Send DELETE request to delete the feedback with the specified ID
      await axios.delete(`http://localhost:8080/userReview/deletefeedback/${feedbackId}`);
      // Call the onDeleteuserReview function passed as prop to update the UI
      onDeleteuserReview();
      // Show success message
      alert("Feedback deleted successfully!");
    } catch (error) {
      // Log and show error message if deletion fails
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };

  return (
    // Button to trigger feedback deletion
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button type="button" className="btn" style={{ backgroundColor: "#ffcccc", color: "#ff0000", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteuserReview;
