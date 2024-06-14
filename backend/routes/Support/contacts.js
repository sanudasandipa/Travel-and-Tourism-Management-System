const router = require("express").Router();
let Contact = require("../../model/Support/Contact");

// Add Contact
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const newContact = new Contact({
    name,
    email,
    message,
  });

  newContact
    .save()
    .then(() => {
      res.json("Contact Form Submitted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error: Unable to submit contact form");
    });
});

// Get all Contacts
router.route("/").get((req, res) => {
  Contact.find()
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("Error: Unable to fetch contacts");
    });
});

// Update Contact
router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, email, message } = req.body;

  const updateContact = {
    name,
    email,
    message,
  };

  try {
    const updatedUser = await Contact.findByIdAndUpdate(userId, updateContact, {
      new: true,
    });
    res.status(200).json({ status: "User updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error with updating data", error: err.message });
  }
});

// Get Contact by ID
router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;

  try {
    const user = await Contact.findById(userId);
    res.status(200).json({ status: "User fetched", user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error with get user", error: err.message });
  }
});

// Delete Contact by ID
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  try {
    await Contact.findByIdAndDelete(userId);
    res.status(200).json({ status: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error with deleting user", error: err.message });
  }
});

module.exports = router;