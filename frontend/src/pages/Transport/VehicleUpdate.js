import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../../pages/Navigation';
import './vehicleUpdate.css';

const Update = () => {
    const { id } = useParams();
    const [type, setType] = useState('');
    const [maxCount, setMaxCount] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [rentperday, setRentperday] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/vehicles/getvehiclebyid/${id}`)
            .then(result => {
                const data = result.data;
                setType(data.type);
                setMaxCount(data.maxCount);
                setPhonenumber(data.phonenumber);
                setRentperday(data.rentperday);
            })
            .catch(err => console.log(err));
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        const updatedData = {
            type: type,
            maxCount: maxCount,
            phonenumber: phonenumber,
            rentperday: rentperday
        };
        axios.put(`http://localhost:8080/api/vehicles/update/${id}`, updatedData)
            .then(result => {
                console.log(result);
                navigate('/admin');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navigation />

        
        <div className='updatev-container'>
           
            <div className='updatev-form'>
                <h3>Update User</h3>
                <form onSubmit={update}>
                    <div className='updatev-field'>
                        <label htmlFor="type" className='updatev-label'>Type:</label>
                        <input
                            type="text"
                            id="type"
                            className='updatev-input'
                            placeholder='type'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <div className='updatev-field'>
                        <label htmlFor="maxCount" className='updatev-label'>Max Count:</label>
                        <input
                            type="text"
                            id="maxCount"
                            className='updatev-input'
                            placeholder='maxCount'
                            value={maxCount}
                            onChange={(e) => setMaxCount(e.target.value)}
                        />
                    </div>
                    <div className='updatev-field'>
                        <label htmlFor="phone" className='updatev-label'>Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className='updatev-input'
                            placeholder='Enter Your Phone'
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                        />
                    </div>
                    <div className='updatev-field'>
                        <label htmlFor="rentperday" className='updatev-label'>Rent Per Day</label>
                        <input
                            type="rentperday"
                            id="rentperday"
                            className='updatev-input'
                            placeholder='Enter Your Email'
                            value={rentperday}
                            onChange={(e) => setRentperday(e.target.value)}
                        />
                    </div>
                   
                    <button type="submit" className='updatev-btn'>Save Changes</button>
                    <button type="submit" className='updatev-btn'>Cancel</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Update;
