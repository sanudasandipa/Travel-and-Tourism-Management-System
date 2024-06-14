import React from 'react'
import Navigation from '../../pages/Navigation';
import { Link } from 'react-router-dom';
import './Support.css';

function Support() {
  return (
    <div>
        <Navigation />
        <div className='support'>
        <Link to="/add">
         <button className='SupportU-Button' >Contact Us</button>
         </Link>
         <Link to="/view">
         <button className='SupportU-Button'>Read Article</button>
         </Link>
         <Link to="/Message">
         <button className='SupportU-Button'>Chat</button>
         </Link>


        </div>
      
    </div>
  )
}

export default Support
