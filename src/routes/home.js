const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customersController");

//GET ALL CUSTOMERS
router.get("/", customerController.getCustomers, (req, res) => {
  res.render("index");
});
//POST
router.post("/", customerController.newCustomer);

module.exports = router;
