"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _utilsGeneral = require("../utils/utils-general");

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _feed_post = require("../components/feed_post");

var _feed_post2 = _interopRequireDefault(_feed_post);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
	(0, _inherits3.default)(_class, _React$Component);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    url = _props.url,
			    post = _props.post,
			    layout = _props.layout;

			return _react2.default.createElement("div", null, _react2.default.createElement(_head2.default, null, _react2.default.createElement("title", null, "Grant Custer \u2192 Post")), _react2.default.createElement(_nav2.default, { url: url }), _react2.default.createElement("div", { className: "center mb3" }, _react2.default.createElement("h1", null, "Post")), _react2.default.createElement("div", { className: "flex justify-between px2 mb4" }, _react2.default.createElement("div", null, post.type === "inspiration" ? "↓ Inspiration" : null), _react2.default.createElement("div", null, post.type === "work" ? "Work ↓" : null)), _react2.default.createElement(_feed_post2.default, { post: post, layout: "page" }), _react2.default.createElement("div", { className: "center px2 mb4" }, _react2.default.createElement(_link2.default, { href: "/" }, _react2.default.createElement("a", null, "Go to Feed"))));
		}
	}], [{
		key: "getInitialProps",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
				var req = _ref.req,
				    query = _ref.query;
				var domain, res, feed_posts, date_slug, post_dates, post_index, post;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								console.log(query);
								domain = void 0;

								req ? domain = "http://" + req.headers.host : domain = window.location.origin;
								_context.next = 5;
								return (0, _isomorphicUnfetch2.default)(domain + "/static/feed_posts.json");

							case 5:
								res = _context.sent;
								_context.next = 8;
								return res.json();

							case 8:
								feed_posts = _context.sent;
								date_slug = query.date_slug;
								post_dates = feed_posts.map(function (p) {
									return (0, _utilsGeneral.slugDate)(p.posted);
								});
								post_index = post_dates.indexOf(date_slug);
								post = feed_posts[post_index];
								return _context.abrupt("return", { post: post });

							case 14:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getInitialProps(_x) {
				return _ref2.apply(this, arguments);
			}

			return getInitialProps;
		}()
	}]);

	return _class;
}(_react2.default.Component);

exports.default = _class;