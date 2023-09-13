const express = require("express");
const mongoose = require("mongoose");

const app = express();

const connectDB = async (URI) => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    app.get("/error", (req, res) => {
      console.log(error);
      return res.status(500).json(error.message);
    });
  }
};

module.exports = connectDB;
