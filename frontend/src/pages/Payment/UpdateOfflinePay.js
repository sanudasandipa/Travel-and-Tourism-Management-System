import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdateOfflinePay.css'; // Import CSS file for styling

const UpdateOfflinePayment = () => {
    const { id } = useParams();
    const [Bank, setBank] = useState("");
    const [Branch, setBranch] = useState("");
    const [Paid_Date, setPaid_Date] = useState("");
    const navigate = useNavigate(); // Get the payment ID from the URL

    useEffect(() => {
        // Fetch the payment details using the ID
        axios.get(`http://localhost:8080/offlinepayment/${id}`)
            .then((result) => {
                const { Bank, Branch, Paid_Date } = result.data;
                setBank(Bank);
                setBranch(Branch);
                setPaid_Date(Paid_Date);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/offlinepayment/${id}`, { Bank, Branch, Paid_Date })
            .then(result => {
                console.log(result);
                navigate('/AllOfflinePay'); // Navigate to the list of offline payments after update
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className="update-offline-payment-container">
                <h3 className="update-offline-payment-title">Update Offline Payment</h3>
                <form onSubmit={update}>
                    <div className="input-group">
                        <label className="update-offline-payment-label" htmlFor="bank">Bank:</label>
                        <input className="update-offline-payment-input" type="text" id="bank" value={Bank} onChange={(e) => setBank(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-offline-payment-label" htmlFor="branch">Branch:</label>
                        <input className="update-offline-payment-input" type="text" id="branch" value={Branch} onChange={(e) => setBranch(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-offline-payment-label" htmlFor="paid_date">Paid Date:</label>
                        <input className="update-offline-payment-input" type="text" id="paid_date" value={Paid_Date} onChange={(e) => setPaid_Date(e.target.value)} />
                    </div>
                    <br />
                    <button className="update-offline-payment-button" type="submit">Save Changes</button>
                    <button className="update-offline-payment-button" type="submit">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateOfflinePayment;
