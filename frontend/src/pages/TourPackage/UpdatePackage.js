import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdatePackage.css';

const UpdatePackage = () => {
    const { id } = useParams();
    const [packageName, setPackageName] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerNIC, setCustomerNIC] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [numOfPersons, setNumOfPersons] = useState(1);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch the package details using the ID
        axios.get(`http://localhost:8080/packages/${id}`)
            .then((result) => {
                const { package_name, customer_name, customer_NIC, phone_number, NOF_person } = result.data;
                setPackageName(package_name);
                setCustomerName(customer_name);
                setCustomerNIC(customer_NIC);
                setPhoneNumber(phone_number);
                setNumOfPersons(NOF_person);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/packages/update/${id}`, { package_name: packageName, customer_name: customerName, customer_NIC: customerNIC, phone_number: phoneNumber, NOF_person: numOfPersons })
            .then(result => {
                console.log(result);
                navigate('/PackageManage');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className="update-package-container">
                <h3 className="update-package-title">Update Package</h3>
                <form onSubmit={update}>
                <div className="input-group">
                    <label className="update-package-label" htmlFor="packageName">Package Name:</label>
                    <input className="update-package-input" type="text" id="packageName" value={packageName} onChange={(e) => setPackageName(e.target.value.replace(/[^a-zA-Z]/g, ''))} />
                </div>

                <div className="input-group">
                    <label className="update-package-label" htmlFor="customerName">Customer Name:</label>
                    <input className="update-package-input" type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value.replace(/[^a-zA-Z]/g, ''))} />
                </div>

                <div className="input-group">
                    <label className="update-package-label" htmlFor="customerNIC">Customer NIC:</label>
                    <input className="update-package-input" type="text" id="customerNIC" value={customerNIC} onChange={(e) => setCustomerNIC(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} />
                </div>

                <div className="input-group">
                    <label className="update-package-label" htmlFor="phoneNumber">Phone Number:</label>
                    <input className="update-package-input" type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))} />
                </div>

                <div className="input-group">
                    <label className="update-package-label" htmlFor="numOfPersons">Number of Persons:</label>
                    <input className="update-package-input" type="number" id="numOfPersons" value={numOfPersons} onChange={(e) => setNumOfPersons(Math.max(1, parseInt(e.target.value)))} />
                </div>

                    <br />
                    <button className="update-package-button" type="submit">Save Changes</button>
                    <button className="update-package-button" type="button" onClick={() => navigate('/packages')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePackage;
