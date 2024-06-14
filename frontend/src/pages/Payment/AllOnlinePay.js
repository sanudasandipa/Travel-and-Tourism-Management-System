import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './AllonlinePay.css'; 

function AllOnlinePayments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/onlinepayment/")
            .then((res) => {
                setPayments(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/onlinepayment/${id}`)
            .then(() => {
                setPayments(payments.filter(payment => payment._id !== id));
                console.log("Online payment deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting online payment:", err);
            });
    };

    return (
        <div>
            <Navigation />
            <br />
            <br />
            <div className="custom-container mt-3">
                <div className="custom-row justify-content-start">
                   
                </div>
            </div>
            <div className="custom-container mt-5">
                <h1 className="emph1" >Online Payment Details</h1>
                <table className="custom-table custom-table-striped custom-table-bordered">
                    <thead className="custom-thead-dark">
                        <tr>
                            <th>Account Number</th>
                            <th>Card Number</th>
                            <th>Expiry Date</th>
                            <th>CVV</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td>{payment.Account_Number}</td>
                                <td>{payment.Card_Number}</td>
                                <td>{payment.Expiry_Date}</td>
                                <td>{payment.CVV}</td>
                                <td>
                                    <Link to={`/UpdateOnlinePay/${payment._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
                                    <button onClick={() => handleDelete(payment._id)} className="custom-button custom-button-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllOnlinePayments;
