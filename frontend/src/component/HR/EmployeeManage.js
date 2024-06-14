import React from 'react';
import AddEmployee from '../../component/HR/AddEmlpoyee';
import PayrollForm from '../../component/HR/PayrollForm';
import AddLoans from '../../component/HR/AddLoans';
import Navigation from '../../pages/Navigation';
import './EmployeeManage.css'; 
import { Link } from 'react-router-dom';

function EmployeeManage() {
  return (
    <div>
      <Navigation />
      <div className="col">
            <div>
                <div className='empbutton'>
                    <Link to="/getemp" className="BD-button">Get All Emoloyee Details</Link>
                 </div> 
                 <div>
                    <Link to="/getloans" className="BD-button">Get All Loans Details</Link>
                 </div> 
                 <div>
                    <Link to="/allpayroll" className="BD-button">Get All Payroll Details</Link>
                 </div> 
            </div>
        </div>
      <div className="row">
        <div className="col">
          <AddEmployee />
        </div>
        <div className="col">
          <AddLoans />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <PayrollForm />
        </div>
      </div>
    </div>
  );
}

export default EmployeeManage;
