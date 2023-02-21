const express = require("express");
const router = express.Router();
const restaurantDB = require("../../models/restaurant");

router.get("/", (req, res) => {
  restaurantDB
    .find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

module.exports = router;
