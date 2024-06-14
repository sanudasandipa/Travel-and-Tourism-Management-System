import React from 'react'
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';
import './adminPanels.css';


function adminPanale() {
  return (
    <div>
        <div >
        <Navigation />
        </div>
        <div className='admin-panel'>
        <div className="employee">
        <div className='left'>
          <Link to="/EmployeeManage" className="BO-button">Employee Manage</Link>
          <Link to="/PaymentManage" className="BO-button">Payment Manage</Link>
          <Link to="/AdminSupport" className="BO-button">Support Manage</Link>
        </div>
        <div className='right'>
        <Link to="/PackageManage" className="BO-button">Tour Package Manage</Link>
        <Link to="/TransportManage" className="BO-button">Transport Manage</Link>
        <Link to="/AdminReview" className="BO-button">Review & FeedBack Manage</Link>
        </div>
        </div>

        </div>

      
    </div>
  )
}

export default adminPanale
