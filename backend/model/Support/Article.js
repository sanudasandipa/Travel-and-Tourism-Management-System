const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // You can add more fields if needed, such as author, publication date, etc.
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
