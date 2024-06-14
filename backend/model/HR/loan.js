const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanSchema = new Schema({
   
    Employee_Name : {
        type : String,
        required: true
    },
    Department : {
        type : String,
        required: true
    },
    Loan_Amount : {
        type : Number,
        required: true
    },
    Interest_rate : {
        type : Number,
        required: true
    },
    Premium : {
        type : Number,
        required: true
    },
    Repayment_period : {
        type : Number,
        required: true
    },
    Conditions : {
        type : String,
        required: true
    }



});

const loan = mongoose.model("loan",loanSchema); 

module.exports = loan;