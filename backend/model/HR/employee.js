const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    Employee_Name: {
        type: String,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Status: {
        type: String, 
        required: true
    },
    Start_Date: {
        type: Date,
        required: true
    },
    Department: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('employee', employeeSchema);
