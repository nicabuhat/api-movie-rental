const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
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

  //check if user is already registered
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  //create new user object
  const user = new User(_.pick(req.body, ["name", "email", "password"]));

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //save change to database
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
