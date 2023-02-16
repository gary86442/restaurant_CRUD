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
const restaurantDB = require("./models/restaurant");

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
// body-paser
app.use(express.urlencoded({ extended: true }));

//handling route
app.get("/", (req, res) => {
  restaurantDB
    .find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  restaurantDB
    .findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});
// hadling creat restaurant
app.get("/restaurant/new", (req, res) => {
  res.render("new");
});
app.post("/restaurants", (req, res) => {
  const restaurant = req.body;
  return restaurantDB
    .create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

// listen server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
