const express = require('express');
const router = express.Router();
const UserReview = require('../../model/Review/userReview');

// Route to add a new review
router.post("/addfeedback", (req, res) => {
    const { email, fbtitle, fbdescription, rating, img } = req.body;

    console.log("Received feedback data:", req.body); // Added for debugging

    // Validate that required fields are present
    if (!email || !fbtitle || !fbdescription || !rating) {
        return res.status(400).json({ error: "Email, title, description, and rating are required" });
    }

    // Create a new UserReview instance
    const newReview = new UserReview({ 
        email,
        fbtitle,
        fbdescription,
        rating,
        img
    });

    // Save the new review
    newReview.save()
        .then(() => {
            console.log("Review added successfully"); // Added for debugging
            res.json("Review Added");
        })
        .catch((err) => {
            console.error("Error adding review:", err); // Added for debugging
            res.status(500).json({ error: "Failed to add review" });
        });
});

// Route to get all reviews
router.get("/", (req, res) => {
    UserReview.find() 
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            console.error("Error fetching reviews:", err);
            res.status(500).json({ error: "Failed to fetch reviews" });
        });
});

// Get a single tour package by ID
router.get("/:id", async (req, res) => {
    try {
        const reviews = await reviews.findById(req.params.id);
        if (!reviews) {
            return res.status(404).json({ message: "Tour package not found" });
        }
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fbtitle, fbdescription, rating } = req.body;

        // Ensure that all necessary fields are present
        if (!fbtitle || !fbdescription || !rating) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updateReview = {
            fbtitle,
            fbdescription,
            rating
        };

        const updatedReview = await UserReview.findByIdAndUpdate(id, updateReview, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (err) {
        console.error("Error updating review:", err);
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
});

// Route to get user reviews for admin
router.route("/admin").get((req, res) => {
    UserReview.find() 
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            console.error("Error fetching UserReviews:", err);
            res.status(500).json({ error: "Failed to fetch UserReviews" });
        });
});

// Route to delete a feedback
router.route("/deletefeedback/:id").delete(async (req, res) => {
    const feedbackId = req.params.id; 

    try {
        // Find the feedback by ID and delete it
        await UserReview.findByIdAndDelete(feedbackId); 
        res.status(200).json({ status: "UserReview deleted" });
    } catch (err) {
        console.error("Error deleting UserReview:", err);
        res.status(500).json({ error: "Failed to delete UserReview" });
    }
});

// Route to delete a review
router.delete("/delete/:id", async (req, res) => {
    const reviewId = req.params.id; 

    try {
        // Find the review by ID and delete it
        await UserReview.findByIdAndDelete(reviewId); 
        res.status(200).json({ status: "Review deleted" });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ error: "Failed to delete review" });
    }
});


router.get('/by-email/:email', async (req, res) => {
    const email = req.params.email;
  
    try {
      const reviews = await UserReview.find({ email });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews by email:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });
module.exports = router;