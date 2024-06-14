import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComposeReply from './ComposeReply'; 
import Navigation from '../../pages/Navigation';
import './AdminMessage.css';

function AdminMessagePage() {
  const [messages, setMessages] = useState([]);
  const [showComposeReply, setShowComposeReply] = useState(false);
  const [replySender, setReplySender] = useState('');

  useEffect(() => {
    // Fetch messages received by the admin
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messages/received/admin`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  
    fetchMessages(); // Call the fetchMessages function
  }, []);

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8080/messages/delete/${messageId}`);
      setMessages(messages.filter(message => message._id !== messageId));
      alert('Message deleted successfully.');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message.');
    }
  };

  const handleReplyMessage = (sender) => {
    setReplySender(sender);
    setShowComposeReply(true);
  };

  return (
    <div>
    <Navigation />
    <div className="adminmessage-page">
      <h2>Admin Message Page</h2>
      <table className="adminmessage-table">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message._id}>
              <td>{message.sender}</td>
              <td>{message.content}</td>
              <td>
                <button className="adminmessage-button" onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                <button className="adminmessage-button" onClick={() => handleReplyMessage(message.sender)}>Reply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showComposeReply && <ComposeReply sender={replySender} onClose={() => setShowComposeReply(false)} />}
    </div>
    </div>
  );
}

export default AdminMessagePage;
