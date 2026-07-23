// express => web server
// tradition js => common js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

// async, await => asyncrhonous operation => kei time lagna sakxa => promise return garxa.
connectDatabase();

const movieRoutes = require("./routes/movieRoutes");
app.use("/movies", movieRoutes);

// /movies/:id

// // create movies
// app.post("/movies", );

// // get all movies ko end point
// app.get("/movies", );

// // get movies by id - findById(id)
// app.get("/movies/:id", );

// // delete movie endpoint
// app.delete('/movies/:id',)

// // update movie endpoint
// app.put('/movies/:id',)

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "movie_server is running....",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
