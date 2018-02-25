var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var concat    = require('gulp-concat');  
var rename    = require('gulp-rename');  
var uglify    = require('gulp-uglify');
var gutil     = require('gulp-util');  
var jshint    = require('gulp-jshint');

var jsFiles = 'js/*.js',  
    jsDest = 'dist/scripts';

var distPaths = {
  styles: 'css'
};

var server = {
  host: 'localhost',
  port: '8001'
}

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function() {
  gulp.watch('*.html', ['build']);
  gulp.watch('js/*.js', ['jshint','build']);
});

gulp.task('build', ['scripts']);

gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);
