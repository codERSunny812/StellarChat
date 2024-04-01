// code for the database connection
const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;

exports.connectDatabase = () => {
  // connect to the database
  mongoose
    .connect(`mongodb+srv://codeERASunny:Sunnynjr%401234%40@chatkroapp.o7rlluw.mongodb.net/`)
    .then(() => {
      console.log("the mongodb is successfully connected");
    })
    .catch((error) => {
      console.log(
        "the mongodb is not successfully connected with the database due to " +
          error
      );
    });
    
};
