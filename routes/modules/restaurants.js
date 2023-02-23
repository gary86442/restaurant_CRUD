const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurant");

// handling create restaurant
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/", (req, res) => {
  const restaurant = req.body;
  return restaurantDB
    .create({
      ...restaurant,
    })
    .then(() => {
      restaurantDB
        .findOne({ name: restaurant.name })
        .lean()
        .then((newRest) => {
          res.redirect(`/restaurants/${newRest._id}`);
        });
    })
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});
//handling read
router.get("/:id", (req, res) => {
  const id = req.params.id;
  restaurantDB
    .findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});

// handling update
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  restaurantDB
    .findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});
router.put("/:id", (req, res) => {
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
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});

//handling delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return restaurantDB
    .findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});

// handling search
router.get("/search", (req, res) => {
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
    .catch((error) => {
      console.log(error);
      res.render("error", { error: error.message });
    });
});

module.exports = router;
