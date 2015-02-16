var gulp = require('gulp');
var jsmin = require('gulp-jsmin');

gulp.task('default', function() {
  gulp.src('addHTML.js')
    .pipe(jsmin())
    .pipe(gulp.dest('build'));
});
