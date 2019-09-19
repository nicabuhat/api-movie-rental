const express = require("express");
const request = require("request");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

//
// router.get("/", (req, res) => {
//   //   let query = "";
//   //   const key = "10fa404088d797470afce6fe4b1fa635";
//   //   const search = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;
//   //   request(search, (error, response, body) => {
//   //     res.send(body);
//   //   });

//   //discover https://developers.themoviedb.org/3/discover/movie-discover
//   request(
//     "https://api.themoviedb.org/3/discover/movie?api_key=10fa404088d797470afce6fe4b1fa635&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1",
//     (error, response, body) => {
//       const popularMovies = JSON.parse(body);
//       res.render("admin", { movies: popularMovies.results });
//     }
//   );
// });

router.get("/new", (req, res) => {
  res.render("movies/movie_new");
});

module.exports = router;
