"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var url = _ref.url;

	return _react2.default.createElement("div", { className: "flex justify-between mb2" }, _react2.default.createElement("div", { className: "px2 bold" }, _react2.default.createElement(_link2.default, { prefetch: true, href: "/" }, _react2.default.createElement("a", { className: "no-underline py2 block" }, "Grant Custer"))), _react2.default.createElement("div", { className: "flex px1" }, _react2.default.createElement("div", { className: "px1" }, _react2.default.createElement(_link2.default, { prefetch: true, href: "/" }, _react2.default.createElement("a", { className: (url.pathname === "/" ? "link-active" : "") + " py2 block" }, "Feed"))), _react2.default.createElement("div", { className: "px1" }, _react2.default.createElement(_link2.default, { prefetch: true, href: "/info" }, _react2.default.createElement("a", { className: (url.pathname === "/info" ? "link-active" : "") + " py2 block" }, "Info"))), _react2.default.createElement("div", { className: "px1" }, _react2.default.createElement(_link2.default, { prefetch: true, href: "/writing" }, _react2.default.createElement("a", { className: (url.pathname === "/writing" ? "link-active" : "") + " py2 block" }, "Writing"))), _react2.default.createElement("div", { className: "px1" }, _react2.default.createElement(_link2.default, { prefetch: true, href: "/misc" }, _react2.default.createElement("a", { className: (url.pathname === "/misc" ? "link-active" : "") + " py2 block" }, "Misc"))), _react2.default.createElement("div", { className: "px1" }, _react2.default.createElement("a", { className: "py2 block", href: "http://twitter.com/grantcuster" }, "Twitter\u2192"))));
};