var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  gulp.src('addHTML.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});
