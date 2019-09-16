const { src, dest, watch } = require("gulp");
const scss = require("gulp-sass");
sass.compiler = require("node-sass");

/*
 * directories
 */
let paths = {
  src: "./src/",
  scss: "./src/sass/",
  css: "./build/assets/styles/"
  // data: "./src/"
};

//compile sass
function sass() {
  return src(paths.scss + "*.scss")
    .pipe(
      scss({
        includePaths: [paths.scss],
        outputStyle: "compressed"
      })
    )
    .pipe(dest(paths.css));
}

//minify js
// // Gulp task to minify JavaScript files
// gulp.task("scripts", function() {
//   return (
//     gulp
//       .src("./src/**/*.js")
//       // Minify the file
//       .pipe(uglify())
//       // Output
//       .pipe(gulp.dest("./assets/scripts"))
//   );
// });

exports.default = function() {
  watch("src/sass/**/*.scss", sass);
};
