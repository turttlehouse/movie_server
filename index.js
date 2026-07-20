// express => web server
// tradition js => common js

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// async, await => asyncrhonous operation => kei time lagna sakxa => promise return garxa.

async function connectDatabase() {
  await mongoose.connect(
    "mongodb+srv://buildandrun464_db_user:movie@cluster0.gv2cvyo.mongodb.net/?appName=Cluster0",
  );
  console.log("mongo database connected succesfully");
}

connectDatabase();

// model create => movie
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  poster: String,
  rating: String,
  genere: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// api => /movies

app.post("/movies", (req, res) => {
  console.log(req.body);

  const movie = Movie.create(req.body);
  res.status(201).json({
    data: movie,
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "movie_server is running....",
  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
