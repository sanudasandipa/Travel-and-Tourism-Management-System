import React, { useState } from 'react';
import axios from 'axios';
import './OfflinePayament.css';
import Navigation from '../Navigation';
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
//import { useNavigate , Link } from 'react-router-dom';

function AddOflinePayment() {
    const [bank, setBank] = useState("");
    const [branch, setBranch] = useState("");
    const [paidDate, setPaidDate] = useState("");
    const [Upload_Slip, setSlip] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Check if all required fields are filled
        if (!bank || !branch || !paidDate || !Upload_Slip) {
            alert('All fields are required');
            return;
        }

        // Prepare the data object to be sent in the POST request
        const newPayment = {
            Bank: bank,
            Branch: branch,
            Paid_Date: paidDate,
            Upload_Slip: Upload_Slip
        };

        // Send a POST request to add the new offline payment
        const response = await axios.post("http://localhost:8080/offlinepayment/add", newPayment);

        // Check if the request was successful
        if (response.status === 200) {
            alert('Offline Payment added successfully.');
            resetForm(); // Reset the form fields
        } else {
            alert('Failed to add Offline Payment.');
        }
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error adding offline payment:', error);
        alert('Failed to add Offline Payment.');
    }
};


    const resetForm = () => {
        setBank("");
        setBranch("");
        setPaidDate("");
        setSlip("");
    };

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        
        if(selectedFile){
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(selectedFile.name);
    
          const uploadTask = fileRef.put(selectedFile);
    
          uploadTask.on('state_changed', 
            (snapshot) => {
              // Track upload progress
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setUploadProgress(progress);
            },
            (error) => {
              console.error(error);
            },
            () => {
              // Upload complete
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                setSlip(downloadURL);
              });
            }
          );
        }
        else{
          console.log('no file selected');
        }
      };    

    return (
        <div>
        <Navigation />
        <div className="add-offline-payment">
            <h2>Add Offline Payment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bank">Bank:</label>
                    <input type="text" id="bank" value={bank} onChange={(e) => setBank(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="branch">Branch:</label>
                    <input type="text" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="paidDate">Paid Date:</label>
                    <input type="text" id="paidDate" value={paidDate} onChange={(e) => setPaidDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="slip">Upload Slip:</label>
                    <input type="file" id="slip" onChange={handleUpload} required />
                </div>
                <div
                     class="mt-4 text-sm text-gray-500 dark:text-gray-300"
                 id="user_avatar_help"
                     >
                      A Upload Slip shoul be SVG , PNG ,JPG or JPEG
        
                     <p>Upload Progress: {uploadProgress}%</p>
                </div>
                <button type="submit">Add Offline Payment</button>
            </form>
        </div>
    </div>
    );
}

export default AddOflinePayment;
