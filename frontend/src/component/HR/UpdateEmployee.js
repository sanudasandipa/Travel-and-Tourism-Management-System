import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './UpdateEmployee.css'; 

const UpdateEmployee = () => {
    const { id } = useParams();
    const [Employee_Name, setEmployee_Name] = useState("");
    const [NIC, setNIC] = useState("");
    const [Gender, setGender] = useState("");
    const [Status, setStatus] = useState("");
    const [Start_Date, setStart_Date] = useState("");
    const [Department, setDepartment] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
    
        axios.get(`http://localhost:8080/employee/getemployee/${id}`)
            .then((result) => {
                const { Employee_Name, NIC, Gender, Status, Start_Date, Department } = result.data;
                setEmployee_Name(Employee_Name);
                setNIC(NIC);
                setGender(Gender);
                setStatus(Status);
                setStart_Date(formatDate(Start_Date));
                setDepartment(Department);
            })
            .catch(err => console.log(err));
    }, [id]);

    const formatDate = (dateString) => {
      
        const dateObj = new Date(dateString);
       
        return dateObj.toISOString().split('T')[0];
    };

    const update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/employee/update/${id}`, { Employee_Name, NIC, Gender, Status, Start_Date, Department })
            .then(result => {
                console.log(result);
                navigate('/getemp');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />
            <div className="update-employee-container">
                <h3 className="update-employee-title">Update Employee</h3>
                <form onSubmit={update}>
                    <div className="input-group">
                        <label className="update-employee-label" htmlFor="name">Employee Name:</label>
                        <input className="update-employee-input" type="text" id="name" value={Employee_Name} onChange={(e) => setEmployee_Name(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-employee-label" htmlFor="NIC">NIC:</label>
                        <input className="update-employee-input" type="text" id="NIC" value={NIC} onChange={(e) => setNIC(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-employee-label" htmlFor="gender">Gender:</label>
                        <input className="update-employee-input" type="text" id="gender" value={Gender} onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-employee-label" htmlFor="status">Status:</label>
                        <input className="update-employee-input" type="text" id="status" value={Status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-employee-label" htmlFor="start date">Start Date:</label>
                        <input className="update-employee-input" type="text" id="start date" value={Start_Date} onChange={(e) => setStart_Date(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="update-employee-label" htmlFor="department">Department:</label>
                        <input className="update-employee-input" type="text" id="department" value={Department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>
                    <br />
                    <button className="update-employee-button" type="submit">Save Changes</button>
                    <button className="update-employee-button" onClick={() => navigate('/getemp')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployee;
