const auth = require("../controllers/auth");
const admin = require("../controllers/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//GET ALL GENRES
router.get("/", async (req, res) => {
  //get all genres and sort by name
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//POST
router.post("/", auth, async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //create new genre  object
  let genre = new Genre({
    name: req.body.name
  });
  //save change to database
  await genre.save();
  res.send(genre);
});

//PUT
router.put("/:id", async (req, res) => {
  //validate before querying database
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find genre by ID and update database
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  //send error if ID does not exist
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

//DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  //find genre by ID and remove the item
  const genre = await Genre.findByIdAndRemove(req.params.id);

  //send error if ID does not exist
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

//GET SINGLE GENRE
router.get("/:id", async (req, res) => {
  //find genre by ID and get the item details
  const genre = await Genre.findById(req.params.id);

  //send error if ID does not exist
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
