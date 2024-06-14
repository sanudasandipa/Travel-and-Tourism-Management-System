import React, { useState } from 'react';
import './vehicle.css'; // Import CSS file
import { Link } from 'react-router-dom'


function Vehicle({ vehicle }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="vehi-container">
    <div className="vehi-image">
      <img src={vehicle.imageurls[0]} alt="Vehicle" />
    </div>

    <div className="vehi-details">
      <h2>{vehicle.name}</h2>
      <div className="vehi-info">
        <p><strong>Max Count:</strong> {vehicle.maxCount}</p>
        <p><strong>Phone Number:</strong> {vehicle.phonenumber}</p>
        <p><strong>Type:</strong> {vehicle.type}</p>
        <p><strong>Rent per kilometer:</strong> {vehicle.rentperday}</p>
      </div>

      <div className="vehi-buttons">
        <Link to={`/book/${vehicle._id}`}>
          <button className="vehi-btn">Book Now</button>
        </Link>
        <button className="vehi-btn" onClick={handleShow}>View Details</button>
      </div>
    </div>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{vehicle.name}</h3>
              <button className="close" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="carousel">
                {vehicle.imageurls.map((url, index) => (
                  <img
                    key={index}
                    className='carousel-item'
                    src={url}
                    alt={`Vehicle ${index + 1}`}
                  />
                ))}
              </div>
              <p>{vehicle.description}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vehicle;
