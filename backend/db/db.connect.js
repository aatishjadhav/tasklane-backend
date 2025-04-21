const mongoose = require("mongoose");
require("dotenv").config();

const MongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  mongoose
    .connect(MongoUri)
    .then(() => {
      console.log("Connected to MongoDB successfully.");
    })
    .catch((err) => {
      console.log("Error while connecting to database", err);
    });
};

module.exports = { initializeDatabase };
