const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    fbtitle: {
        type: String,
        required: true 
    },
    fbdescription: {
        type: String,
        required: true 
    },
    rating: {
        type: Number, 
        min: 0.5,      
        max: 5,
        required: true
    },
    img: {
        type: String,
    },
}, {
    timestamps: true
});

const UserReview = mongoose.model("UserReview", reviewSchema);

module.exports = UserReview;