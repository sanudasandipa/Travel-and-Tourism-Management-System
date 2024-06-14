import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from 'moment';
import Navigation from '../../pages/Navigation';
import './AllEmployee.css'; 

function AllEmployees() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/employee/")
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/employee/delete/${id}`)
            .then(() => {
                setEmployees(employees.filter(employee => employee._id !== id));
                console.log("Employee deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting Employee:", err);
            });
    };

    return (
        <div>
            <Navigation />
            <br />
            <br />
            <div className="custom-container mt-3">
                <div className="custom-row justify-content-start">
                    <div className="custom-col-auto">
                    <Link to={`/addemp`} className='custom-button custom-button-primary'>+ New Employee</Link>

                    </div>
                </div>
            </div>
            <div className="custom-container mt-5">
                <h1 className="emph1" >Registered Employee Details</h1>
                <table className="custom-table custom-table-striped custom-table-bordered">
                    <thead className="custom-thead-dark">
                        <tr>
                            <th>Employee Name</th>
                            <th>NIC</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.Employee_Name}</td>
                                <td>{employee.NIC}</td>
                                <td>{employee.Gender}</td>
                                <td>{employee.Status}</td>
                                <td>{moment(employee.Start_Date).format('YYYY-MM-DD')}</td>
                                <td>{employee.Department}</td>
                                <td>
                                <Link to={`/updateEmp/${employee._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
                                <button onClick={() => handleDelete(employee._id)} className="custom-button custom-button-danger">Delete</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllEmployees;
