/* required methods */

var gulp        = require('gulp');
    concat      = require('gulp-concat');
    rename      = require('gulp-rename');
    uglify      = require('gulp-uglify');
    jade        = require('gulp-jade');
    sass        = require('gulp-ruby-sass');
    runSequence = require('run-sequence');
    gulpif      = require('gulp-if');
    browserSync = require('browser-sync');



var outputDir   = 'builds/development';

var env         = process.env.NODE_ENV || 'development';


/* tasks */
gulp.task('js', function() {
  return gulp.src(['bower_components/modernizr.js', 'bower_components/jquery/dist/jquery.js'])
  .pipe(concat('modernizr-and-jquery.js'))
  .pipe(gulp.dest('src/js'))
  .pipe(rename('modernizr-and-jquery.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(outputDir + '/js'));
});

gulp.task('jade',function() {
  return gulp.src('src/templates/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest(outputDir));
});

gulp.task('sass', function(){
  return sass('src/sass/main.sass', {style: 'compressed'})
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(outputDir + '/css'));
});

gulp.task('sass-watch', ['sass'], browserSync.reload);

gulp.task('jade-watch', ['jade'], browserSync.reload);


gulp.task('watch', function() {

  browserSync({
    server: {
      baseDir: outputDir
    }
  });
  gulp.watch('src/templates/**/*.jade', ['jade-watch']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/sass/**/*.sass', ['sass-watch']);
});

gulp.task('default', function(callback) {
  runSequence('js', 'jade','sass','watch', callback);
});
