import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import StarRating from "./StarRating";
import './UpdateReview.css'; // Import CSS file for styling

const UpdateReview = () => {
    const { id } = useParams();
    const [fbtitle, setFbtitle] = useState("");
    const [fbdescription, setFbdescription] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate(); // Get the review ID from the URL

    useEffect(() => {
        // Fetch the review details using the ID
        axios.get(`http://localhost:8080/userReview/${id}`)
            .then((result) => {
                const { fbtitle, fbdescription, rating } = result.data;
                setFbtitle(fbtitle);
                setFbdescription(fbdescription);
                setRating(rating);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/userReview/update/${id}`, { fbtitle, fbdescription, rating })
            .then(result => {
                console.log(result);
                navigate('/MyReview');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className="update-review-container">
                <h3 className="update-review-title">Update Review</h3>
                <form onSubmit={update}>
                    <div className="input-group">
                        <label className="update-review-label" htmlFor="fbtitle">Feedback Title:</label>
                        <select id="fbtitle" value={fbtitle} onChange={(e) => setFbtitle(e.target.value)} required>
                            <option value="">Select Title </option>
                            <option value="KayaReview">Kaya Review</option>
                            <option value="TourPackage">Tour Package</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Restaurants">Restaurants</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="update-review-label" htmlFor="fbdescription">Feedback Description:</label>
                        <input className="update-review-input" type="text" id="fbdescription" value={fbdescription} onChange={(e) => setFbdescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                       <label htmlFor="rating">Rate the feedback:</label>
                      <StarRating rating={rating} onRatingChange={setRating} />
                     </div>
                    <br />
                    <button className="update-review-button" type="submit">Save Changes</button>
                    <button className="update-review-button" type="button" onClick={() => navigate('/ReviewPage')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateReview;
