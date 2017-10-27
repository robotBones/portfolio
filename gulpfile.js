const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const inject = require('gulp-inject');

const jsFiles = ['*.js', 'src/javascripts/*.js'];

gulp.task('lint', () => {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true,
    }))
    .pipe(jscs());
});

gulp.task('concat', () => {
  return gulp.src('src/javascripts/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('inject', function () {
  var target = gulp.src('./views/index.pug');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./public/javascripts/*.js'], {read: false});

  var options = {
    ignorePath: 'public'
  };

  return target.pipe(inject(sources, options))
    .pipe(gulp.dest('./views'));
    });

gulp.task('run', ['lint', 'concat', 'inject'], () => {
  var options = {
    script:'./bin/www',
    delayTime: 2,
    env: {
      PORT: 3000
    },
    ignore: ['/public'],
    ext: 'js styl pug',
    tasks: ['concat']
  }

  return nodemon(options)
    .on('restart', (e) => {
      console.log('Restarting');
    });
});
