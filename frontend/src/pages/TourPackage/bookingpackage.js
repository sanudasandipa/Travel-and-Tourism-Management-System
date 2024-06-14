import React, { useState } from 'react';
import axios from 'axios';
import './bookingpackage.css';
import Navigation from '../Navigation';
import { useNavigate, Link } from 'react-router-dom';

function AddTourPackage() {
    const [packageName, setPackageName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerNIC, setCustomerNIC] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [numOfPersons, setNumOfPersons] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!packageName || !customerName || !customerNIC || !phoneNumber || numOfPersons <= 0) {
            alert('Please fill out all fields correctly.');
            return;
        }

        if (!/^\d{10}$/.test(phoneNumber)) {
            alert('Phone number must be exactly 10 digits long.');
            return;
        }

        try {
            const newPackage = { package_name: packageName, customer_name: customerName, customer_NIC: customerNIC, phone_number: phoneNumber, NOF_person: numOfPersons };
            await axios.post("http://localhost:8080/packages/add", newPackage);
            alert('Tour package added successfully.');
            resetForm();
            navigate('/TourPackage');
        } catch (error) {
            alert('Failed to add tour package.');
            console.error(error);
        }
    };

    const resetForm = () => {
        setPackageName("");
        setCustomerName("");
        setCustomerNIC("");
        setPhoneNumber("");
        setNumOfPersons(1);
    };

    return (
        <div>
            <Navigation />
            <div className="add-tour-package">
                <h2>Add Tour Package</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="packageName">Package Name:</label>
                        <select id="packageName" value={packageName} onChange={(e) => setPackageName(e.target.value)} required>
                            <option value="">Select Package Name</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Family">Family</option>
                            <option value="Sailing">Sailing</option>
                            <option value="Wildlife">Wildlife</option>
                            <option value="Historical">Historical</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Name:</label>
                        <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value.replace(/[^a-zA-Z]/g, ''))} required />
                    </div>

                    <div className="form-group">
                            <label htmlFor="customerNIC">Customer NIC:</label>
                            <input type="text" id="customerNIC" value={customerNIC} onChange={(e) => setCustomerNIC(e.target.value.replace(/[^\w\s]/gi, ''))} required />
                        </div>

                    <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        pattern="[0-9]{10}"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                        }}
                        required
                        />
                        <small>Phone number must be exactly 10 digits long.</small>
                        </div>
                            <div className="form-group">
                            <label htmlFor="numOfPersons">Number of Persons:</label>
                            <input 
                                type="number" 
                                id="numOfPersons" 
                                value={numOfPersons} 
                                onChange={(e) => {
                                    const value = parseInt(e.target.value)
                                    if (!isNaN(value) && value > 0) {
                                        setNumOfPersons(value);
                                    } else {
                                        setNumOfPersons(1);
                                    }
                                }} 
                                required 
                                />
                            </div>

                    <button type="submit">Add Package</button>
                </form>
                <Link to="/PaymentForm">
                    <button className='btn btn-success' style={{ marginRight: '10px' }}>Pay Now</button>
                </Link>
            </div>
        </div>
    );
}

export default AddTourPackage;