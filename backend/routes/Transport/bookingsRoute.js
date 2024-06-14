const express = require('express');
const router = express.Router();
const Booking = require("../../model/Transport/booking"); // Ensure the path to the booking model is correct

router.post("/bookvehicle", async (req, res) => {
    const {
        name,
        email,
        phoneNumber,
        vehicleCode,
        startDate,
        endDate,
        passengers,
        withDriver
    } = req.body;

    try {
        const newBooking = new Booking({
            name,
            email,
            phoneNumber,
            vehicleCode,
            startDate,
            endDate,
            passengers,
            withDriver,
            transactionId: '1234' // Assuming a static transaction ID for now
        });
        const booking = await newBooking.save();
        res.status(201).json(booking); // Send response with created booking
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response
    }
});

// Modify your existing router in bookings.js

// Get all booked users
router.get("/bookings", async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Cancel booking
  router.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Booking.findByIdAndDelete(id);
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get("/getallbookings", async (req, res) => {
    
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  }
  catch (error) {
    return res.status(400).json({message: error});
  }})


module.exports = router;
