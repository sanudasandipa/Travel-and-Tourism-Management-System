const express = require('express');
const router = express.Router();
const Message = require('../../model/Support/Message');

// Add a new message
router.post('/add', async (req, res) => {
    const { received, sender, content } = req.body;

    try {
        // Ensure that all necessary fields are present
        if (!received || !sender || !content) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMessage = new Message({ received, sender, content });
        await newMessage.save();
        res.status(201).json({ message: 'Message added successfully', message: newMessage });
    } catch (err) {
        console.error('Error adding message:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single message by ID
router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a message by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { received, sender, content } = req.body;

        // Ensure that all necessary fields are present
        if (!received || !sender || !content) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedMessage = await Message.findByIdAndUpdate(id, { received, sender, content }, { new: true });

        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json({ message: 'Message updated successfully', message: updatedMessage });
    } catch (err) {
        console.error('Error updating message:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Delete a message by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});


router.get('/received/:received', async (req, res) => {
  try {
    const messages = await Message.find({ received: req.params.received });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get messages by sender
router.get('/sender/:sender', async (req, res) => {
  try {
    const messages = await Message.find({ sender: req.params.sender });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMessage(req, res, next) {
  try {
    const message = await Message.findById(req.params.id);
    if (message == null) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.message = message;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


module.exports = router;


// Route to get messages by received
// router.get('/received/:received', async (req, res) => {
//   try {
//     const messages = await Message.find({ received: req.params.received });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route to get messages by sender
// router.get('/sender/:sender', async (req, res) => {
//   try {
//     const messages = await Message.find({ sender: req.params.sender });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// async function getMessage(req, res, next) {
//   try {
//     const message = await Message.findById(req.params.id);
//     if (message == null) {
//       return res.status(404).json({ message: 'Message not found' });
//     }
//     res.message = message;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }

// module.exports = router;
