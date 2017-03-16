var gulp = require('gulp'),
    ngsw = require('angular2-service-worker');

gulp.task('default', ['copy:static', 'copy:sw', 'build:manifest'])
gulp.task('sw-precache', ['copy:static', 'copy:sw', 'generate-service-worker'])

gulp.task('copy:sw/dev', () => gulp
  .src([
    '../worker/dist/worker.js'
  ])
  .pipe(gulp.dest('dist')));

gulp.task('copy:static', () => gulp
  .src([
    'src/**/*.html', 'src/**/*.css', 'src/**/*.js', 'index.html'
  ])
  .pipe(gulp.dest('dist')));

gulp.task('copy:sw', () => gulp
  .src([
    'node_modules/angular2-service-worker/dist/worker.js'
  ])
  .pipe(gulp.dest('dist')));

gulp.task('build:manifest', () => ngsw
  .gulpGenManifest({
    group: [
      {
        name: 'html',
        sources: gulp.src('src/**/*.html')
      },
      {
        name: 'css',
        sources: gulp.src('src/**/*.css')
      },
      {
        name: 'js',
        sources: gulp.src('src/**/*.js')
      }
    ]
  })
  .pipe(gulp.dest('dist'))
);

gulp.task('generate-service-worker', function(callback) {
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = 'dist';

    swPrecache.write(`${rootDir}/service-worker.js`, {
      staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
      stripPrefix: rootDir
    }, callback);
});