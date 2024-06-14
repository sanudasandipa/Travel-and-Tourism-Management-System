// PayrollForm.js

import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import './PayrollForm.css'; 

function PayrollForm() {
  const { monthlySalary, EPF, NetSalary } = useParams();
  const { employee_Name, status, working_Hours } = useParams();

  const [Employee_Name, setEmployeeName] = useState(employee_Name || "");
  const [Status, setStatus] = useState(status || "");
  const [Working_Hours, setWorkingHours] = useState(working_Hours || "");
  const [Monthly_Salary, setMonthlySalary] = useState(monthlySalary || "");
  const [EPF_Amount, setEpfAmount] = useState(EPF || "");
  const [Net_Salary, setNetSalary] = useState(NetSalary || "");

  function sendData(e) {
    e.preventDefault();

    const newpayroll = {
      Employee_Name,
      Status,
      Working_Hours,
      Monthly_Salary,
      EPF_Amount,
      Net_Salary,
    };

    axios.post("http://localhost:8080/payroll/add", newpayroll)
      .then(() => {
        alert("Payroll added successfully.");
        setEmployeeName("");
        setStatus("");
        setWorkingHours("");
        setMonthlySalary("");
        setEpfAmount("");
        setNetSalary("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleEmployeeNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/gi, ''); // Allow only alphabets and spaces
    setEmployeeName(value);
  };


  return (
    <div className='payroll-form-container'>
      <div className='payrollf'>
        <h2 className='form-title'>Payroll Form</h2>
        <form onSubmit={sendData} className='register-form'>
          <div className='form-group'>
            <label>Employee Name:</label>
            <input type='text' className='form-input' value={Employee_Name} onChange={handleEmployeeNameChange} required />
          </div>
          <div className='form-group'>
            <label>Status:</label>
            <input type='text' className='form-input' value={Status} onChange={(e) => setStatus(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label>Working Hours:</label>
            <div className="input-group">
              <input type='number' className='form-input' value={Working_Hours} onChange={(e) => setWorkingHours(e.target.value)} required />
              <div className="input-group-append">
                <span className="input-group-text">h</span>
              </div>
            </div>
           <Link to={`/calculate/${Employee_Name}/${Status}/${Working_Hours}`} className='btn btn-secondary btn-ash mt-2'>Salary Calculator</Link>
           </div>
          <div className='form-group'>
            <label>Monthly Salary (Rs.):</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Rs.</span>
              </div>
              <input type='number' className='form-input' value={Monthly_Salary} onChange={(e) => setMonthlySalary(e.target.value)} required />
            </div>
          </div>
          <div className='form-group'>
            <label>EPF Amount (Rs.):</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Rs.</span>
              </div>
              <input type='number' className='form-input' value={EPF_Amount} onChange={(e) => setEpfAmount(e.target.value)} required />
            </div>
          </div>
          <div className='form-group'>
            <label>Net Salary (Rs.):</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Rs.</span>
              </div>
              <input type='number' className='form-input' value={Net_Salary} onChange={(e) => setNetSalary(e.target.value)} required />
            </div>
          </div>
          <div className='form-group'>
            <button type='submit' className='form-submit-btn'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PayrollForm;
