const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ DB connected"))
    .catch((error) => console.log("❌ Error connecting", error));
};

module.exports = connectDatabase;
