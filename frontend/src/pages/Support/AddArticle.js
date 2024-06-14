import React, { useState } from "react";
import axios from "axios";
import Navigation from '../../pages/Navigation';
import './AddArticle.css';

export default function AddArticle() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  function sendData(e) {
    e.preventDefault();
    const newArticle = {
      title,
      subtitle,
      content
    };

    axios.post("http://localhost:8080/articles/add", newArticle)
      .then(() => {
        alert("Article submitted successfully.");
        setTitle("");
        setSubtitle("");
        setContent("");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }

  return (
    <div>
      <Navigation />
    <div className="addArticle-container">
    
    <div className="addArticle-content">
      <h2 className="addArticle-heading">Add New Article</h2>
      <div className="addArticle-form">
        <div className="addArticle-card">
          <form onSubmit={sendData}>
            <div className="addArticle-form-group">
              <label htmlFor="title" className="addArticle-label">Title</label>
              <input
                type="text"
                className="addArticle-input"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="addArticle-form-group">
              <label htmlFor="subtitle" className="addArticle-label">Subtitle</label>
              <input
                type="text"
                className="addArticle-input"
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
            <div className="addArticle-form-group">
              <label htmlFor="content" className="addArticle-label">Content</label>
              <textarea
                className="addArticle-input addArticle-textarea"
                id="content"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="addArticle-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
