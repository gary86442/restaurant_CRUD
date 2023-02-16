//require framework
const express = require("express");
const app = express();
const port = 3000;
// require template engine
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
//setting static data
app.use(express.static("public"));

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
//handling route
app.get("/", (req, res) => {
  res.render("index");
});

// listen server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
