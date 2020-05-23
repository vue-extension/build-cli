"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signale = require("signale");

const chalk = require('chalk');

class Print extends _signale.Signale {
  constructor(options) {
    super(options);
  }

  custom(color, ...text) {
    console.log(chalk[color](...text));
  }

  primary(...text) {
    this.custom("cyan", ...text);
  }

  cyan(...text) {
    this.custom("cyan", ...text);
  }

  keyword(...text) {
    this.custom("magenta", ...text);
  }

  red(...text) {
    this.custom("red", ...text);
  }

  green(...text) {
    this.custom("green", ...text);
  }

}

const signale = new Print();
var _default = signale;
exports.default = _default;