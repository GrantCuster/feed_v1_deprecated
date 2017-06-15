"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/grantcuster/Sites/feed-holder/feed/components/nav.js";

exports.default = function (_ref) {
	var url = _ref.url;

	return _react2.default.createElement("div", { className: "flex justify-between mb2", __source: {
			fileName: _jsxFileName,
			lineNumber: 6
		}
	}, _react2.default.createElement("div", { className: "px2 bold", __source: {
			fileName: _jsxFileName,
			lineNumber: 7
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: "/", __source: {
			fileName: _jsxFileName,
			lineNumber: 8
		}
	}, _react2.default.createElement("a", { className: "no-underline py2 block", __source: {
			fileName: _jsxFileName,
			lineNumber: 9
		}
	}, "Grant Custer"))), _react2.default.createElement("div", { className: "flex px1", __source: {
			fileName: _jsxFileName,
			lineNumber: 12
		}
	}, _react2.default.createElement("div", { className: "px1", __source: {
			fileName: _jsxFileName,
			lineNumber: 13
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: "/", __source: {
			fileName: _jsxFileName,
			lineNumber: 14
		}
	}, _react2.default.createElement("a", { className: (url.pathname === "/" ? "link-active" : "") + " py2 block", __source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, "Feed"))), _react2.default.createElement("div", { className: "px1", __source: {
			fileName: _jsxFileName,
			lineNumber: 18
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: "/info", __source: {
			fileName: _jsxFileName,
			lineNumber: 19
		}
	}, _react2.default.createElement("a", { className: (url.pathname === "/info" ? "link-active" : "") + " py2 block", __source: {
			fileName: _jsxFileName,
			lineNumber: 20
		}
	}, "Info"))), _react2.default.createElement("div", { className: "px1", __source: {
			fileName: _jsxFileName,
			lineNumber: 23
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: "/writing", __source: {
			fileName: _jsxFileName,
			lineNumber: 24
		}
	}, _react2.default.createElement("a", { className: (url.pathname === "/writing" ? "link-active" : "") + " py2 block", __source: {
			fileName: _jsxFileName,
			lineNumber: 25
		}
	}, "Writing"))), _react2.default.createElement("div", { className: "px1", __source: {
			fileName: _jsxFileName,
			lineNumber: 28
		}
	}, _react2.default.createElement(_link2.default, { prefetch: true, href: "/misc", __source: {
			fileName: _jsxFileName,
			lineNumber: 29
		}
	}, _react2.default.createElement("a", { className: (url.pathname === "/misc" ? "link-active" : "") + " py2 block", __source: {
			fileName: _jsxFileName,
			lineNumber: 30
		}
	}, "Misc"))), _react2.default.createElement("div", { className: "px1", __source: {
			fileName: _jsxFileName,
			lineNumber: 33
		}
	}, _react2.default.createElement("a", { className: "py2 block", href: "http://twitter.com/grantcuster", __source: {
			fileName: _jsxFileName,
			lineNumber: 34
		}
	}, "Twitter\u2192"))));
};