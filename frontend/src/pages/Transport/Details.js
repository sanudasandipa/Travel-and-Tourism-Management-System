import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [bookings, setBookings] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Get user information from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser._Id) {
          // Fetch bookings for the current user's ID
          const res = await axios.get(`/api/users?userId=${currentUser._Id}`);
          setBookings(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
      setSuccessMessage('Booking cancelled successfully');
    } catch (err) {
      setErrorMessage('Failed to cancel booking');
      console.error(err);
    }
  };

  const buttonStyle = {
    backgroundColor: '#005F40',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    width: '10%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
  };

  return (
    <div>
      <div>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <div>
        <h2>Booked Users</h2>
        {bookings.map((booking) => (
          <div className='bs' key={booking._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <p>Name: {booking.name}</p>
            <p>Email: {booking.email}</p>
            <p>Phone Number: {booking.phoneNumber}</p>
            <p>Vehicle Code : {booking.vehicleCode}</p>
            {/* Display other booking details */}
            <button onClick={() => handleCancel(booking._id)} style={{ ...buttonStyle, backgroundColor: 'red' }}>Cancel Booking</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
