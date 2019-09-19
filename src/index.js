const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
var connect = require("connect");
var sassMiddleware = require("node-sass-middleware");
var path = require("path");
const home = require("./routes/home");
const movies = require("./routes/api-movies");
// const genres = require("./routes/genres");
// const customers = require("./routes/customers");
// const movies = require("./routes/movies");
// const rentals = require("./routes/rentals");
// const users = require("./routes/users");
// const auth = require("./routes/auth");

//check if json token is set
// if (!config.get("jwtPrivateKey")) {
//   console.error("FATAL ERROR: jwtPrivateKey is not defined");
//   process.exit(1);
// }

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
//set stye
// app
//   .use(
//     "/css",
//     sassMiddleware({
//       src: __dirname + "/public/sass", //where the sass files are
//       dest: __dirname + "/public/styles", //where css should go
//       debug: true,
//       force: true,
//       sourceMap: true
//     })
//   )
//   .use(function(err, req, res, next) {
//     if (err) {
//       res.statusCode = 500;
//       return res.end(err.message);
//     }

//     var destination =
//       _dirname + "/public/styles" + require("url").parse(req.url).pathname;

//     if (!fs.existsSync(destination)) {
//       res.statusCode = 404;
//       return res.end("Compilation failed: Destination file not found.");
//     }

//     res.writeHead(200, {
//       "Content-Type": "text/css",
//       "Cache-Control": "max-age=0"
//     });
//     res.end(fs.readFileSync(destination));
//   });
// parse req body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use("/", home);
app.use("/movies", movies);
// app.use("/api/genres", genres);
// app.use("/api/customers", customers);
// app.use("/api/movies", movies);
// app.use("/api/rentals", rentals);
// app.use("/api/users", users);
// app.use("/api/auth", auth);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));

//set movie_rental_jwtPrivateKey=jwtPrivateKey
