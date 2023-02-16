// require data
const restaurants = require("./restaurant.json").results;
const restaurantDB = require("../restaurant");
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
  for (restaurant of restaurants) {
    restaurantDB.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    });
  }
  console.log("seeder done");
});
