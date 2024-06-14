const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payrollSchema = new Schema({
   
    Employee_Name : {
        type : String,
        required: true
    },
    Status : {
        type : String,
        required: true
    },
    Working_Hours : {
        type : Number,
        required: true
    },
    Monthly_Salary : {
        type : Number,
        required: true
    },
    EPF_Amount : {
        type : Number,
        required: true
    },
    Net_Salary : {
        type : Number,
        required: true
    }


})

const payroll = mongoose.model("payroll",payrollSchema); 

module.exports = payroll;