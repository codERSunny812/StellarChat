const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;

exports.connectDatabase = () => {
  // connection to the database
  mongoose
    .connect(`${process.env.MONGO_URL}/stellarchat`)
    .then(() => {
      console.log("the mongodb is successfully connected");
    })
    .catch((error) => {
      ``;
      console.log("error in connecting with mongodb server");
    });
};
