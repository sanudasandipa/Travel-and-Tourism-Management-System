const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const onlinePaymentSchema = new Schema({
    Account_Number: {
        type: String,
        required: true
    },
    Card_Number: {
        type: String,
        required: true
    },
    Expiry_Date: {
        type: String,
        required: true
    },
    CVV: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('OnlinePayment', onlinePaymentSchema);
