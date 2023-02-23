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

module.exports = router;
