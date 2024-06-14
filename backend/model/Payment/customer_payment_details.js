const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customer_payment_detailsSchema = new Schema({
    
    First_Name : {
        type : String,
        required: true
    },
    Last_name : {
        type : String,
        required: true
    },
    Phone: {
        type : Number,
        required: true
    },
    E_mail: {
        type : String,
        required: true
    },
    Amount:{
        type: Number,
        required: true
    },
    Service:{
        type: String,
        required: true
    }

})

const customer_payment_details = mongoose.model("customer_payment_details",customer_payment_detailsSchema); 

module.exports = customer_payment_details;