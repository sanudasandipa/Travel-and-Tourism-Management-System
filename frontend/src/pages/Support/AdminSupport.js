import React from 'react'
import Navigation from '../../pages/Navigation';
import { Link } from 'react-router-dom';
import './AdminSupport.css';

function AdminSupport() {
    return (
        <div>
            <Navigation />
            <div>
                <Link to="/add_article">
                    <button className='Support-Button Big-White-Button'>Add Article</button>
                </Link>
                <Link to="/all_article">
                    <button className='Support-Button Big-White-Button'>View Article</button>
                </Link>
                <Link to="/all">
                    <button className='Support-Button Big-White-Button'>All Contact Details</button>
                </Link>
                <Link to="/AdminMessage">
                    <button className='Support-Button Big-White-Button'>Message Section</button>
                </Link>
                
            </div>
        </div>
    )
}

export default AdminSupport
