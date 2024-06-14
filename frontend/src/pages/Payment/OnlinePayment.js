import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../Navigation';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import './Onlinepayment.css';

function AddOnlinePayment() {
    const { First_Name, Last_name, Amount, Service } = useParams();
    const [accountNumber, setAccountNumber] = useState("");
    const [accountNumber1, setAccountNumber1] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCVV] = useState("");
    const [paymentAdded, setPaymentAdded] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; 
        try {
            const newPayment = { Account_Number: accountNumber, Card_Number: cardNumber, Expiry_Date: expiryDate, CVV: cvv };
            await axios.post("http://localhost:8080/onlinepayment/add", newPayment);
            alert('Online payment information added successfully.');
            resetForm();
            setPaymentAdded(true);
            setAccountNumber1(accountNumber);
        } catch (error) {
            alert('Failed to add online payment information.');
            console.error(error);
        }
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
    
        // Validate cardNumber
        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
          newErrors.cardNumber = "Card number must be 16 digits.";
          isValid = false;
        }
    
        // Validate expiryDate
        const expiryRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
        if (!expiryRegex.test(expiryDate)) {
          newErrors.expiryDate = "Expiry date must be in MM/DD format.";
          isValid = false;
        }
    
        // Validate CVV
        if (cvv.length !== 3 || isNaN(cvv)) {
          newErrors.cvv = "CVV must be 3 digits.";
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      };

    const resetForm = () => {
        setAccountNumber("");
        setCardNumber("");
        setExpiryDate("");
        setCVV("");
    };

    const downloadPDF = () => {
      // Generate PDF document with payment details
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
      });
  
      // Header
      doc.setFontSize(20);
      doc.text("Payment Receipt", 105, 20, null, null, "center");
  
      // Content
      doc.setFontSize(14);
      doc.text(`Date: ${currentDate}`, 20, 40);
      doc.text(`Customer: ${First_Name} ${Last_name}`, 20, 50);
      doc.text(`Amount: Rs. ${Amount}`, 20, 60);
      doc.text(`Service: ${Service}`, 20, 70);
      doc.text(`Account Number: ${accountNumber1}`, 20, 80);
  
      // Separator line
      doc.setLineWidth(0.5);
      doc.line(20, 90, 190, 90);
  
      // Footer
      doc.setFontSize(12);
      doc.text("Thank you for your payment!", 105, 110, null, null, "center");
  
      // Save PDF
      doc.save('payment_receipt.pdf');
  };
  
  

    return (
        <div>
            <Navigation />
        <div className="online-payment-container">
            
            <div className="online-payment-form">
                <h2>Add Online Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Account Number:</label>
                        <input type="text" id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber && "is-invalid"}`}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  /><br></br>
                  {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date (MM/DD)</label>
                  <input
                    type="text"
                    value={expiryDate}
                    className={`form-control ${errors.expiryDate && "is-invalid"}`}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/DD"
                    required
                  /><br></br>
                  {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} required />
                    </div>
                    <button type="submit">Add Payment</button>
                </form>
                {paymentAdded && (
                    <button className="download-button" onClick={downloadPDF}>Download PDF</button>
                )}
            </div>
        </div>
        </div>
    );
}

export default AddOnlinePayment;
