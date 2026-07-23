const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMoviesById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid movie ID",
      });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    res.status(200).json({
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }

    res.status(200).json({
      message: "movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const movie = await Movie.findByIdAndUpdate(id, data);
    if (!movie) {
      return res.status(404).json({
        message: "movie not found",
      });
    }
    res.status(200).json({
      message: "movie updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// bulk exports - multiple function
module.exports = {
  createMovie,
  getMovies,
  getMoviesById,
  deleteMovie,
  updateMovie,
};
