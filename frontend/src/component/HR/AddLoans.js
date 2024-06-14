import React, { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import './AddLoans.css';

function LoanForm() {
  const { Full_Name, department, loan_Amount, repayment_period } = useParams();

  const [Employee_Name, setEmployeeName] = useState(Full_Name || "");
  const [Department, setDepartment] = useState(department || "");
  const [Loan_Amount, setLoan_Amount] = useState(loan_Amount || "");
  const [Interest_rate, setInterest_rate] = useState("");
  const [Premium, setPremium] = useState("");
  const [Repayment_period, setRepayment_period] = useState(repayment_period || "");
  const [Conditions, setConditions] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newloan = {
      Employee_Name,
      Department,
      Loan_Amount,
      Interest_rate,
      Premium,
      Repayment_period,
      Conditions,
    };

    axios.post("http://localhost:8080/loan/add", newloan)
      .then(() => {
        alert("Loan added successfully.");
        setEmployeeName("");
        setDepartment("");
        setLoan_Amount("");
        setInterest_rate("");
        setPremium("");
        setRepayment_period("");
        setConditions("");
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
    <div className="custom-add-loan-form-container"> 
      <div className="custom-container">
        <div className="custom-row justify-content-center">
          <div className="custom-col-md-3">
            <div className="custom-card">
              <div className="custom-card-header">
                <h2 className="custom-text-center mb-0">Loan Form</h2>
              </div>
              <div className="custom-card-body">
                <form onSubmit={sendData} >
                  <div className="custom-form-group">
                    <label>Employee Name</label>
                    <input type="text" className="custom-form-control" value={Employee_Name} onChange={handleEmployeeNameChange} required />
                  </div>
                  <div className="custom-form-group">
                    <label>Department</label>
                    <input type="text" className="custom-form-control" value={Department} onChange={(e) => setDepartment(e.target.value)} required />
                  </div>
                  <div className="custom-form-group">
                    <label>Loan Amount</label>
                    <div className="custom-input-group">
                      <div className="custom-input-group-prepend">
                        <span className="custom-input-group-text">Rs.</span>
                      </div>
                      <input type="number" className="custom-form-control" value={Loan_Amount} onChange={(e) => setLoan_Amount(e.target.value)} required inputMode="numeric" />
                    </div>
                  </div>
                  <div className="custom-form-group">
                    <label>Interest Rate (%)</label>
                    <input type="number" className="custom-form-control" value={Interest_rate} onChange={(e) => setInterest_rate(e.target.value)} required inputMode="numeric" />
                  </div>
                  <div className="custom-form-group">
                    <label>Premium</label>
                    <div className="custom-input-group">
                      <div className="custom-input-group-prepend">
                        <span className="custom-input-group-text">Rs.</span>
                      </div>
                      <input type="number" className="custom-form-control" value={Premium} onChange={(e) => setPremium(e.target.value)} required inputMode="numeric" />
                    </div>
                  </div>
                  <div className="custom-form-group">
                    <label>Repayment Period (months)</label>
                    <input type="number" className="custom-form-control" value={Repayment_period} onChange={(e) => setRepayment_period(e.target.value)} required inputMode="numeric" />
                  </div>
                  <div className="custom-form-group">
                    <label>Terms & Conditions</label>
                    <input type="text" className="custom-form-control" value={Conditions} onChange={(e) => setConditions(e.target.value)} required />
                  </div>
                  <br />
                  <div className="custom-form-group custom-text-center">
                    <button type="submit" className="custom-btn custom-btn-success">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanForm;
