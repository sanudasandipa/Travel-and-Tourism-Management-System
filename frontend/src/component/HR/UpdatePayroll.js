import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdatePayroll.css'; 

const UpdatePayroll = () => {
    const { id } = useParams();
    const [Employee_Name, setEmployee_Name] = useState('');
    const [Status, setStatus] = useState('');
    const [Working_Hours, setWorking_Hours] = useState('');
    const [Monthly_Salary, setMonthly_Salary] = useState('');
    const [EPF_Amount, setEpf_Amount] = useState('');
    const [Net_Salary, setNet_Salary] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/payroll/getpayroll/${id}`)
            .then((result) => {
                const { data } = result;
                setEmployee_Name(data.Employee_Name);
                setStatus(data.Status);
                setWorking_Hours(data.Working_Hours);
                setMonthly_Salary(data.Monthly_Salary);
                setEpf_Amount(data.EPF_Amount);
                setNet_Salary(data.Net_Salary);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/payroll/update/${id}`, { Employee_Name, Status, Working_Hours, Monthly_Salary, EPF_Amount, Net_Salary })
            .then(result => {
                console.log(result);
                navigate('/allpayroll');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className='update-payroll-container'>
                <div className='update-payroll-form'>
                    <h3 className='form-title'>Update Payroll</h3>
                    <form onSubmit={update} className='update-payroll-form-inner'>
                        <div className='form-group'>
                            <label htmlFor="name" className='form-label'>Employee Name:</label>
                            <input type="text" id="name" value={Employee_Name} onChange={(e) => setEmployee_Name(e.target.value)} className='form-input' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="status" className='form-label'>Status:</label>
                            <input type="text" id="status" value={Status} onChange={(e) => setStatus(e.target.value)} className='form-input' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="working hours" className='form-label'>Working Hours:</label>
                            <input type="number" id="working hours" value={Working_Hours} onChange={(e) => setWorking_Hours(e.target.value)} className='form-input' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="monthly salary" className='form-label'>Monthly Salary:</label>
                            <input type="number" id="monthly salary" value={Monthly_Salary} onChange={(e) => setMonthly_Salary(e.target.value)} className='form-input' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="epf amount" className='form-label'>EPF Amount:</label>
                            <input type="number" id="epf amount" value={EPF_Amount} onChange={(e) => setEpf_Amount(e.target.value)} className='form-input' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="net salary" className='form-label'>Net Salary:</label>
                            <input type="number" id="net salary" value={Net_Salary} onChange={(e) => setNet_Salary(e.target.value)} className='form-input' />
                        </div>
                        <div className='form-group'>
                            <button type="submit" className='form-submit-btn'>Save Changes</button>
                            <button type="submit" className='form-cancel-btn'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePayroll;
