import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './AllOfflinePay.css'; 

function AllOfflinePayments() {
    const [offlinePayments, setOfflinePayments] = useState([]);
    const [uploadSlips, setSlips] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/offlinepayment/")
            .then((res) => {
                setOfflinePayments(res.data);
                const slips = res.data.map(payment => payment.Upload_Slip);
                setSlips(slips);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/offlinepayment/${id}`)
            .then(() => {
                setOfflinePayments(offlinePayments.filter(payment => payment._id !== id));
                console.log("Offline payment deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting Offline payment:", err);
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
                <h1 className="emph1" >All Offline Payments</h1>
                <table className="custom-table custom-table-striped custom-table-bordered">
                    <thead className="custom-thead-dark">
                        <tr>
                            <th>Bank</th>
                            <th>Branch</th>
                            <th>Paid Date</th>
                            <th>Upload_Slip</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offlinePayments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{payment.Bank}</td>
                                <td>{payment.Branch}</td>
                                <td>{payment.Paid_Date}</td>
                                <td>
                                     <img src={uploadSlips[index]} alt="Uploaded Slip" style={{ maxWidth: '100px' }} />
                                </td>
                                <td>
                                <Link to={`/UpdateOfflinePay/${payment._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
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

export default AllOfflinePayments;
