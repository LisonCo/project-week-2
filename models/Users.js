const express = require('express');
const router  = express.Router();
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;



// User Schema
const userSchema = new Schema({
  username: String,
  password: String
}, {
  timestamps: true
});

const User = mongoose.model("users", userSchema, "users");


module.exports = User;
