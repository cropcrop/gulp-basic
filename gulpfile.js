var gulp = require('gulp')
  , sass = require('gulp-ruby-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , minifycss = require('gulp-minify-css')
  , rename = require('gulp-rename')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , imagemin = require('gulp-imagemin')
  , pngcrush = require('imagemin-pngcrush')
  , livereload = require('gulp-livereload')
  , watch = require('gulp-watch');


gulp.task('process-css', function() {
  console.log('- processing css..');
  return gulp.src('src/assets/css/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/assets/css/'))
});

gulp.task('process-js', function() {
  console.log('- processing js..');
  return gulp.src('src/assets/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/assets/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/assets/js/'))
});

gulp.task('process-img', function () {
  console.log('- processing img..');
  return gulp.src('src/assets/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('public/assets/img/'));
});

gulp.task('watch', function() {
    console.log('- watch task..');
    gulp.watch('src/assets/js/*.js', ['process-js'])
    gulp.watch('src/assets/css/*.scss', ['process-css'])
});