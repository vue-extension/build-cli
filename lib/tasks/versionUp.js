#!/usr/bin/env node
// https://github.com/tumerorkun/v-up/blob/master/index.js
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _print = _interopRequireDefault(require("../print"));

const fs = require('fs');

const jsonParse = str => JSON.parse(str);

const packageJsonFile = fs.readFileSync(process.cwd() + '/package.json', 'utf8');
const packageJSON = jsonParse(packageJsonFile);
const oldVersion = packageJSON.version;
let newVersion;
const [major, minor, patch] = packageJSON.version.split('.').map(e => Number(e));

class VersionManager {
  constructor() {
    (0, _defineProperty2.default)(this, "changeVersion", version => {
      newVersion = packageJSON.version = version;
      fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(packageJSON, null, 2) + '\n', 'utf8');

      _print.default.log('');

      _print.default.primary('Version updated');

      _print.default.red(`  old version -> ${oldVersion}`);

      _print.default.green(`  new version -> ${newVersion}`);

      _print.default.log('');
    });
    (0, _defineProperty2.default)(this, "cases", {
      patch: () => {
        const newVersion = `${major}.${minor}.${patch + 1}`;
        this.changeVersion(newVersion);
      },
      minor: () => {
        const newVersion = `${major}.${minor + 1}.${0}`;
        this.changeVersion(newVersion);
      },
      major: () => {
        const newVersion = `${major + 1}.${0}.${0}`;
        this.changeVersion(newVersion);
      }
    });
  }

  up(partName) {
    if (this.cases.hasOwnProperty(partName)) {
      this.cases[partName]();
    }
  }

}

const versionManager = new VersionManager();

var _default = task => {
  task("major-up", versionManager.cases.major);
  task("minor-up", versionManager.cases.minor);
  task("patch-up", versionManager.cases.patch);
};

exports.default = _default;