import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './AllCoustomer.css'; 

function AllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/customer_payment_details/")
            .then((res) => {
                setCustomers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/customer_payment_details/delete/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer._id !== id));
                console.log("Customer deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting Customer:", err);
            });
    };

    // Function to filter customers based on search term
    const filteredCustomers = customers.filter(customer => {
        return customer.First_Name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <Navigation />
            <br />
            <br />
            <div className="custom-container mt-3">
                <div className="custom-row justify-content-start">
                    <div className="custom-col-auto">
                        <Link to={`/PaymentForm`} className='custom-button custom-button-primary'>+ New Customer</Link>
                    </div>
                    
                    <div className="custom-col-auto ml-auto">
                        <br></br><br></br>
                        {/* Search bar */}
                        <input
                            type="text"
                            placeholder="Search by First Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="custom-container mt-5">
                <h1 className="emph1" >Registered Customer Details</h1>
                <table className="custom-table custom-table-striped custom-table-bordered">
                    <thead className="custom-thead-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Service</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            <tr key={customer._id}>
                                <td>{customer.First_Name}</td>
                                <td>{customer.Last_name}</td>
                                <td>{customer.Phone}</td>
                                <td>{customer.E_mail}</td>
                                <td>{customer.Amount}</td>
                                <td>{customer.Service}</td>
                                <td>
                                    <Link to={`/updateCustomer/${customer._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
                                    <button onClick={() => handleDelete(customer._id)} className="custom-button custom-button-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllCustomers;
