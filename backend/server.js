require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Import the cors middleware
const cookieParser = require('cookie-parser');


const UserRoutes = require('./routes/User')
const payrollRouter = require("./routes/HR/payroll");
const employeeRouter = require("./routes/HR/employee");
const loanRouter= require("./routes/HR/loan");

const packageRoutes = require('./routes/TourPackages/TourPackageRoute');

const customer_payment_detailsRouter = require("./routes/Payment/customer_payment_details");
const offlinepaymentRouter = require("./routes/Payment/offlinepayment");
const onlinepaymentRouter = require("./routes/Payment/onlinepayment");

const vehiclesRoute = require('./routes/Transport/vehiclesRoute');
const bookingsRoute = require('./routes/Transport/bookingsRoute');

const contactRouter = require("./routes/Support/contacts.js");
const articleRouter = require("./routes/Support/articles.js"); 
const messageRouter = require("./routes/Support/messages.js"); 

const userRouter = require('./routes/Review/userReview.js');

// express app
const app = express()

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow cookies to be sent along with the request
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(cookieParser())

app.use('/auth',UserRoutes);
app.use("/payroll",payrollRouter);
app.use("/employee",employeeRouter);
app.use("/loan",loanRouter);

app.use('/packages', packageRoutes);

app.use("/customer_payment_details",customer_payment_detailsRouter);
app.use("/offlinepayment",offlinepaymentRouter);
app.use("/onlinepayment",onlinepaymentRouter);


app.use('/api/vehicles' , vehiclesRoute)
app.use('/api/bookings', bookingsRoute)

app.use("/contact", contactRouter);
app.use("/articles", articleRouter); 
app.use("/messages", messageRouter); 

app.use('/userReview', userRouter);



const port = process.env.PORT ||8080;


// connect to db
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});

// create connection with mongodb
mongoose.connect(process.env.MONGODBURL).then(()=>{
  console.log("Connected to MongoDB");
})

