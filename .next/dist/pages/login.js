"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var url = _ref.url;

	return _react2.default.createElement("div", null, _react2.default.createElement(_nav2.default, { url: url }), _react2.default.createElement("div", { className: "center mb3" }, _react2.default.createElement("h1", null, "Login")), _react2.default.createElement("div", null, _react2.default.createElement(_link2.default, { href: "/login/twitter" }, _react2.default.createElement("a", null, "Login with Twitter"))));
};