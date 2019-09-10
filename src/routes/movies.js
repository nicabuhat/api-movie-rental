const { Movie, validate } = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//GET ALL MOVIES
router.get("/", async (req, res) => {
  //get all genres and sort by name
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

//POST
router.post("/", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if genre is valid
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  //create new movie  object
  let movie = new Movie({
    title: req.body.name,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  //save change to database
  movie = await movie.save();
  res.send(movie);
});

//PUT
router.put("/:id", async (req, res) => {
  //validate before querying database
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if genre is valid
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  //find movie by ID and update database
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  //send error if ID does not exist
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

//DELETE
router.delete("/:id", async (req, res) => {
  //find movie by ID and remove the item
  const movie = await Movie.findByIdAndRemove(req.params.id);

  //send error if ID does not exist
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

//GET SINGLE MOVIE
router.get("/:id", async (req, res) => {
  //find movie by ID and get the item details
  const movie = await Movie.findById(req.params.id);

  //send error if ID does not exist
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
