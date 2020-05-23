import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import print from '../print';
import { series, src, dest } from "gulp";

var babel = require('gulp-babel');

import * as path from 'path';

var clean = require("gulp-clean");

var BuildManager = /*#__PURE__*/function () {
  function BuildManager() {
    _classCallCheck(this, BuildManager);
  }

  _createClass(BuildManager, [{
    key: "buildLib",
    value: function buildLib() {
      print.log(path.resolve('./src/**/*.ts'));
      print.log(path.resolve('./lib'));
      return src(path.resolve('./src/**/*.ts')).pipe(babel({
        babelrc: false,
        configFile: false,
        presets: ['@babel/preset-typescript', ['@babel/preset-env', {
          modules: 'auto',
          targets: {
            "node": "current"
          }
        }], "@babel/preset-flow"],
        plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-do-expressions', '@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
      })).pipe(dest(path.resolve('./lib')));
    }
  }, {
    key: "buildEs",
    value: function buildEs() {
      print.log(path.resolve('./src/**/*.ts'));
      print.log(path.resolve('./es'));
      return src(path.resolve('./src/**/*.ts')).pipe(babel({
        babelrc: false,
        configFile: false,
        presets: ['@babel/preset-typescript', ['@babel/preset-env', {
          modules: false,
          targets: {
            browsers: ['last 2 versions', 'IE 10']
          }
        }], "@babel/preset-flow"],
        plugins: ['@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-do-expressions', '@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
      })).pipe(dest(path.resolve('./es')));
    }
  }, {
    key: "cleanLib",
    value: function cleanLib() {
      return src(path.resolve('./lib'), {
        read: false,
        allowEmpty: true
      }).pipe(clean());
    }
  }, {
    key: "cleanEs",
    value: function cleanEs() {
      return src(path.resolve('./es'), {
        read: false,
        allowEmpty: true
      }).pipe(clean());
    }
  }]);

  return BuildManager;
}();

var buildManager = new BuildManager();
export default (function (task) {
  task('clean:lib', buildManager.cleanLib);
  task('clean:es', buildManager.cleanEs);
  task("clean", series(buildManager.cleanLib, buildManager.cleanEs));
  task("build:es", buildManager.buildEs);
  task("build:lib", buildManager.buildLib);
  task("build", series(buildManager.cleanLib, buildManager.cleanEs, buildManager.buildLib, buildManager.buildEs));
});