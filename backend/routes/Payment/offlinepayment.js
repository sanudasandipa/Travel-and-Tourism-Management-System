const express = require("express");
const router = express.Router();
const OfflinePayment = require("../../model/Payment/offlinepayment");

// Route to add a new offline payment
router.post("/add", async (req, res) => {
    try {
        const { Bank, Branch, Paid_Date, Upload_Slip } = req.body;

        // Ensure that all necessary fields are present
        if (!Bank || !Branch || !Paid_Date || !Upload_Slip) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPayment = new OfflinePayment({
            Bank,
            Branch,
            Paid_Date,
            Upload_Slip
        });

        await newPayment.save();

        res.json("Offline Payment Information Added");
    } catch (err) {
        console.error("Error adding offline payment information:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to get all offline payments
router.get("/", async (req, res) => {
    try {
        const payments = await OfflinePayment.find();
        res.json(payments);
    } catch (err) {
        console.error("Error getting offline payments:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to get offline payment by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await OfflinePayment.findById(id);
        res.json(payment);
    } catch (err) {
        console.error("Error getting offline payment by ID:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});


// Route to update offline payment by ID
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { Bank, Branch, Paid_Date } = req.body;

        // Ensure that all necessary fields are present
        if (!Bank || !Branch || !Paid_Date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedPayment = await OfflinePayment.findByIdAndUpdate(id, {
            Bank,
            Branch,
            Paid_Date
        }, { new: true });

        res.json({ message: "Offline Payment Information Updated", payment: updatedPayment });
    } catch (err) {
        console.error("Error updating offline payment information:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to delete offline payment by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPayment = await OfflinePayment.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ message: "Offline Payment not found" });
        }

        res.json({ message: "Offline Payment Information Deleted", payment: deletedPayment });
    } catch (err) {
        console.error("Error deleting offline payment information:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

module.exports = router;
