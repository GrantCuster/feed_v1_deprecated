"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _remarkable = require("remarkable");

var _remarkable2 = _interopRequireDefault(_remarkable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markdown_text = "\nI am a designer-developer at [Fast Forward Labs](http://fastforwardlabs.com). We build prototypes and write reports on near future technologies.\n\nOn this site you'll find:\n- [Feed](/) &ndash; images of my own work in progress (on the right) and things I am inspired by (on the left).\n- [Writing](/writing) &ndash; my writing. Mostly about design and coding but hopefully some other things as well.\n- [Misc](/misc) &ndash; experimental stuff.\n\nI'm happy to talk on Twitter [@GrantCuster](http://twitter.com/GrantCuster) or email [GrantCuster@gmail.com](mailto:grantcuster@gmail.com).\n";

exports.default = function (_ref) {
	var url = _ref.url;

	var md = new _remarkable2.default();

	var markdown = md.render(markdown_text);

	return _react2.default.createElement("div", null, _react2.default.createElement(_head2.default, null, _react2.default.createElement("title", null, "Grant Custer \u2192 Info")), _react2.default.createElement(_nav2.default, { url: url }), _react2.default.createElement("div", { className: "center mb3" }, _react2.default.createElement("h1", null, "Info")), _react2.default.createElement("div", { className: "measure-max mx-auto px2", dangerouslySetInnerHTML: { __html: markdown } }));
};