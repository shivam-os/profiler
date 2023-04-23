const mongoose = require("mongoose");
require("dotenv").config();

//Mongodb url for database
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wsodnzw.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`

//Connect to the database
const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.log("Error while connecting to the database:", err);
  }
};
connectToDB();
