const { Rental, validate } = require("../models/rental");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//provide transaction capability to MongoDB
Fawn.init(mongoose);

// GET RENTALS
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

// POST
router.post("/", async (req, res) => {
  //validate with Joi
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //retrieve customer by ID and send error if customer does not exist
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  //retrieve movies by ID and send error if movie does not exist
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  //check if movie is in stock else send an error
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not available");

  //create rental object
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  //create transaction to perform clustered operation
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();
  } catch (ex) {
    res.status(500).send("Something failed");
  }

  res.send(rental);
});

module.exports = router;
