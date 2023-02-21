// MongoDB  setting
const mongoose = require("mongoose");

// use dotenv only in testing
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", () => {
  console.log("DB Error");
});

db.once("open", () => {
  console.log("DB connect!");
});

module.exports = db;
