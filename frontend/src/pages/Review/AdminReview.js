import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import DeleteuserReview from "./DeleteuserReview";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf"; // Import jsPDF library
import Navigation from '../Navigation';
import './AdminReview.css';

const Admin = () => {
  const [allFeedback, setFeedback] = useState([]); // State to store all feedback
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

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

  // Function to handle deletion of a feedback
  const handleDeleteuserReview = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:8080/userReview/deletefeedback/${feedbackId}`);
      setFeedback(allFeedback.filter((feedback) => feedback._id !== feedbackId)); // Update feedback list after deletion
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting Feedback.", error.message);
      alert("Error deleting feedback. Please try again.");
    }
  };

  // Reference for printing
  const ComponentsRef = useRef();

  // Function to handle printing feedbacks report
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Feedbacks",
    onafterprint: () => alert("Feedbacks report successfully downloaded"),
  });

  // Filter feedback based on the search term
  const filteredFeedback = allFeedback.filter((feedback) =>
    feedback.fbtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate and download PDF
  const downloadPDF = () => {
    // Generate PDF document with feedback details
    const doc = new jsPDF();
  
    // Set font sizes and styles
    doc.setFont("helvetica");
    doc.setFontSize(20);
    doc.setTextColor("#ffffff"); // Set text color to white
  
    // Title
    doc.text("Feedbacks Report", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });
  
    // Feedback details
    doc.setFontSize(12);
    doc.setTextColor("#000000"); // Set text color back to black
    filteredFeedback.forEach((feedback, index) => {
      const yPos = 50 + index * 50;
      doc.text(`Title: ${feedback.fbtitle}`, 20, yPos);
      doc.text(`Description: ${feedback.fbdescription}`, 20, yPos + 10);
      doc.text(`Rating: ${feedback.rating}`, 20, yPos + 20);
    });
  
    // Save PDF
    doc.save("feedbacks_report.pdf");
  };

  return (
    <div >
    <Navigation />
    <div className="admin-review-container" ref={ComponentsRef}>
      <h1 className="admin-review-title">All Feedback</h1>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search feedback by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="admin-review-search"
      />
      {/* Feedback table */}
      <table className="admin-review-table">
        <thead>
          <tr>
            <th className="admin-review-table-header">Title</th>
            <th className="admin-review-table-header">Description</th>
            <th className="admin-review-table-header">Rating</th>
            <th className="admin-review-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedback.map((feedback) => (
            <tr key={feedback._id} className="admin-review-table-row">
              <td className="admin-review-table-data">{feedback.fbtitle}</td>
              <td className="admin-review-table-data">{feedback.fbdescription}</td>
              <td className="admin-review-table-data"><StarRating rating={feedback.rating} /></td>
              <td className="admin-review-table-data">
                {/* Delete button for each feedback */}
                <DeleteuserReview feedbackId={feedback._id} onDeleteuserReview={() => handleDeleteuserReview(feedback._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Download report button */}
      <div className="admin-review-buttons">
        <button className="admin-review-print-button" onClick={handlePrint}>Print Report</button>
        <button className="admin-review-download-button" onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
    </div>
  );
};

export default Admin;
