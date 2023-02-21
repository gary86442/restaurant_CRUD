// require data
const restaurants = require("./restaurant.json").results;
const restaurantDB = require("../restaurant");
// MongoDB  setting
const db = require("../../config/mongoose");
// const restaurant = require("../restaurant");

db.once("open", () => {
  for (restaurant of restaurants) {
    restaurantDB.create({
      // ...restaurant,
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
