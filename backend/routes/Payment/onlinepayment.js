const express = require("express");
const router = express.Router();
const OnlinePayment = require("../../model/Payment/onlinepayment");


// Route to add a new online payment
router.post("/add", async (req, res) => {
    try {
        const { Account_Number, Card_Number, Expiry_Date, CVV } = req.body;

        // Ensure that all necessary fields are present
        if (!Account_Number || !Card_Number || !Expiry_Date || !CVV) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPayment = new OnlinePayment({
            Account_Number,
            Card_Number,
            Expiry_Date,
            CVV
        });

        await newPayment.save();

        res.json("Online Payment Information Added");
    } catch (err) {
        console.error("Error adding online payment information:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to get all online payments
router.get("/", async (req, res) => {
    try {
        const payments = await OnlinePayment.find();
        res.json(payments);
    } catch (err) {
        console.error("Error getting online payments:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to get online payment by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const payment = await OnlinePayment.findById(id);
        res.json(payment);
    } catch (err) {
        console.error("Error getting online payment by ID:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to update online payment by ID
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { Account_Number, Card_Number, Expiry_Date, CVV } = req.body;

        // Ensure that all necessary fields are present
        if (!Account_Number || !Card_Number || !Expiry_Date || !CVV) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedPayment = await OnlinePayment.findByIdAndUpdate(id, {
            Account_Number,
            Card_Number,
            Expiry_Date,
            CVV
        }, { new: true });

        res.json({ message: "Online Payment Information Updated", payment: updatedPayment });
    } catch (err) {
        console.error("Error updating online payment information:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Route to delete online payment by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPayment = await OnlinePayment.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({ message: "Online Payment not found" });
        }

        res.json({ message: "Online Payment Information Deleted", payment: deletedPayment });
    } catch (err) {
        console.error("Error deleting online payment information:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

module.exports = router;
