const express = require("express");
const router = express.Router();

const Vehicle = require('../../model/Transport/vehicle')

router.get('/getallvehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.send(vehicles);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});




router.get('/getvehiclebyid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const vehicle = await Vehicle.findById(id); // Using findById directly
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        res.json(vehicle);
    } catch (error) {
        console.error("Error fetching vehicle by ID:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post("/addvehicle", async (req, res) => {
    try {
        const newvehicle = new Vehicle(req.body);
        await newvehicle.save();
        res.send('Vehicle Added successfully');
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// New route to delete a vehicle by ID
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Vehicle.findByIdAndDelete(id);
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.route("/update/:id").put(async (req, res) => {
    try {
        const PID = req.params.id;
        const { type,maxCount,phonenumber,rentperday } = req.body;

        const updateVehicle = {
            type,
            maxCount,
            phonenumber,
            rentperday,
        };

        const updatedvehicle = await Vehicle.findByIdAndUpdate(PID, updateVehicle, { new: true });
        
        if (!updatedvehicle) {
            return res.status(404).send({ status: "Error", message: "User not found" });
        }

        res.status(200).send({ status: "Vehicle updated", user: updatedvehicle});
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});



module.exports = router;
