var gulp = require('gulp'),
  gutil = require('gulp-util'),
  path = require('path'),
  rename = require('gulp-rename'),
  template = require('gulp-template'),
  fs = require('fs'),
  yargs = require('yargs').argv,
  runSequence = require('run-sequence'),
  shell = require('gulp-shell'),
  notify = require("gulp-notify"),
  NwBuilder = require('nw-builder'),
  gutil = require('gulp-util'),
  merge = require('merge-stream'),
  clean = require('gulp-clean');

var linux = !!gutil.env.linux;
var win = !!gutil.env.win;
if (!linux) {
  win = true;
}

var dir = win ? 'win64' : 'linux';

var root = './';

// ***************************************************************************
// Generator
// ***************************************************************************

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var createComponent = function(simpleComponent) {
  var component;

  if (simpleComponent) {
    component = path.join(__dirname, 'generator', 'simple-component/**/*.**');
  } else {
    component = path.join(__dirname, 'generator', 'component/**/*.**');
  }

  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var name = yargs.name,
    parentPath = yargs.parent || '',
    destPath = path.join(path.join(root, 'src/components/'), parentPath, capitalizeFirstLetter(name));

  console.log('\n\n\tCongratulations!\n' +
    '\n\tJust now you\'ve created a `' + name + '` component.' +
    '\n\tTo use the component follow a few simple steps:\n\n' +
    '\t1. To export the component add this line to the ./src/components/index.js file:\n' +
    '\x1b[35m', "\t   export { default as " + name + " } from './" + name + "/" + name + ".js';\n\n" +
    '\x1b[0m', '\t2. To import component add this line to the ./src/Main.js\n' +
    '\x1b[35m', "\t   import { " + name + " } from './components/';\n");

  return gulp.src(component)
    .pipe(template({
      name: capitalizeFirstLetter(name),
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
};

var createTemplate = function(type, folder, file) {
  var name = yargs.name,
    parentPath = yargs.parent || '',
    destPath = path.join(path.join(root, folder));

  if (type === 'action') {
    console.log('\x1b[0m', '\t3. Actions. Add this line to the ./src/actions/index.js file:\n' +
      '\x1b[35m', '\t   export { ' + name + ' } from ./' + name + '.js;\n');
  } else {
    console.log('\x1b[0m', '\t4. Reducers. Add this line to the ./src/reducers/index.js file:\n' +
      '\x1b[35m', '\t   export { ' + name + ' } from ./' + name + '.js;\n\n');
  }

  return gulp.src(path.join(__dirname, 'generator', file))
    .pipe(template({
      name: name,
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
};

gulp.task('simple-component', function() {
  createComponent(true);
});

gulp.task('component', function() {
  createComponent(false);
  createTemplate('action', 'src/actions/', 'action/*.js');
  createTemplate('reducer', 'src/reducers/', 'reducer/*.js');
});

var help = function() {
  console.log('\n\tusage: gulp [simple-component] --name <name>\n' +
    '\tusage: gulp [component] --name <name>\n');
};

// ***************************************************************************
// End generator
// ***************************************************************************

// ***************************************************************************
// Build App
// ***************************************************************************

gulp.task('buld-clean-temp', function () {
    return gulp.src(['build-temp/dist', 'build-temp/bower_components', 'dist/'], {read: false})
        .pipe(clean());
});

gulp.task('copy-config', function () {
  var config = gulp.src('config.json').pipe(gulp.dest('binary/inSRC-redux/' + dir + '/'))
  var db = gulp.src('db/**/*').pipe(gulp.dest('binary/inSRC-redux/' + dir + '/db/'))
  return merge(config, db);
});

gulp.task('build-app', function () {
    if (win) {
      var nw = new NwBuilder({
          version: '0.11.0',
          files: './build-temp/**',
          buildDir: './binary',
          platforms: ['win64']
      });
    }
     
    if (linux) {
      var nw = new NwBuilder({
          version: '0.11.0',
          files: './build-temp/**',
          buildDir: './binary',
          platforms: ['linux']
      });
    }

    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });
    
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

gulp.task('build-copy', function() {
  var dist = gulp.src(['dist/**/*']).pipe(gulp.dest('build-temp/dist/'));
  var bower = gulp.src(['bower_components/**/*']).pipe(gulp.dest('build-temp/bower_components/'));
  var db = gulp.src(['binary/inSRC-redux/' + dir + '/db/*.*']).pipe(gulp.dest('db/'));
  return merge(dist, bower, db);
});

gulp.task('build-js', shell.task([
  'webpack -p --config webpack/nw.config.js'
]));

gulp.task('build-clean', function () {
    return gulp.src(['build-temp/dist'], {read: false})
        .pipe(clean());
});

// ***************************************************************************
// End Build
// ***************************************************************************

gulp.task('nw', shell.task([
  'nw .'
]));

gulp.task('build', function() {
  runSequence('build-clean', 'build-js', 'build-copy', 'build-app', 'buld-clean-temp', 'copy-config');
});

gulp.task('default', function() {
  help();
});