const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offlinepaymentSchema = new Schema({
    Bank : {
        type : String,
        required: true
    },
    Branch : {
        type : String,
        required: true
    },
    Paid_Date: {
        type : String,
        required: true
    },
    Upload_Slip: {
        type :String,
        required: true
    }

})

const offlinepayment = mongoose.model("offlinepayment",offlinepaymentSchema); 

module.exports = offlinepayment;