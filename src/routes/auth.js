const { User } = require("../models/user");
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//POST
router.post("/", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user is registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  //validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  res.send(true);
});

//validate req details
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
