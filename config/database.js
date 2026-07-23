const mongoose = require("mongoose");

// database-related
const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
  console.log("mongo database connected succesfully");
};

module.exports = connectDatabase;
