const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//GET ALL CUSTOMERS
router.get("/", async (req, res) => {
  //get all customers and sort by name
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

//POST
router.post("/", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //create new customer object
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  //save change to database
  await customer.save();

  res.send(customer);
});

//PUT
router.put("/:id", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find customer by ID and update database
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  //send error if ID does not exist
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

//DELETE
router.delete("/:id", async (req, res) => {
  //find customer by ID and remove item
  const customer = await Customer.findByIdAndRemove(req.params.id);

  //send error if ID does not exist
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

//GET SINGLE CUSTOMER
router.get("/:id", async (req, res) => {
  //find customer by ID and get the customer details
  const customer = await Customer.findById(req.params.id);

  //send error if ID does not exist
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

module.exports = router;
