import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdateOnlinePay.css'; // Import CSS file for styling

const UpdateOnlinePayment = () => {
    const { id } = useParams();
    const [accountNumber, setAccountNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
    const navigate = useNavigate(); // Get the payment ID from the URL

    useEffect(() => {
        // Fetch the payment details using the ID
        axios.get(`http://localhost:8080/onlinepayment/${id}`)
            .then((result) => {
                const { Account_Number, Card_Number, Expiry_Date, CVV } = result.data;
                setAccountNumber(Account_Number);
                setCardNumber(Card_Number);
                setExpiryDate(Expiry_Date);
                setCVV(CVV);
            })
            .catch(err => console.log(err));
    }, [id]);

    const updateOnlinePayment = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/onlinepayment/${id}`, { Account_Number: accountNumber, Card_Number: cardNumber, Expiry_Date: expiryDate, CVV: cvv })
            .then(result => {
                console.log(result);
                navigate('/AllonlinePay'); // Navigate to the list of online payments after update
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className="update-online-payment-container">
                <h3 className="update-online-payment-title">Update Online Payment</h3>
                <form onSubmit={updateOnlinePayment}>
                    <div className="input-group">
                        <label htmlFor="accountNumber">Account Number:</label>
                        <input type="text" id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input type="text" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} />
                    </div>
                    <br />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => navigate('/allOnlinePayments')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateOnlinePayment;
