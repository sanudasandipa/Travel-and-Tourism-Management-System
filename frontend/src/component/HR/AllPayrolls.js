import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";
import Navigation from '../../pages/Navigation';
import './AllPayRoll.css'; 

function AllPayrolls() {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/payroll/")
            .then((res) => {
                setPayrolls(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/payroll/delete/${id}`)
            .then(() => {
                setPayrolls(payrolls.filter(payroll => payroll._id !== id));
                console.log("Payroll deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting payroll:", err);
            });
    }

    const ComponentsRef = useRef()
    const handlePrint = useReactToPrint({

        content: () => ComponentsRef.current,
        DocumentTitle: "Payroll Report",
        onafterprint: () => alert("Payroll report successfully download")

    })

    return (
        <>
            <Navigation />
            <br />
            <br></br>
            <br></br>
            <div className="custom-container mt-1">
                    <Link to={`/addpayroll`} className="btn-calc-payroll">Calculate Payrolls</Link>
            </div>
            <div ref={ComponentsRef}>
            <h1 className="payr" >Employee Payrolls</h1>
                <div className="payroll-table">
                    <table className="payroll-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Hours</th>
                                <th>Salary</th>
                                <th>EPF</th>
                                <th>Net Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.map(payroll => (
                                <tr key={payroll._id}>
                                    <td>{payroll.Employee_Name}</td>
                                    <td>{payroll.Status}</td>
                                    <td>{payroll.Working_Hours} h</td>
                                    <td>Rs.{payroll.Monthly_Salary}</td>
                                    <td>Rs.{payroll.EPF_Amount}</td>
                                    <td>Rs.{payroll.Net_Salary}</td>
                                    <td>
                                        <Link to={`/update/${payroll._id}`} className="btn-update">Update</Link>
                                        <button onClick={() => handleDelete(payroll._id)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handlePrint} className="btn btn-primary custom-button-report mt-2">Download Report</button>
                </div>
            </div>
        </>
    );
}

export default AllPayrolls;
