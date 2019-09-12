const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const express = require("express");
const app = express();

//connect to database
mongoose
  .connect("mongodb://localhost/movie-rental", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB"));

//set templating engine & directory
app.set("view engine", "pug");
app.set("views", "./views");
//parse req body
app.use(express.urlencoded({ extended: true }));
//serve static files & set directory
app.use(express.static("public"));

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.render("index", { title: "Movie Rental App", message: "Hello World" });
});
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
