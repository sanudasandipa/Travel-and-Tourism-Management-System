import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Navigation';
import './MessageUser.css';

function AddMessage() {
    const [received, setReceived] = useState("admin");
    const [sender, setSender] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/validate-token2', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setSender(data.email);
                } else {
                    setSender('');
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newMessage = { received, sender, content };
            await axios.post("http://localhost:8080/messages/add", newMessage);
            alert('Message added successfully.');
            resetForm();
        } catch (error) {
            alert('Failed to add message.');
            console.error(error);
        }
    };

    const resetForm = () => {
        setReceived("admin");
        setSender(sender);
        setContent("");
    };

    return (
        <div>
            <Navigation />
            <div className="add-message add-message-main">
                <h2 className="add-message-heading">Add Message</h2>
                <form onSubmit={handleSubmit}>
                    <div className="add-message-form-group">
                        <label htmlFor="content" className="add-message-label">Content:</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="add-message-textarea" required />
                    </div>
                    <button type="submit" className="add-message-submit-button">Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default AddMessage;
