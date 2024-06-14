import React from 'react'
import { Link } from 'react-router-dom';
import './navHome.css'; 
import logo from '../img/logo.png'



function navHome() {

  
  return (
    <div>
        <nav className='navHome'> 
          <ul>
          <li> <img src={logo} alt="Logo" className="logo" /></li>
            <li><Link to="/" className="nav-button">Home</Link></li>
            <li><Link to="/ContactUs" className="nav-button">Contact Us</Link></li>
            <li><Link to="/AboutUs" className="nav-button">About Us</Link></li>
            <li><Link to="/Signin" className="nav-Sbutton">Sign in</Link></li>
            <li><Link to="/SignUp" className="nav-Sbutton">Sign up</Link></li>
          </ul>
        </nav>
      
    </div>
  )
}

export default navHome
