import React, { useState, useEffect } from "react";
import axios from "axios";
import articleImage from "./article.jpg"; 
import "./ViewAllArticles.css"; 
import Navigation from '../../pages/Navigation';

export default function AllArticlesForCustomers() {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await axios.get("http://localhost:8080/articles/");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);

  const handleReadMoreClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  // Function to filter articles based on search term
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <Navigation />
    <div className="veiwartical-container">
      <div className="veiwartical-content">
        <h1 className="veiwartical-heading">
          Customer Help Center - Knowledge Base
        </h1>
        <div className="veiwartical-image-container">
          <img src={articleImage} alt="Contact Us" className="veiwartical-image" />
        </div>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search articles by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="veiwartical-search-input"
        />
        <div className="veiwartical-article-container">
          <div className="veiwartical-article-grid">
            {/* Mapping through filtered articles instead of all articles */}
            {filteredArticles.map((article) => (
              <div key={article._id} className="veiwartical-article-card">
                <div className="veiwartical-article-card-content">
                  <h5 className="veiwartical-article-title">
                    {article.title}
                  </h5>
                  <h6 className="veiwartical-article-subtitle">
                    {article.subtitle}
                  </h6>
                  <p className="veiwartical-article-preview">
                    {article.content.substring(0, 150)}...
                  </p>
                  <button
                    className="veiwartical-article-button"
                    onClick={() => handleReadMoreClick(article)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedArticle && (
        <div
          className={`veiwartical-modal ${showModal ? "show" : ""}`}
          id="articleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="articleModalLabel"
          aria-hidden="true"
        >
          <div className="veiwartical-modal-dialog" role="document">
            <div className="veiwartical-modal-content">
              <div className="veiwartical-modal-header">
                <h5 className="veiwartical-modal-title" id="articleModalLabel">
                  {selectedArticle.title}
                </h5>
                <button
                  type="button"
                  className="veiwartical-modal-close"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <div className="veiwartical-modal-body">
                <p>{selectedArticle.content}</p>
              </div>
              <div className="veiwartical-modal-footer">
                <button
                  type="button"
                  className="veiwartical-modal-button"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
