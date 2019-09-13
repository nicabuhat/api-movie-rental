const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
var path = require("path");

//connect to database
mongoose
  .connect("mongodb://localhost/movie-rental", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB"));
mongoose.set("useCreateIndex", true);

// require static assets from public folder
app.use(express.static(path.join(__dirname, "public")));
// set templating engine & directory
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// parse req body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.render("index", { title: "Movie Rental App", message: "Hello World" });
});
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
