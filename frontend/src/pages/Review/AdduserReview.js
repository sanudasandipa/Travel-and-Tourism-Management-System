import React, { useState, useEffect } from "react";
import axios from "axios";
import StarRating from "./StarRating";
import { FaCommentAlt } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Navigation from '../Navigation';
import './AddUserReview.css';


const AdduserReview = () => {
  const [fbtitle, setTitle] = useState("");
  const [fbdescription, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/validate-token2", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setEmail(data.email);
        } else {
          setEmail("");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setUploading(true);
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      const uploadTask = fileRef.put(selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
          setUploadError("Error uploading file.");
          setUploading(false);
        },
        () => {
          // Upload complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImg(downloadURL);
            setUploading(false);
          });
        }
      );
    } else {
      console.log("no file selected");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    const titleRegex = /^[^\d]+$/;
    if (!titleRegex.test(fbtitle)) {
      alert("Title should not contain numbers.");
      return;
    }
    if (!fbdescription || fbdescription.trim() === "" || rating === 0) {
      alert("Description and rating are required.");
      return;
    }
    try {
      const newFeedback = {
        email,
        fbtitle,
        fbdescription,
        rating,
        img,
      };
      console.log("Sending feedback data:", newFeedback); // Added for debugging

      const response = await axios.post("http://localhost:8080/userReview/addfeedback", newFeedback);
      console.log("Server response:", response.data); // Added for debugging

      alert("Feedback Added.");
      setEmail(email);
      setTitle("");
      setDescription("");
      setRating(0);
      setImg("");
    } catch (error) {
      console.error("Error adding feedback:", error); // Added for debugging
      alert("Failed to add feedback.");
    }
  };

  return (
    <div >
    <Navigation />
    <div className="adduserreview-container">
      <div className="adduserreview-form-container">
        <h2 className="adduserreview-heading">Share Your Feedback</h2>
        <form className="adduserreview-form" onSubmit={sendData}>
          <div className="adduserreview-form-group">
            <label htmlFor="fbtitle" className="adduserreview-label">What's your feedback about?</label>
            <select id="fbtitle" value={fbtitle} onChange={(e) => setTitle(e.target.value)} required className="adduserreview-select">
              <option value="">Select Title </option>
              <option value="KayaReview">Kaya Review</option>
              <option value="TourPackage">Tour Package</option>
              <option value="Hotel">Hotel</option>
              <option value="Restaurants">Restaurants</option>
            </select>
          </div>
          <div className="adduserreview-form-group">
            <label htmlFor="fbdescription" className="adduserreview-label"><FaCommentAlt /> Enter your Description</label>
            <textarea
              id="fbdescription"
              placeholder="Enter Feedback Description"
              value={fbdescription}
              onChange={(e) => setDescription(e.target.value)}
              className="adduserreview-textarea"
            ></textarea>
          </div>
          <div className="adduserreview-form-group">
            <label className="adduserreview-label">Rate the feedback:</label>
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <div className="adduserreview-form-group">
            <label htmlFor="img" className="adduserreview-label">Upload Image:</label>
            <input type="file" id="img" onChange={handleUpload} className="adduserreview-file-input" />
          </div>
          {uploading && <p>Uploading... {uploadProgress}%</p>}
          {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
          <button type="submit" className="adduserreview-submit-button">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AdduserReview;
