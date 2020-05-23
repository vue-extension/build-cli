"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _print = _interopRequireDefault(require("../print"));

var _gulp = require("gulp");

var path = _interopRequireWildcard(require("path"));

const babel = require('gulp-babel');

const clean = require("gulp-clean");

class BuildManager {
  buildLib() {
    _print.default.log(path.resolve('./src/**/*.ts'));

    _print.default.log(path.resolve('./lib'));

    return (0, _gulp.src)(path.resolve('./src/**/*.ts')).on('error', function (err) {
      console.log('buildLib Error!', err);
      this.end();
    }).pipe(babel({
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-typescript', ['@babel/preset-env', {
        modules: 'auto',
        targets: {
          "node": "current"
        }
      }], "@babel/preset-flow"],
      plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-do-expressions', '@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
    })).pipe((0, _gulp.dest)(path.resolve('./lib')));
  }

  buildEs() {
    _print.default.log(path.resolve('./src/**/*.ts'));

    _print.default.log(path.resolve('./es'));

    return (0, _gulp.src)(path.resolve('./src/**/*.ts')).on('error', function (err) {
      console.log('buildEs Error!', err);
      this.end();
    }).pipe(babel({
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-typescript', ['@babel/preset-env', {
        modules: false,
        targets: {
          browsers: ['last 2 versions', 'IE 10']
        }
      }], "@babel/preset-flow"],
      plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-do-expressions', '@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
    })).pipe((0, _gulp.dest)(path.resolve('./es')));
  }

  cleanLib() {
    return (0, _gulp.src)(path.resolve('./lib'), {
      read: false,
      allowEmpty: true
    }).pipe(clean());
  }

  cleanEs() {
    return (0, _gulp.src)(path.resolve('./es'), {
      read: false,
      allowEmpty: true
    }).pipe(clean());
  }

}

var buildManager = new BuildManager();

var _default = task => {
  task('clean:lib', buildManager.cleanLib);
  task('clean:es', buildManager.cleanEs);
  task("clean", (0, _gulp.series)(buildManager.cleanLib, buildManager.cleanEs));
  task("build:es", buildManager.buildEs);
  task("build:lib", buildManager.buildLib);
  task("build", (0, _gulp.series)(buildManager.cleanLib, buildManager.cleanEs, buildManager.buildLib, buildManager.buildEs));
};

exports.default = _default;