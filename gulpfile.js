var gulp = require('gulp')
  , sass = require('gulp-ruby-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , minifycss = require('gulp-minify-css')
  , rename = require('gulp-rename')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , imagemin = require('gulp-imagemin')
  , pngcrush = require('imagemin-pngcrush')
  , dust = require('gulp-dust')
  , dustrender = require('gulp-dust-render')
  , livereload = require('gulp-livereload')
  , watch = require('gulp-watch');


gulp.task('process-css', function() {
  console.log('- processing css..');
  return gulp.src('public/src/css/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('public/dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/dist/css/'))
});

gulp.task('process-js', function() {
  console.log('- processing js..');
  return gulp.src('public/src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js/'))
});

gulp.task('process-img', function () {
  console.log('- processing img..');
  return gulp.src('public/src/img/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('public/dist/img/'));
});

gulp.task('dust', function () {
  console.log('- running dust..');
  return gulp.src('views/index.html')
    .pipe(dust({}))
    .pipe(gulp.dest('dist'));
});

gulp.task('dust-render', function () {
  console.log('- running dust..');
  return gulp.src('views/index.html')
    .pipe(dustrender())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    console.log('- watch task..');
    gulp.watch('public/src/js/*.js', ['process-js'])
});