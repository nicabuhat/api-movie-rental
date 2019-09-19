const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");

exports.getCustomers = async (req, res, next) => {
  //get all customers and sort by name
  req.customers = await Customer.find().sort("name");
  next();
};

exports.newCustomer = async (req, res) => {
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
};
