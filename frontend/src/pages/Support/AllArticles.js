import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from '../../pages/Navigation';
import './AllArticle.css';

export default function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [updatedArticleDetails, setUpdatedArticleDetails] = useState({
    title: "",
    subtitle: "",
    content: ""
  });

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

  const handleEdit = (id, title, subtitle, content) => {
    setEditingArticleId(id);
    setUpdatedArticleDetails({ title, subtitle, content });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedArticleDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveUpdatedArticle = async (id) => {
    try {
      await axios.put(`http://localhost:8080/articles/update/${id}`, updatedArticleDetails);
      alert("Article updated successfully.");

      const updatedArticleResponse = await axios.get(`http://localhost:8080/articles/get/${id}`);
      const updatedArticle = updatedArticleResponse.data.article;

  
      setEditingArticleId(null);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/articles/delete/${id}`);
      alert("Article deleted successfully.");
      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  return (
    <div>
    <Navigation />
    <div className="AllAritical-container mt-4">
      <h1 className="AllAritical-heading">
        All Articles
      </h1>
      <table className="AllAritical-table table table-striped">
        <thead>
          <tr>
            <th className="AllAritical-table-heading">Title</th>
            <th className="AllAritical-table-heading">Subtitle</th>
            <th className="AllAritical-table-heading">Content</th>
            <th className="AllAritical-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td className="AllAritical-table-data">
                {editingArticleId === article._id ? (
                  <input
                    type="text"
                    className="AllAritical-input"
                    name="title"
                    value={updatedArticleDetails.title}
                    onChange={handleUpdate}
                  />
                ) : (
                  article.title
                )}
              </td>
              <td className="AllAritical-table-data">
                {editingArticleId === article._id ? (
                  <input
                    type="text"
                    className="AllAritical-input"
                    name="subtitle"
                    value={updatedArticleDetails.subtitle}
                    onChange={handleUpdate}
                  />
                ) : (
                  article.subtitle
                )}
              </td>
              <td className="AllAritical-table-data">
                {editingArticleId === article._id ? (
                  <textarea
                    className="AllAritical-textarea"
                    name="content"
                    value={updatedArticleDetails.content}
                    onChange={handleUpdate}
                  />
                ) : (
                  article.content
                )}
              </td>
              <td className="AllAritical-table-data AllAritical-actions">
                <div className="btn-group" role="group">
                  {editingArticleId === article._id ? (
                    <button
                      className="AllAritical-btn btn btn-success mr-2"
                      onClick={() => saveUpdatedArticle(article._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="AllAritical-btn btn btn-primary mr-2"
                      onClick={() =>
                        handleEdit(article._id, article.title, article.subtitle, article.content)
                      }
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="AllAritical-btn btn btn-danger"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
