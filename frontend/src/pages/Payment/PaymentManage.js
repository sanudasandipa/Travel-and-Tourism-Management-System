import React from 'react';

import Navigation from '../../pages/Navigation';
import './PaymentManage.css'; 
import { Link } from 'react-router-dom';

function PaymentManage() {
  return (
    <div>
      <Navigation />
      <div className="rowPM">
        <div className="colPM">
            <div>
                <div className='PayMbutton'>
                    <Link to="/AllCoustomer" className="Pm-button">Get All Coustomer Details</Link>
                 </div> 
                 <div className='PayMbutton'>
                    <Link to="/AllOfflinePay" className="Pm-button">Get All OfflinePayment Details</Link>
                 </div> 
                 <div className='PayMbutton'>
                    <Link to="/AllonlinePay" className="Pm-button">Get All OnlinePayment Details</Link>
                 </div> 
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default PaymentManage;
