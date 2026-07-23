const express = require("express");
const {
  createMovie,
  getMovies,
  getMoviesById,
  updateMovie,
  deleteMovie,
} = require("../controller/movieController");

const router = express.Router();

router.post("/", createMovie);
router.get("/", getMovies);
router.get("/:id", getMoviesById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
