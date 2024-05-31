const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;

exports.connectDatabase = () => {
  // connection to the database
  mongoose
    .connect("mongodb+srv://sengersunny448:ltxX54UPyMn4SOSd@stellarchat.cginm5y.mongodb.net/chatkro")
    .then(() => {
      console.log("the mongodb is successfully connected");
    })
    .catch((error) => {
      console.log(
        "error in connecting with mongodb server" +
          error
      );
    });    
};
