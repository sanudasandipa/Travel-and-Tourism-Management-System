const router = require("express").Router();
const CustomerPaymentDetails = require("../../model/Payment/customer_payment_details"); // Modified import

// Add a new customer payment details
router.post("/add", (req, res) => { // Changed route method to post
    const { First_Name, Last_name, Phone, E_mail, Amount, Service } = req.body; // Added Service field

    const newCustomerPaymentDetails = new CustomerPaymentDetails({
        First_Name,
        Last_name,
        Phone,
        E_mail,
        Amount,
        Service, // Added Service field
    });

    newCustomerPaymentDetails.save()
        .then(() => {
            res.json("Customer details Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// Get all customer payment details
router.get("/", (req, res) => { // Changed route method to get
    CustomerPaymentDetails.find()
        .then((customer_payment_details) => {
            res.json(customer_payment_details);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// Get customer payment details by ID
router.get('/getCustomer/:id', (req, res) => {
    const id = req.params.id;
    CustomerPaymentDetails.findById(id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ message: 'User not found', error: err.message }));
});

// Update customer payment details by ID
router.put("/update/:id", async (req, res) => {
    try {
        const PID = req.params.id;
        const { First_Name, Last_name, Phone, E_mail, Amount, Service } = req.body;

        const updateCustomerPaymentDetails = {
            First_Name,
            Last_name,
            Phone,
            E_mail,
            Amount,
            Service,
        };

        const updatedUser = await CustomerPaymentDetails.findByIdAndUpdate(PID, updateCustomerPaymentDetails, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ status: "User updated", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete a customer payment details by ID
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await CustomerPaymentDetails.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
