import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdateLoans.css'; 

const UpdateLoan = () => {
    const { id } = useParams();
    const [Employee_Name, setEmployee_Name] = useState("");
    const [Department, setDepartment] = useState("");
    const [Loan_Amount, setLoan_Amount] = useState("");
    const [Interest_rate, setInterest_rate] = useState("");
    const [Premium, setPremium] = useState("");
    const [Repayment_period, setRepayment_period] = useState("");
    const [Conditions, setConditions] = useState(""); 
    const navigate = useNavigate(); 

    useEffect(() => {
        
        axios.get(`http://localhost:8080/loan/getloan/${id}`)
            .then((result) => {
                const { Employee_Name,Department,Loan_Amount,Interest_rate,Premium,Repayment_period,Conditions } = result.data;
                setEmployee_Name(Employee_Name);
                setDepartment(Department);
                setLoan_Amount(Loan_Amount);
                setInterest_rate(Interest_rate);
                setPremium(Premium);
                setRepayment_period(Repayment_period);
                setConditions(Conditions);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/loan/update/${id}`, {  Employee_Name,Department,Loan_Amount,Interest_rate,Premium,Repayment_period,Conditions })
            .then(result => {
                console.log(result);
                navigate('/getloans');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
             <Navigation />
            <br></br>
            <div className='update-loan-container'>
                <div className='update-loan-form'>
                    <h2 className='form-title'>Update Loan</h2>
                    <form onSubmit={update} className='loan-form'>
                        <div className="form-group">
                            <label>Employee Name:</label>
                            <input type="text" className="form-control" placeholder="Employee Name" value={Employee_Name} onChange={(e) => setEmployee_Name(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Department:</label>
                            <input type="text" className="form-control" placeholder="Department" value={Department} onChange={(e) => setDepartment(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Loan Amount:</label>
                            <input type="number" className="form-control" placeholder="Loan Amount" value={Loan_Amount} onChange={(e) => setLoan_Amount(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Interest rate:</label>
                            <input type="number" className="form-control" placeholder="Interest rate" value={Interest_rate} onChange={(e) => setInterest_rate(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Premium:</label>
                            <input type="number" className="form-control" placeholder="Premium" value={Premium} onChange={(e) => setPremium(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Repayment period:</label>
                            <input type="number" className="form-control" placeholder="Repayment period" value={Repayment_period} onChange={(e) => setRepayment_period(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Terms & Conditions:</label>
                            <input type="text" className="form-control" placeholder="Terms & Conditions" value={Conditions} onChange={(e) => setConditions(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-success me-2">Save Changes</button>
                        <button type="submit" className="btn btn-outline-success">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateLoan;
