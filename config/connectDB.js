const mongoose = require("mongoose");

const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConn;
