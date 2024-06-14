import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import './GetAllLoans.css'; 
import Navigation from '../../pages/Navigation';

function AllLoans() {
    const [loans, setLoans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/loan/")
            .then((res) => {
                setLoans(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/loan/delete/${id}`)
            .then(() => {
                setLoans(loans.filter(loan => loan._id !== id));
                console.log("Loan deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting Loan:", err);
            });
    };

    const ComponentsRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle: "Loan Report",
        onafterprint: () => alert("Loan report successfully downloaded")
    });

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredLoans = loans.filter(loan =>
        loan.Employee_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.Department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
             <Navigation />
             <br /><br />
             <div className="custom-container mt-1">
                <Link to={`/accept`} className="btn-calc-payroll">Give loans</Link>
            </div>
             <div ref={ComponentsRef}>
                <input
                    type="text"
                    placeholder="Search by Employee Name or Department"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                    style={{ width: '300px' }}
                />
                <table className="loan-table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Loan Amount</th>
                            <th>Interest Rate</th>
                            <th>Premium</th>
                            <th>Repayment Period</th>
                            <th>Terms & Conditions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoans.map(loan => (
                            <tr key={loan._id}>
                                <td>{loan.Employee_Name}</td>
                                <td>{loan.Department}</td>
                                <td>Rs.{loan.Loan_Amount}</td>
                                <td>{loan.Interest_rate}%</td>
                                <td>Rs.{loan.Premium}</td>
                                <td>{loan.Repayment_period} months</td>
                                <td>{loan.Conditions}</td>
                                <td>
                                    <Link to={`/updateloan/${loan._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
                                    <button onClick={() => handleDelete(loan._id)} className="loandelete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary custom-button-report mt-2" onClick={handlePrint}>Download Report</button>
            </div>
        </div>
    );
}

export default AllLoans;
