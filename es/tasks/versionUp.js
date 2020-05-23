#!/usr/bin/env node
// https://github.com/tumerorkun/v-up/blob/master/index.js
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import print from '../print';

var fs = require('fs');

var jsonParse = function jsonParse(str) {
  return JSON.parse(str);
};

var packageJsonFile = fs.readFileSync(process.cwd() + '/package.json', 'utf8');
var packageJSON = jsonParse(packageJsonFile);
var oldVersion = packageJSON.version;
var newVersion;

var _packageJSON$version$ = packageJSON.version.split('.').map(function (e) {
  return Number(e);
}),
    _packageJSON$version$2 = _slicedToArray(_packageJSON$version$, 3),
    _major = _packageJSON$version$2[0],
    _minor = _packageJSON$version$2[1],
    _patch = _packageJSON$version$2[2];

var VersionManager = /*#__PURE__*/function () {
  function VersionManager() {
    var _this = this;

    _classCallCheck(this, VersionManager);

    _defineProperty(this, "changeVersion", function (version) {
      newVersion = packageJSON.version = version;
      fs.writeFileSync(process.cwd() + '/package.json', JSON.stringify(packageJSON, null, 2) + '\n', 'utf8');
      print.log('');
      print.primary('Version updated');
      print.red("  old version -> ".concat(oldVersion));
      print.green("  new version -> ".concat(newVersion));
      print.log('');
    });

    _defineProperty(this, "cases", {
      patch: function patch() {
        var newVersion = "".concat(_major, ".").concat(_minor, ".").concat(_patch + 1);

        _this.changeVersion(newVersion);
      },
      minor: function minor() {
        var newVersion = "".concat(_major, ".").concat(_minor + 1, ".", 0);

        _this.changeVersion(newVersion);
      },
      major: function major() {
        var newVersion = "".concat(_major + 1, ".", 0, ".", 0);

        _this.changeVersion(newVersion);
      }
    });
  }

  _createClass(VersionManager, [{
    key: "up",
    value: function up(partName) {
      if (this.cases.hasOwnProperty(partName)) {
        this.cases[partName]();
      }
    }
  }]);

  return VersionManager;
}();

var versionManager = new VersionManager();
export default (function (task) {
  task("major-up", versionManager.cases.major);
  task("minor-up", versionManager.cases.minor);
  task("patch-up", versionManager.cases.patch);
});