const router = require("express").Router();
const TourPackage = require("../../model/TourPackage/TourPackage");

// Add a new tour package
router.post("/add", async (req, res) => {
    const { package_name, customer_name, customer_NIC, phone_number, NOF_person } = req.body;

    try {
        // Ensure that all necessary fields are present
        if (!package_name || !customer_name || !customer_NIC || !phone_number || !NOF_person) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPackage = new TourPackage({
            package_name,
            customer_name,
            customer_NIC,
            phone_number,
            NOF_person
        });

        await newPackage.save();
        res.status(201).json({ message: "Tour package added successfully", package: newPackage });
    } catch (err) {
        console.error("Error adding tour package:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Get all tour packages
router.get("/", async (req, res) => {
    try {
        const packages = await TourPackage.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a review by ID
router.get("/:id", async (req, res) => {
    try {
        const review = await UserReview.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a tour package by ID
router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { package_name, customer_name, customer_NIC, phone_number, NOF_person } = req.body;

        // Ensure that all necessary fields are present
        if (!package_name || !customer_name || !customer_NIC || !phone_number || !NOF_person) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatePackage = {
            package_name,
            customer_name,
            customer_NIC,
            phone_number,
            NOF_person
        };

        const updatedPackage = await TourPackage.findByIdAndUpdate(id, updatePackage, { new: true });

        if (!updatedPackage) {
            return res.status(404).json({ message: "Tour package not found" });
        }

        res.status(200).json({ message: "Tour package updated successfully", package: updatedPackage });
    } catch (err) {
        console.error("Error updating tour package:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Delete a tour package by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedPackage = await TourPackage.findByIdAndDelete(req.params.id);
        if (!deletedPackage) {
            return res.status(404).json({ message: "Tour package not found" });
        }
        res.status(200).json({ message: "Tour package deleted successfully" });
    } catch (err) {
        console.error("Error deleting tour package:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

module.exports = router;
