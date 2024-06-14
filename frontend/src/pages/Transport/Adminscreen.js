import React, { useState, useEffect, useRef } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../../component/Transport/Loader';
import Error from '../../component/Transport/Error';
import { useReactToPrint } from "react-to-print";
import { Link } from 'react-router-dom'
import './Adminscreen.css';
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
import Navigation from '../../pages/Navigation';
import jsPDF from 'jspdf'; 



const { TabPane } = Tabs;

function Adminscreen() {
    return (
        <div>
                <Navigation />
        
        <div className='trasprot-admin'>
            <h3 className='text-center' style={{ frontSize: '30px' }}><b>Admin Panel</b></h3>
            <Tabs defaultActiveKey='1' >
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Vehicles" key="2">
                    <Vehicles />
                </TabPane>
                <TabPane tab="Add Vehicle" key="3">
                    <Addvehicle />
                </TabPane>
            </Tabs>
        </div>
        </div>
    );
}

export default Adminscreen;

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/bookings/bookings");
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
               // setError(error);
            }
        };

        fetchData();

    }, []);

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        DocumentTitle: "Bookings",
        onafterprint: () => alert("Booking report successfully downloaded")
    });

    return (
        <div className='row'>
            <div className='col-md-10' ref={ComponentsRef}>
                <h2>Bookings</h2>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark' >
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>Vehicle Code</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Driver Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.name}</td>
                                <td>{booking.vehicleCode}</td>
                                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                                <td>{booking.withDriver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button className="btn btn-primary mt-2" onClick={handlePrint}>Download Report</button>

                {error && (<Error message="Failed to fetch bookings" />)}
            </div>
        </div>
    );
}



export function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/vehicles/getallvehicles");
                setVehicles(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/vehicles/delete/${id}`);
            setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const downloadPDF = () => {
        // Generate PDF document with vehicle details
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        // Header
        doc.setFontSize(20);
        doc.text("Vehicle Details", 105, 20, null, null, "center");

        // Content
        doc.setFontSize(14);
        let y = 40;
        vehicles.forEach(vehicle => {
            doc.text(`Vehicle Type: ${vehicle.type}`, 20, y);
            y += 10;
            doc.text(`Max Count: ${vehicle.maxCount}`, 20, y);
            y += 10;
            doc.text(`Phone Number: ${vehicle.phonenumber}`, 20, y);
            y += 10;
            doc.text(`Rent per Kilometer: ${vehicle.rentperday}`, 20, y);
            y += 20;
        });

        // Footer
        doc.setFontSize(12);
        doc.text("Generated on: " + currentDate, 105, 280, null, null, "center");

        // Save PDF
        doc.save('vehicle_details.pdf');
    };

    return (
        <div className='row'>
            <div className='col-md-10'>
                <h2>Vehicles</h2>
                <button onClick={downloadPDF} className="btn btn-primary mb-3">Download Vehicle Details</button>
                <table className='table table-bordered table-dark'>
                    <thead>
                        <tr>
                            <th>Vehicle type</th>
                            <th>Max Count</th>
                            <th>Phone number</th>
                            <th>Rent per kilometer</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.maxCount}</td>
                                <td>{vehicle.phonenumber}</td>
                                <td>{vehicle.rentperday}</td>
                                <td>
                                    <Link to={`/vehicleupdate/${vehicle._id}`} className="btn btn-primary mr-1 btn-sm" style={{ marginRight: '10px' }}>Update</Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(vehicle._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}





export function Addvehicle() {
    const [name, setname] = useState('');
    const [rentperday, setrentperday] = useState('');
    const [maxCount, setmaxCount] = useState('');
    const [description, setdescription] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [type, settype] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadProgress1, setUploadProgress1] = useState(0);
    const [uploadProgress2, setUploadProgress2] = useState(0);
    const [uploadProgress3, setUploadProgress3] = useState(0);

    const handleUpload1 = async (selectedFile) => {
        if (selectedFile) {
            try {
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(selectedFile.name);
                const uploadTask = fileRef.put(selectedFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Track upload progress for image1
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log('Upload Progress (Image 1):', progress);
                        setUploadProgress1(progress);
                    },
                    (error) => {
                        console.error(error);
                    },
                    () => {
                        // Upload complete
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('Image 1 available at', downloadURL);
                            setImage1(downloadURL);
                        });
                    }
                );
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('No file selected');
        }
    };

    const handleUpload2 = async (selectedFile) => {
        if (selectedFile) {
            try {
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(selectedFile.name);
                const uploadTask = fileRef.put(selectedFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Track upload progress for image1
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log('Upload Progress (Image 2):', progress);
                        setUploadProgress2(progress);
                    },
                    (error) => {
                        console.error(error);
                    },
                    () => {
                        // Upload complete
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('Image 1 available at', downloadURL);
                            setImage2(downloadURL);
                        });
                    }
                );
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('No file selected');
        }
    };

    const handleUpload3 = async (selectedFile) => {
        if (selectedFile) {
            try {
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(selectedFile.name);
                const uploadTask = fileRef.put(selectedFile);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Track upload progress for image1
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log('Upload Progress (Image 3):', progress);
                        setUploadProgress3(progress);
                    },
                    (error) => {
                        console.error(error);
                    },
                    () => {
                        // Upload complete
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('Image 1 available at', downloadURL);
                            setImage3(downloadURL);
                        });
                    }
                );
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('No file selected');
        }
    };

    async function addVehicle() {
        if (!name || !rentperday || !maxCount || !description || !phonenumber || !type || !image1 || !image2 || !image3) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }

        const newvehicle = {
            name,
            rentperday,
            maxCount,
            description,
            phonenumber,
            type,
            imageurls: [image1, image2, image3]
        };

        try {
            const result = await axios.post('http://localhost:8080/api/vehicles/addvehicle', newvehicle);
            setSuccessMessage('Vehicle added successfully! Thank you for choosing us.');
            setname('');
            setrentperday('');
            setmaxCount('');
            setdescription('');
            setphonenumber('');
            settype('');
            setImage1('');
            setImage2('');
            setImage3('');
            setErrorMessage('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='row'>
            <div className='col-md-5'>
                <input type="text" className="form-control" placeholder="Vehicle name" value={name} onChange={(e) => { setname(e.target.value) }} />
                <input type="text" className="form-control mt-2" placeholder="Rent per kilometer" value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} />
                <input type="text" className="form-control mt-2" placeholder="Max count" value={maxCount} onChange={(e) => { setmaxCount(e.target.value) }} />
                <input type="text" className="form-control mt-2" placeholder="Description" value={description} onChange={(e) => { setdescription(e.target.value) }} />
                <input type="text" className="form-control mt-2" placeholder="Phone number" value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />
            </div>
            <div className='col-md-5'>
            <select className="form-control" value={type} onChange={(e) => settype(e.target.value)}>
                     <option value='all'>All</option>
                     <option value='Car'>Car</option>
                        <option value='Bicycle'>Bicycle</option>
                        <option value='Bus'>Bus</option>
                        <option value='Van'>Van</option>
                        <option value='Threewheel'>Threewheel</option>
                    </select>

                    <input type="file" className="form-control mt-2" onChange={(e) => handleUpload1(e.target.files[0], setImage1, setUploadProgress1)} />
                <progress value={uploadProgress1} max="100" />
                <input type="file" className="form-control mt-2" onChange={(e) => handleUpload2(e.target.files[0], setImage2, setUploadProgress2)} />
                <progress value={uploadProgress2} max="100" />
                <input type="file" className="form-control mt-2" onChange={(e) => handleUpload3(e.target.files[0], setImage3, setUploadProgress3)} />
                <progress value={uploadProgress3} max="100" />
                <div className='text-right'>
                    <button className="btn btn-primary mt-2" onClick={addVehicle}>Add vehicle</button>
                </div>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
            </div>
        </div>
    );
}
