import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../pages/Navigation';
import './UserViewMessage.css';

function MessagePage() {
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user email
    const fetchUserEmail = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/validate-token2', {
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email);
        } else {
          setUserEmail('');
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };
  
    fetchUserEmail();
  }, []);

  useEffect(() => {
    // Fetch sent messages
    const fetchSentMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messages/sender/${userEmail}`);
        setSentMessages(response.data);
      } catch (error) {
        console.error('Error fetching sent messages:', error);
      }
    };

    // Fetch received messages
    const fetchReceivedMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/messages/received/${userEmail}`);
        setReceivedMessages(response.data);
      } catch (error) {
        console.error('Error fetching received messages:', error);
      }
    };

    if (userEmail) {
      fetchSentMessages();
      fetchReceivedMessages();
    }
  }, [userEmail]);

  const handleDeleteSentMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8080/messages/delete/${messageId}`);
      setSentMessages(sentMessages.filter(message => message._id !== messageId));
      alert('Sent message deleted successfully.');
    } catch (error) {
      console.error('Error deleting sent message:', error);
      alert('Failed to delete sent message.');
    }
  };

  const handleDeleteReceivedMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8080/messages/delete/${messageId}`);
      setReceivedMessages(receivedMessages.filter(message => message._id !== messageId));
      alert('Received message deleted successfully.');
    } catch (error) {
      console.error('Error deleting received message:', error);
      alert('Failed to delete received message.');
    }
  };

  return (
    <div>
      <Navigation />
      <div className="viewmessage-container">
        <h2 className="viewmessage-sent-header">Sent Messages</h2>
        <ul className="viewmessage-sent-list">
          {sentMessages.map(message => (
            <li key={message._id} className="viewmessage-sent-item">
              {message.content}
              <button className="delete-button" onClick={() => handleDeleteSentMessage(message._id)}>Delete</button>


            </li>
          ))}
        </ul>

        <h2 className="viewmessage-received-header">Received Messages</h2>
        <ul className="viewmessage-received-list">
          {receivedMessages.map(message => (
            <li key={message._id} className="viewmessage-received-item">
              {message.content}
              <button className="delete-button" onClick={() => handleDeleteReceivedMessage(message._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessagePage;
