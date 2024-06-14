const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({

name: {
    type: String,
    
},
maxCount : {
    type: Number,
    
},
phonenumber : {
    type : Number,
    
},

rentperday : {
    type: String,
    
}, 
imageurls : [],

type :{
    type: String,
    
},

description : {
    type: String,
    
}




},{
timestamps : true,

})

const vehicleModel = mongoose.model('vehicles', vehicleSchema);

module.exports = vehicleModel;