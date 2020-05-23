import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { Signale } from 'signale';

var chalk = require('chalk');

var Print = /*#__PURE__*/function (_Signale) {
  _inherits(Print, _Signale);

  var _super = _createSuper(Print);

  function Print(options) {
    _classCallCheck(this, Print);

    return _super.call(this, options);
  }

  _createClass(Print, [{
    key: "custom",
    value: function custom(color) {
      for (var _len = arguments.length, text = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        text[_key - 1] = arguments[_key];
      }

      console.log(chalk[color].apply(chalk, text));
    }
  }, {
    key: "primary",
    value: function primary() {
      for (var _len2 = arguments.length, text = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        text[_key2] = arguments[_key2];
      }

      this.custom.apply(this, ["cyan"].concat(text));
    }
  }, {
    key: "cyan",
    value: function cyan() {
      for (var _len3 = arguments.length, text = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        text[_key3] = arguments[_key3];
      }

      this.custom.apply(this, ["cyan"].concat(text));
    }
  }, {
    key: "keyword",
    value: function keyword() {
      for (var _len4 = arguments.length, text = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        text[_key4] = arguments[_key4];
      }

      this.custom.apply(this, ["magenta"].concat(text));
    }
  }, {
    key: "red",
    value: function red() {
      for (var _len5 = arguments.length, text = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        text[_key5] = arguments[_key5];
      }

      this.custom.apply(this, ["red"].concat(text));
    }
  }, {
    key: "green",
    value: function green() {
      for (var _len6 = arguments.length, text = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        text[_key6] = arguments[_key6];
      }

      this.custom.apply(this, ["green"].concat(text));
    }
  }]);

  return Print;
}(Signale);

var signale = new Print();
export default signale;