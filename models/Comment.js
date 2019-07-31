const express = require('express');
const router  = express.Router();
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


// Commment Schema
const commentSchema = new Schema({
  comment: String,
  imageID: String
}, {
  timestamps: true
});

const Comment = mongoose.model("comments", commentSchema, "comments");

module.exports = Comment;