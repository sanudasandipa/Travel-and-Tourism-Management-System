import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';


function EmployeeForm() {
    const [Employee_Name, setEmployeeName] = useState("");
    const [NIC, setNIC] = useState("");
    const [Gender, setGender] = useState("");
    const [Status, setStatus] = useState("");
    const [Start_Date, setStart_Date] = useState("");
    const [Department, setDepartment] = useState("");
    const [NICError, setNICError] = useState("");
    const [NICValidity, setNICValidity] = useState(false); 
    const [GenderError, setGenderError] = useState("");

    function sendData(e) {
        e.preventDefault();

        if (!NICValidity) {
            setNICError("Invalid NIC format. Please enter a valid NIC.");
            return;
        } else {
            setNICError("");
        }

        if (Gender !== "Male" && Gender !== "Female" && Gender !== "Not Disclosed") {
            setGenderError("Please select a valid gender option.");
            return;
        } else {
            setGenderError(""); 
        }

        const newemployee = {
            Employee_Name,
            NIC,
            Gender,
            Status,
            Start_Date,
            Department,
        };

        axios.post("http://localhost:8080/employee/add", newemployee)
            .then(() => {
                alert("Employee Data added successfully.");
                resetForm();
            })
            .catch((err) => {
                alert(err);
            });
    }

    function resetForm() {
        setEmployeeName("");
        setNIC("");
        setGender("");
        setStatus("");
        setStart_Date("");
        setDepartment("");
        setNICError("");
        setNICValidity(false);
        setGenderError("");
    }


    function handleNICChange(value) {
        const nicRegex1 = /^[0-9]{9}[vV]$/;
        const nicRegex2 = /^[0-9]{12}$/;

        if (nicRegex1.test(value) || nicRegex2.test(value)) {
            setNICValidity(true);
            setNICError("");
        } else {
            setNICValidity(false);
            setNICError("Invalid NIC format. Please enter a valid NIC.");
        }

        setNIC(value);
    }

    const handleEmployeeNameChange = (e) => {
        const value = e.target.value.replace(/[^A-Za-z\s]/gi, ''); // Allow only alphabets and spaces
        setEmployeeName(value);
    };

    return (
        <div>
            <br></br>
            <div className="employee-form">
                <div className="row justify-content-center " style={{ minHeight: "100vh" }}>
                    <div className="col-lg-5 col-md-5 col-sm-10">
                        <div className="card">
                            <h2 className="card-header text-center">Employee's Data</h2>
                            <div className="card-body">
                                <form onSubmit={sendData}>
                                    <div className="form-group">
                                        <label htmlFor="Employee_Name">Employee Name:</label>
                                        <input type="text" className="form-control" id="Employee_Name" name="Employee_Name" value={Employee_Name} onChange={handleEmployeeNameChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="NIC">NIC:</label>
                                        <input type="text" className={`form-control ${NICError && "is-invalid"}`} id="NIC" name="NIC" value={NIC} onChange={(e) => handleNICChange(e.target.value)} required />
                                        {NICError && <div className="text-danger">{NICError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Gender">Gender:</label>
                                        <select className={`form-control ${GenderError && "is-invalid"}`} id="Gender" name="Gender" value={Gender} onChange={(e) => setGender(e.target.value)} required>
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Not Disclosed">Not Disclosed</option>
                                        </select>
                                        {GenderError && <div className="text-danger">{GenderError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Status">Status:</label>
                                        <input type="text" className="form-control" id="Status" name="Status" value={Status} onChange={(e) => setStatus(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Start_Date">Start Date:</label>
                                        <input type="date" className="form-control" id="Start_Date" name="Start_Date" value={Start_Date} onChange={(e) => setStart_Date(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Department">Department:</label>
                                        <input type="text" className="form-control" id="Department" name="Department" value={Department} onChange={(e) => setDepartment(e.target.value)} required />
                                    </div>
                                    <br />
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeForm;
