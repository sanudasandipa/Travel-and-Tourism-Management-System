import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Navigation from '../../pages/Navigation';
import './AllContacts.css';

export default function AllContacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [updatedContactDetails, setUpdatedContactDetails] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  useEffect(() => {
    function getContacts() {
      axios
        .get("http://localhost:8080/contact/")
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getContacts();
  }, []);

  const handleEdit = (id, name, email, message) => {
    setEditingContactId(id);
    setUpdatedContactDetails({ name, email, message });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedContactDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveUpdatedContact = async (id) => {
    try {
      await axios.put(`http://localhost:8080/contact/update/${id}`, updatedContactDetails);
      alert("Contact updated successfully.");

      const updatedContactResponse = await axios.get(`http://localhost:8080/contact/get/${id}`);
      const updatedContact = updatedContactResponse.data.user;

      setContacts(prevContacts => {
        const updatedContacts = prevContacts.map(contact => {
          if (contact._id === id) {
            return updatedContact;
          }
          return contact;
        });
        return updatedContacts;
      });

      setEditingContactId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/contact/delete/${id}`);
      alert("Contact deleted successfully.");
      setContacts(prevContacts => prevContacts.filter(contact => contact._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReply = (id) => {
    setEditingContactId(id);
    setShowReplyModal(true);
  };

  const sendReply = async () => {
    try {
      console.log("Reply message:", replyMessage);

      setShowReplyModal(false);
      setReplyMessage("");
      setEditingContactId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Contact Submissions",
    onafterprint: () => alert("Report successfully downloaded")
  });

  return (
    <div>
      <Navigation />
      <div className="AllContacts-container">
        <h1 className="AllContacts-heading">All Contacts</h1>
        <div className="row mb-4">
          <div className="col-md-6">
            <button className="AllContacts-btn btn-info btn-block" onClick={() => window.open('mailto:?subject=Subject&body=Body')}>
              Send Email
            </button>
          </div>
          <div className="col-md-6">
            <button className="AllContacts-btn btn-primary btn-block" onClick={handlePrint}>
              Download Report
            </button>
          </div>
        </div>
        <div className="AllContacts-table-container" ref={ComponentsRef}>
          <table className="AllContacts-table">
            <thead>
              <tr>
                <th className="AllContacts-table-heading">Name</th>
                <th className="AllContacts-table-heading">Email</th>
                <th className="AllContacts-table-heading">Message</th>
                <th className="AllContacts-table-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td className="AllContacts-table-data">
                    {editingContactId === contact._id ? (
                      <input
                        className="AllContacts-input"
                        type="text"
                        name="name"
                        value={updatedContactDetails.name}
                        onChange={handleUpdate}
                      />
                    ) : (
                      contact.name
                    )}
                  </td>
                  <td className="AllContacts-table-data">
                    {editingContactId === contact._id ? (
                      <input
                        className="AllContacts-input"
                        type="email"
                        name="email"
                        value={updatedContactDetails.email}
                        onChange={handleUpdate}
                      />
                    ) : (
                      contact.email
                    )}
                  </td>
                  <td className="AllContacts-table-data">
                    {editingContactId === contact._id ? (
                      <input
                        className="AllContacts-input"
                        type="text"
                        name="message"
                        value={updatedContactDetails.message}
                        onChange={handleUpdate}
                      />
                    ) : (
                      contact.message
                    )}
                  </td>
                  <td className="AllContacts-table-data">
                    <div className="AllContacts-actions">
                      {editingContactId === contact._id ? (
                        <React.Fragment>
                          <button
                            className="AllContacts-btn btn-success btn-sm"
                            onClick={() => saveUpdatedContact(contact._id)}
                          >
                            Save
                          </button>
                          <button
                            className="AllContacts-btn btn-danger btn-sm ml-2"
                            onClick={() => setEditingContactId(null)}
                          >
                            Cancel
                          </button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <button
                            className="AllContacts-btn btn-danger btn-sm ml-2"
                            onClick={() => handleDelete(contact._id)}
                          >
                            Delete
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showReplyModal && (
            <div className="AllContacts-modal" tabIndex="-1" role="dialog">
              <div className="AllContacts-modal-dialog" role="document">
                <div className="AllContacts-modal-content">
                  <div className="AllContacts-modal-header">
                    <h5 className="AllContacts-modal-title">Compose Reply</h5>
                    <button type="button" className="close" onClick={() => setShowReplyModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="AllContacts-modal-body">
                    <textarea
                      className="AllContacts-input"
                      rows="5"
                      placeholder="Type your reply here..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="AllContacts-modal-footer">
                    <button type="button" className="AllContacts-btn btn-secondary" onClick={() => setShowReplyModal(false)}>Cancel</button>
                    <button type="button" className="AllContacts-btn btn-primary" onClick={sendReply}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
