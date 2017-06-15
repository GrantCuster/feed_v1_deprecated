"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _utilsGeneral = require("../utils/utils-general.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/grantcuster/Sites/feed-holder/feed/components/feed_post.js";

exports.default = function (_ref) {
	var post = _ref.post,
	    layout = _ref.layout;

	var date_slug = (0, _utilsGeneral.slugDate)(post.posted);
	return _react2.default.createElement("div", { className: "feed-post post-" + post.type + " mb4", key: post.posted, __source: {
			fileName: _jsxFileName,
			lineNumber: 8
		}
	}, _react2.default.createElement("div", { className: "mb2 px2", __source: {
			fileName: _jsxFileName,
			lineNumber: 9
		}
	}, layout === "post" ? _react2.default.createElement(_link2.default, {
		href: "/feed_post_page?date_slug=" + date_slug,
		as: "/post/" + date_slug,
		__source: {
			fileName: _jsxFileName,
			lineNumber: 11
		}
	}, _react2.default.createElement("a", { className: "no-underline hover-underline", __source: {
			fileName: _jsxFileName,
			lineNumber: 15
		}
	}, new Date(post.posted).toLocaleString())) : new Date(post.posted).toLocaleString()), _react2.default.createElement("img", {
		style: {
			maxHeight: layout === "post" ? "calc(80vh)" : "none",
			maxWidth: layout === "post" ? "calc(100vw - 1rem)" : "100%"
		},
		src: "" + post.img,
		title: post.text,
		alt: post.text,
		__source: {
			fileName: _jsxFileName,
			lineNumber: 23
		}
	}), post.src ? _react2.default.createElement("div", { className: "mt2 px2", __source: {
			fileName: _jsxFileName,
			lineNumber: 33
		}
	}, _react2.default.createElement("a", { href: post.src, __source: {
			fileName: _jsxFileName,
			lineNumber: 34
		}
	}, post.src)) : null);
};