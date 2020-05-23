"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _gulp = require("gulp");

var _versionUp = _interopRequireDefault(require("./tasks/versionUp"));

var _build = _interopRequireDefault(require("./tasks/build"));

/**
 * Gulp file to build the ant-design-vue-helper extensions for vscode
 * @author Zou Jian <https://github.com/chsword>
 */
(0, _versionUp.default)(_gulp.task);
(0, _build.default)(_gulp.task);