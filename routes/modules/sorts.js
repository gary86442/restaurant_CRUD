const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurant");

router.get("/desc", (req, res) => {
  restaurantDB
    .find()
    .lean()
    .sort({ name: "desc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
router.get("/rating", (req, res) => {
  restaurantDB
    .find()
    .lean()
    .sort({ rating: "desc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});
router.get("/location", (req, res) => {
  restaurantDB
    .find()
    .lean()
    .sort({ location: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

module.exports = router;
