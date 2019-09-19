const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");

//GET ALL MOVIES
exports.getMovies = async (req, res, next) => {
  //get all genres and sort by name
  req.movies = await Movie.find().sort("title");
  next();
};

//POST
exports.postMovies = async (req, res, next) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if genre is valid
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  //create new movie  object
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  //save change to database
  await movie.save();
  req.movie = movie;
  next();
};

//PUT
exports.putMovie = async (req, res, next) => {
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

  req.movie = movie;
  next();
};

//DELETE
exports.deleteMovie = async (req, res, next) => {
  //find movie by ID and remove the item
  const movie = await Movie.findByIdAndRemove(req.params.id);

  //send error if ID does not exist
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  req.movie = movie;
  next();
};

//GET SINGLE MOVIE
exports.getMovie = async (req, res, next) => {
  //find movie by ID and get the item details
  const movie = await Movie.findById(req.params.id);

  //send error if ID does not exist
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  req.movie = movie;
  next();
};
