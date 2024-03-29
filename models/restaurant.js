const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  phone: { type: String },
  google_map: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  description: { type: String },
});
module.exports = mongoose.model("restaurant", restaurantSchema);
