const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//GET ALL USERS
router.get("/", async (req, res) => {
  //get all users and sort by name
  const users = await User.find().sort("name");
  res.send(users);
});

//POST
router.post("/", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //create new user object
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  //save change to database
  await user.save();

  res.send(user);
});

//PUT
router.put("/:id", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find user by ID and update database
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  //send error if ID does not exist
  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

//DELETE
router.delete("/:id", async (req, res) => {
  //find user by ID and remove item
  const user = await User.findByIdAndRemove(req.params.id);

  //send error if ID does not exist
  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

//GET SINGLE USER
router.get("/:id", async (req, res) => {
  //find user by ID and get the user details
  const user = await User.findById(req.params.id);

  //send error if ID does not exist
  if (!user)
    return res.status(404).send("The user with the given ID was not found");

  res.send(user);
});

module.exports = router;
