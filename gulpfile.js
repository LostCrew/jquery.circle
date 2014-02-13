var gulp = require('gulp');
var gutil = require('gulp-util');
var coffeelint = require('gulp-coffeelint');
var coffee = require('gulp-coffee');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var header = require('gulp-header');
var clean = require('gulp-clean');
var open = require('gulp-open');
var pkg = require('./package.json');
var name = pkg.name;
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('coffee', function() {
  gulp.src('src/' + name + '.coffee')
    .pipe(coffeelint({
      indentation: 2,
      no_trailing_semicolons: true,
      no_trailing_whitespace: true
    }))
    .pipe(coffee()).on('error', gutil.log)
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('build'));
});

gulp.task('less', function() {
  gulp.src('src/' + name + '.less')
    .pipe(less())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(less({
      compress: true,
      cleancss: true
    }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  gulp.src('build', { read: false })
    .pipe(clean());
});

gulp.task("open", function(){
  gulp.src("index.html")
    .pipe(open());
});

gulp.task('watch', function () {
  gulp.watch('src/' + name + '.coffee', ['coffee'])
  gulp.watch('src/' + name + '.less', ['less']);
});

gulp.task('default', ['clean', 'coffee', 'less', 'open', 'watch'], function() {
});
