import React, { useState } from 'react';
import axios from 'axios';

function ComposeReply({ sender, onClose }) {
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the reply message
      await axios.post('http://localhost:8080/messages/add', {
        received: sender,
        sender: 'admin', // Assuming admin is the sender
        content: replyContent
      });
      alert('Reply sent successfully.');
      // Close the compose reply modal or redirect to the previous page
      onClose();
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply.');
    }
  };

  return (
    <div>
      <h2>Compose Reply</h2>
      <form onSubmit={handleReplySubmit}>
        <div className="form-group">
          <label htmlFor="replyContent">Reply Content:</label>
          <textarea id="replyContent" value={replyContent} onChange={(e) => setReplyContent(e.target.value)} required />
        </div>
        <button type="submit">Send Reply</button>
      </form>
    </div>
  );
}

export default ComposeReply;
