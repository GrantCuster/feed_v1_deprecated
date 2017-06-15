"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _remarkable = require("remarkable");

var _remarkable2 = _interopRequireDefault(_remarkable);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markdown_text = "\nExperimental projects at varying stages of completion. Links coming soon.";

exports.default = function (_ref) {
	var url = _ref.url;

	var md = new _remarkable2.default();

	var markdown = md.render(markdown_text);

	return _react2.default.createElement("div", null, _react2.default.createElement(_head2.default, null, _react2.default.createElement("title", null, "Grant Custer \u2192 Miscellany")), _react2.default.createElement(_nav2.default, { url: url }), _react2.default.createElement("div", { className: "center mb3" }, _react2.default.createElement("h1", null, "Misc")), _react2.default.createElement("div", { className: "measure-max mx-auto px2", dangerouslySetInnerHTML: { __html: markdown } }));
};