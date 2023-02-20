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

const methodOverrid = require("method-override");
app.use(methodOverrid("_method"));

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

//handling read
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  restaurantDB
    .findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});
// hadling creat restaurant
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});
app.post("/restaurants", (req, res) => {
  const restaurant = req.body;
  return restaurantDB
    .create({
      ...restaurant,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});
// handling update
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  restaurantDB
    .findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});
app.put("/restaurants/:id", (req, res) => {
  const restaurant = req.body;
  const id = req.params.id;
  return restaurantDB
    .findById(id)
    .then((oldRestaurant) => {
      oldRestaurant = Object.assign(oldRestaurant, restaurant);
      return oldRestaurant.save();
    })
    .then(() => {
      res.redirect(`/restaurants/${id}`);
    })
    .catch((error) => console.log(error));
});

//handling delete
app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return restaurantDB
    .findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// handling search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  return restaurantDB
    .find()
    .lean()
    .then((restaurants) => {
      const filteredRestaurant = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      );
      res.render("index", { restaurants: filteredRestaurant, keyword });
    })
    .catch((error) => console.log(error));
});
// listen server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
