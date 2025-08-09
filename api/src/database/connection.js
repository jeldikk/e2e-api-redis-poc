const mongoose = require("mongoose");

const { MONGO_URI } = require("../config");

const connectDB = async () => {
  try {
    // console.log({ MONGO_URI });
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
