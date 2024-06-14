const router = require("express").Router();
const Article = require("../../model/Support/Article");

// Add Article
router.post("/add", async (req, res) => {
  const { title, subtitle, content } = req.body;

  if (!title || !subtitle || !content) {
    return res
      .status(400)
      .json({ error: "All are required" });
  }

  try {
    const newArticle = new Article({
      title,
      subtitle,
      content,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article submitted successfully" });
  } catch (error) {
    console.error("Error adding article:", error);
    res.status(500).json({ error: "Unable to submit article" });
  }
});

// Get all Articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Unable to fetch articles" });
  }
});

// Update Article
router.put("/update/:id", async (req, res) => {
  const { title, subtitle, content } = req.body;
  const articleId = req.params.id;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { title, subtitle, content },
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article updated successfully" });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Unable to update article" });
  }
});

// Get Article by ID
router.get("/get/:id", async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Unable to fetch article" });
  }
});

// Delete Article by ID
router.delete("/delete/:id", async (req, res) => {
  const articleId = req.params.id;

  try {
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Unable to delete article" });
  }
});

module.exports = router;
