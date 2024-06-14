import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import Navigation from '../../pages/Navigation';
import './packageManage.css';

function TourPackageManagement() {
    const [packages, setPackages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/packages")
            .then((res) => {
                setPackages(res.data);
            })
            .catch((err) => {
                console.error("Error fetching tour packages:", err);
                alert("Failed to fetch tour packages.");
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/packages/delete/${id}`)
            .then(() => {
                setPackages(packages.filter(pkg => pkg._id !== id));
                console.log("Tour package deleted successfully");
            })
            .catch((err) => {
                console.error("Error deleting tour package:", err);
                alert("Failed to delete tour package.");
            });
    };

    const downloadPDF = (packagesToDownload) => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        doc.setFontSize(20);
        doc.text("Tour Package Details", 105, 20, null, null, "center");

        doc.setFontSize(14);
        let y = 40;
        packagesToDownload.forEach(pkg => {
            doc.text(`Package Name: ${pkg.package_name}`, 20, y);
            y += 10;
            doc.text(`Customer Name: ${pkg.customer_name}`, 20, y);
            y += 10;
            doc.text(`Customer NIC: ${pkg.customer_NIC}`, 20, y);
            y += 10;
            doc.text(`Phone Number: ${pkg.phone_number}`, 20, y);
            y += 10;
            doc.text(`Number of Persons: ${pkg.NOF_person}`, 20, y);
            y += 20;
        });

        doc.setFontSize(12);
        doc.text("Generated on: " + currentDate, 105, 280, null, null, "center");

        const filename = searchTerm ? `tour_package_details_${searchTerm}.pdf` : 'tour_package_details.pdf';
        doc.save(filename);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPackages = packages.filter(pkg =>
        pkg.package_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navigation />
            <div className="custom-container mt-3">
                <input
                    type="text"
                    placeholder="Search by package name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                />
            </div>
            <div className="custom-container mt-5">
                <div></div>
                <h1 className="emph1">Tour Packages</h1>
                <button onClick={() => downloadPDF(searchTerm ? filteredPackages : packages)} className="custom-button custom-button-primary" style={{ marginBottom: '10px' }}>
                    Download {searchTerm ? `Filtered` : `All`} Tour Package Details
                </button>
                <table className="custom-table custom-table-striped custom-table-bordered">
                    <thead className="custom-thead-dark">
                        <tr>
                            <th>Package Name</th>
                            <th>Customer Name</th>
                            <th>Customer NIC</th>
                            <th>Phone Number</th>
                            <th>Number of Persons</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPackages.map(pkg => (
                            <tr key={pkg._id}>
                                <td>{pkg.package_name}</td>
                                <td>{pkg.customer_name}</td>
                                <td>{pkg.customer_NIC}</td>
                                <td>{pkg.phone_number}</td>
                                <td>{pkg.NOF_person}</td>
                                <td>
                                    <Link to={`/updatePackage/${pkg._id}`} className="custom-button custom-button-primary" style={{ marginRight: '10px' }}>Update</Link>
                                    <button onClick={() => handleDelete(pkg._id)} className="custom-button custom-button-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TourPackageManagement;