const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurant");

router.get("/", (req, res) => {
  restaurantDB
    .find()
    .lean()
    .sort({ name: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  if (!keyword || !keyword.length) {
    res.redirect("/");
  }
  restaurantDB
    .find({})
    .lean()
    .then((restaurants) => {
      const filteredList = restaurants.filter(
        (restaurant) =>
          restaurant.name_en.toLowerCase().includes(keyword) ||
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      );
      res.render("index", { restaurants: filteredList, keyword });
    });
});

module.exports = router;
