const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    tittle: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Posts", postSchema, "posts")