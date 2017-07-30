var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var pug = require("gulp-pug");
var prefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "src/"
    },
    notify: false
  });
});

gulp.task('sass', function() {
  return gulp.src("src/scss/**/*.+(scss|sass)")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src("src/img/*")
    .pipe(newer())
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest("dist/img"));
})