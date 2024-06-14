import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './CalculateSalary.css';

function CalSala() {
  const { Employee_Name, Status, Working_Hours } = useParams();

  const [employee_Name,] = useState(Employee_Name);
  const [status,] = useState(Status);
  const [working_Hours,] = useState(Working_Hours);

  const [formData, setFormData] = useState({
    workingHours: 0,
    salaryAmount: 0,
    monthlySalary: 0,
    employeeContributionEPF: 0,
    employerContributionEPF: 0,
    employerContributionETF: 0,
    totalContributionEPF: 0,
    netSalaryPercentage: 0,
    EPF: 0,
    ETF: 0,
    Total: 0,
    NetSalary: 0
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: parseFloat(value)
    }));
  };

  const calculateSalary = () => {
    const { workingHours, salaryAmount } = formData;
    const monthlySalary = workingHours * salaryAmount;
    const EPF = 0.08 * monthlySalary; 
    const ETF = 0.03 * monthlySalary; 
    const employerContributionEPF = 0.12 * monthlySalary; 
    const employerContributionETF = 0.03 * monthlySalary; 
    const totalContributionEPF = EPF + employerContributionEPF; 
    const netSalary = monthlySalary - EPF; 
    setFormData(prevState => ({
      ...prevState,
      monthlySalary: monthlySalary.toFixed(2),
      EPF: EPF.toFixed(2),
      ETF: ETF.toFixed(2),
      employerContributionEPF: employerContributionEPF.toFixed(2),
      employerContributionETF: employerContributionETF.toFixed(2),
      Total: totalContributionEPF.toFixed(2),
      NetSalary: netSalary.toFixed(2)
    }));
  };

  return (
    <div>
      <Navigation />
      <div className='cal-container'>
        <div className='cal-content'>
          <h1>Salary Calculator</h1>
          <div className="cal-input-group">
            <label>Enter the working hours here in the box:</label>
            <input type="number" className="cal-input-control" name="workingHours" onChange={handleChange} />
          </div>
          <div className="cal-input-group">
            <label>Salary Amount:</label>
            <input type="number" className="cal-input-control" name="salaryAmount" onChange={handleChange} />
            <span className="cal-input-addon">per</span>
            <input type="number" className="cal-input-control" name="hours" onChange={handleChange} />
            <label>h</label>
          </div>
          <div className="cal-input-group">
            <label>Monthly Basic Salary:</label>
            <input type="number" className="cal-input-control" name="monthlySalary" value={formData.monthlySalary} readOnly />
          </div>
          <div className="cal-input-group">
            <label>Employee Contribution:</label>
            <div className="cal-d-flex">
              <label>EPF(8%):</label>
              <input type="number" className="cal-input-control" name="EPF" value={formData.EPF} readOnly />
            </div>
          </div>
          <div className="cal-input-group">
            <label>Employer Contribution:</label>
            <div className="cal-d-flex">
              <label>EPF(12%):</label>
              <input type="number" className="cal-input-control" name="employerContributionEPF" value={formData.employerContributionEPF} readOnly />
              <label>ETF(3%):</label>
              <input type="number" className="cal-input-control" name="employerContributionETF" value={formData.employerContributionETF} readOnly />
            </div>
          </div>
          <div className="cal-input-group">
            <label>Total(20%):</label>
            <input type="number" className="cal-input-control" name="Total" value={formData.Total} readOnly />
          </div>
          <div className="cal-input-group">
            <label>Net Salary (92%):</label>
            <input type="number" className="cal-input-control" name="netSalaryPercentage" value={formData.NetSalary} readOnly />
          </div>
          <div>
            <Link to={`/addpayroll/${employee_Name}/${status}/${working_Hours}/${formData.monthlySalary}/${formData.EPF}/${formData.NetSalary} `} className="cal-btn cal-btn-secondary mr-2">Back</Link>
            <div style={{ textAlign: 'center' }}>
              <button className="cal-btn cal-btn-primary" onClick={calculateSalary}>Calculate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalSala;
