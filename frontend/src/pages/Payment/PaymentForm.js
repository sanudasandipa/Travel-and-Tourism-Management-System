import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navigation from '../../pages/Navigation';
import './PaymentForm.css'; 

function FormComponent() {
  const [First_Name, setFirst_Name] = useState("");
  const [Last_name, setLast_name] = useState("");
  const [Phone, setPhone] = useState("");
  const [E_mail, setE_mail] = useState("");
  const [Amount, setAmount] = useState("");
  const [Service, setService] = useState(""); // Added Service state
  const [emailError, setEmailError] = useState("");
  const [paymentAdded, setPaymentAdded] = useState(false);

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateEmail(E_mail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const newCustomerPaymentDetails = {
      First_Name,
      Last_name,
      Phone,
      E_mail,
      Amount,
      Service,
    };

    axios.post("http://localhost:8080/customer_payment_details/add", newCustomerPaymentDetails)
      .then(() => {
        alert("customer Data added successfully.");
        setPaymentAdded(true);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <Navigation />
    <div className="container mt-5">

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className ="card shadow">
            <div className="card">
              <div className="card-body">
                <form onSubmit={sendData}>
                  <h5>Customer Details</h5>
                  <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      value={First_Name}
                      onChange={(e) => {
                        const input = e.target.value;
                        const isValid = /^[a-zA-Z]*$/.test(input);
                        if (isValid || input === "") {
                          setFirst_Name(input);
                        }
                      }}
                      required
                    />
                    <br /><br />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      value={Last_name}
                      onChange={(e) => {
                        const input = e.target.value;
                        const isValid = /^[a-zA-Z]*$/.test(input);
                        if (isValid || input === "") {
                          setLast_name(input);
                        }
                      }}
                      required
                    />
                    <br /><br />
                  </div>
                  <div>
  <label htmlFor="phone">Phone:</label>
  <input
    type="tel"
    value={Phone}
    onChange={(e) => {
      const input = e.target.value;
      // Allow only numbers and limit input to 10 characters
      const filteredInput = input.replace(/\D/g, '').slice(0, 10);
      setPhone(filteredInput);
    }}
    required
  />
  <br /><br />
</div>

                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      value={E_mail}
                      onChange={(e) => setE_mail(e.target.value)}
                      required
                    />
                    <br />
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    <br />
                  </div>
                  <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                      type="text"
                      placeholder="Rs."
                      value={Amount}
                      onChange={(e) => {
                        const input = e.target.value;
                        const isValid = /^\d*\.?\d*$/.test(input); // Regular expression to allow numbers with optional decimal point
                        if (isValid || input === "") {
                          setAmount(input);
                        }
                      }}
                      required
                    />
                    <br /><br />
                  </div>
                  <div className="form-group">
                        <label htmlFor="Service">Service :</label>
                        <select id="Service" value={Service} onChange={(e) => setService(e.target.value)} required>
                            <option value="">Select Service </option>
                            <option value="Tour_Package">Tour_Package</option>
                            <option value="Transport">Transport</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Restaurants">Restaurants</option>
                        </select>
                    </div>
                  <button type="submit" className='btn btn-success' style={{ marginRight: '10px' }}>Continue</button>
                  <br /><br />
                  
                  <Link to="/OfflinePayament">
                  {paymentAdded && (
                    <button className='btn btn-success' style={{ marginRight: '10px' }}>Pay Offline</button>
                  )}
                  </Link>
                  {/* Link to onlinepay page */}
                  <Link to={`/OnlinePayment/${First_Name}/${Last_name}/${Amount}/${Service}`}>
                  {paymentAdded && (
                    <button className='btn btn-success'>Pay Online</button>
                  )}
                  </Link>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default FormComponent;
