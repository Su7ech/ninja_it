var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var cache = require("gulp-cache");
var imagemin = require("gulp-imagemin");
var pug = require("gulp-pug");
var prefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var newer = require("gulp-newer");
var runSequence = require("run-sequence");

gulp.task('sass', function() {
  return gulp.src("src/scss/**/*.+(scss|sass)")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(prefixer({
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', function() {
  return gulp.src("src/img/*")
    .pipe(newer())
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest("dist/img"));
});

gulp.task('views', function() {
  return gulp.src("src/views/!(_)*.pug")
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("src/"))
    .pipe(browserSync.stream());
});
  
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "src/"
    },
    notify: false
  });

  gulp.watch("src/scss/**/*.+(scss|sass)", ['sass']);
  gulp.watch("src/views/**/*.pug", ['views']);
  gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
  gulp.watch("src/**/*.html").on('change', browserSync.reload)
});

gulp.task('default', function(cb) {
  runSequence(['sass', 'views'], 'serve', cb);
});