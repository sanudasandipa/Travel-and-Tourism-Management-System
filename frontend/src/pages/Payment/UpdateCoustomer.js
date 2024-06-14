import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdateCoustomer.css'; // Import CSS file for styling

const UpdateCustomer = () => {
    const { id } = useParams();
    const [First_Name, setFirst_Name] = useState("");
    const [Last_name, setLast_name] = useState("");
    const [Phone, setPhone] = useState("");
    const [E_mail, setE_mail] = useState("");
    const [Amount, setAmount] = useState("");
    const [Service, setService] = useState("");
    const navigate = useNavigate(); // Get the customer ID from the URL

    useEffect(() => {
        // Fetch the customer details using the ID
        axios.get(`http://localhost:8080/customer_payment_details/getCustomer/${id}`)
            .then((result) => {
                const { First_Name, Last_name, Phone, E_mail, Amount, Service } = result.data;
                setFirst_Name(First_Name);
                setLast_name(Last_name);
                setPhone(Phone);
                setE_mail(E_mail);
                setAmount(Amount);
                setService(Service);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/customer_payment_details/update/${id}`, { First_Name, Last_name, Phone, E_mail, Amount, Service })
            .then(result => {
                console.log(result);
                navigate('/AllCoustomer');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className="update-customer-container">
                <h3 className="update-customer-title">Update Customer</h3>
                <form onSubmit={update}>
                    <div className="input-group">
                        <label className="update-customer-label" htmlFor="first_name">First Name:</label>
                        <input className="update-customer-input" type="text" id="first_name" value={First_Name} onChange={(e) => setFirst_Name(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-customer-label" htmlFor="last_name">Last Name:</label>
                        <input className="update-customer-input" type="text" id="last_name" value={Last_name} onChange={(e) => setLast_name(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-customer-label" htmlFor="phone">Phone:</label>
                        <input className="update-customer-input" type="text" id="phone" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-customer-label" htmlFor="email">Email:</label>
                        <input className="update-customer-input" type="text" id="email" value={E_mail} onChange={(e) => setE_mail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-customer-label" htmlFor="amount">Amount:</label>
                        <input className="update-customer-input" type="text" id="amount" value={Amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-customer-label" htmlFor="service">Service:</label>
                        <select id="Service" value={Service} onChange={(e) => setService(e.target.value)} required>
                            <option value="">Select Service </option>
                            <option value="Tour_Package">Tour_Package</option>
                            <option value="Transport">Transport</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Restaurants">Restaurants</option>
                        </select>
                    </div>
                    <br />
                    <button className="update-customer-button" type="submit">Save Changes</button>
                    <button className="update-customer-button" type="submit">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateCustomer;
