const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

//set templating engine & directory
app.set("view engine", "pug");
app.set("views", "./views");
//parse req body
app.use(express.urlencoded({ extended: true }));
//serve static files & set directory
app.use(express.static("public"));

app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.render("index", { title: "Movie Rental App", message: "Hello World" });
});
app.use("/api/genres", genres);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
