#!/usr/bin/env node

/**
 * vext-cli-run command line
 * @author Zou Jian <https://github.com/chsword>
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _print = _interopRequireDefault(require("../print"));

var _taskManager = _interopRequireDefault(require("../taskManager"));

const {
  createCommand
} = require('commander');

const program = createCommand();
program.on('--help', () => {
  _print.default.log("");

  _print.default.cyan("Command list:");

  _print.default.note("version");

  _print.default.keyword("major-up\t Increment the major version");

  _print.default.keyword("minor-up\t Increment the minor version");

  _print.default.keyword("patch-up\t Increment the patch version");

  _print.default.note("build");

  _print.default.keyword("clean\t\t Clean all build files");

  _print.default.keyword("clean:es\t Clean es build files");

  _print.default.keyword("clean:lib\t Clean lib build files");

  _print.default.keyword("build\t\t Build es / lib");

  _print.default.keyword("build:es\t Build to es");

  _print.default.keyword("build:lib\t Build to lib");

  _print.default.log("");
});
program.parse(process.argv);
const task = program.args[0];

if (!task) {
  program.help();
} else if (task === 'server') {
  // const port = process.env.npm_package_config_port || 8000;
  // console.log(`Listening at http://localhost:${port}`);
  // const app = require('../server/')();
  // app.listen(port);
  _print.default.warn("current parameter not support yet");

  _print.default.log();
} else {
  _print.default.keyword(`vext-cli run ${task}`);

  require('../gulpfile');

  _taskManager.default.runTask(task);
}