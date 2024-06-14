import React from 'react';
import Navigation from '../../pages/Navigation';
import { Link } from 'react-router-dom';
import './Message.css';

function Message() {
    return (
        <div>
            <Navigation />
            <div className='message'>
                <Link to="/MessageUser">
                    <button className='message-Button' >Send Message</button>
                </Link>
                <Link to="/UserViewMessage">
                    <button className='message-Button'>View Massage</button>
                </Link>
            </div>
        </div>
    );
}

export default Message;
