// model create => movie
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  poster: String,
  rating: String,
  genere: String,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
