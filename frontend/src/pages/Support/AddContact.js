import React, { useState } from "react";
import axios from "axios";
import Navigation from '../../pages/Navigation';
import './AddContact.css';// Import CSS file for AddContact

export default function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function sendData(e) {
    e.preventDefault();
    const newContact = {
      name,
      email,
      message,
    };

    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required",
      }));
      return;
    }

    if (!email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      return;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email format is incorrect",
      }));
      return;
    }

    if (!message.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Message is required",
      }));
      return;
    }

    axios
      .post("http://localhost:8080/contact/add", newContact)
      .then(() => {
        alert("Form details submitted");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({});
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
    <Navigation />
    <div className="addcontact-container">
      <div className="addcontact-form">
        <form onSubmit={sendData}>
          <div className="addcontact-form-group mb-3">
            <label htmlFor="addcontact-name">Name</label>
            <input
              type="text"
              className="addcontact-form-control"
              id="addcontact-name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => {
                const enteredValue = e.target.value;
                const validName = /^[A-Za-z\s]*$/;
                if (validName.test(enteredValue) || enteredValue === "") {
                  setName(enteredValue);
                  setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
                }
              }}
            />
            {errors.name && (
              <div className="addcontact-text-danger">{errors.name}</div>
            )}
          </div>
          <div className="addcontact-form-group mb-3">
            <label htmlFor="addcontact-email">Email address</label>
            <input
              type="email"
              className="addcontact-form-control"
              id="addcontact-email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
              }}
            />
            {errors.email && (
              <div className="addcontact-text-danger">{errors.email}</div>
            )}
          </div>
          <div className="addcontact-form-group mb-3">
            <label htmlFor="addcontact-message">Message</label>
            <textarea
              className="addcontact-form-control"
              id="addcontact-message"
              value={message}
              placeholder="Enter your message"
              onChange={(e) => {
                setMessage(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  message: "",
                }));
              }}
            />
            {errors.message && (
              <div className="addcontact-text-danger">{errors.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="addcontact-btn addcontact-btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
