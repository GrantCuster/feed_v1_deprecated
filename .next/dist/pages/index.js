"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _utilsGeneral = require("../utils/utils-general.js");

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _feed_post = require("../components/feed_post");

var _feed_post2 = _interopRequireDefault(_feed_post);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

var _index = require("next/dist/lib/router/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/grantcuster/Sites/feed-holder/feed/pages/index.js?entry";


var _class = function (_React$Component) {
	(0, _inherits3.default)(_class, _React$Component);

	(0, _createClass3.default)(_class, null, [{
		key: "getInitialProps",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
				var req = _ref.req;
				var domain;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								domain = void 0;

								req ? domain = "http://" + req.headers.host : domain = window.location.origin;
								if (req) {
									console.log('there is a req');
									console.log(domain);
									console.log(req.headers);
								}
								return _context.abrupt("return", (0, _isomorphicUnfetch2.default)(domain + "/static/feed_posts.json").then(function (res) {
									return res.json();
								}).then(function (json) {
									return { feed_posts: json };
								}));

							case 4:
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

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));

		_this.state = {
			scrollPosition: 0,
			max_pages: false
		};
		_this.handleInterval = _this.handleInterval.bind(_this);
		_this.handleRequestAnimationFrame = _this.handleRequestAnimationFrame.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var INTERVAL = 100;
			this.intervalID = setInterval(this.handleInterval, INTERVAL);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			clearInterval(this.intervalID);
			cancelAnimationFrame(this.requestID);
			this.requestID = null;
			this.intervalID = null;
		}
	}, {
		key: "getWindowScrollTop",
		value: function getWindowScrollTop() {
			return window.pageYOffset || document.documentElement.scrollTop;
		}
	}, {
		key: "handleInterval",
		value: function handleInterval() {
			cancelAnimationFrame(this.requestID);
			this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
		}
	}, {
		key: "handleRequestAnimationFrame",
		value: function handleRequestAnimationFrame() {
			var url = this.props.url;

			var query = url.query;
			var scrollPosition = this.state.scrollPosition;

			var newScrollPosition = this.getWindowScrollTop();
			if (newScrollPosition !== scrollPosition) {
				this.setState({ scrollPosition: newScrollPosition });
				var posts_page = 0;
				if (query.page) posts_page = parseInt(query.page);
				var doc_height = document.body.clientHeight;
				var screen_height = window.innerHeight;
				if (newScrollPosition > doc_height - screen_height * 4) {
					var new_pages = posts_page + 1;
					if (new_pages > this.state.max_pages) {
						this.setState({ max_pages: new_pages });
					}
				}
				var post_pages = document.querySelectorAll(".posts-page");
				var top_offsets = (0, _from2.default)(post_pages).map(function (page) {
					return page.offsetTop;
				}).reverse();
				var position_page = 0;
				for (var i = 0; i < top_offsets.length; i++) {
					var offset = top_offsets[i];
					if (newScrollPosition > offset) {
						position_page = top_offsets.length - (i + 1);
						break;
					}
				}
				if (posts_page !== position_page) {
					if (position_page === 0) {
						var new_query = (0, _assign2.default)({}, query);
						delete new_query.page;
						_index2.default.replace({
							pathname: "/",
							query: new_query
						});
					} else {
						var _new_query = (0, _assign2.default)({}, query, { page: position_page });
						_index2.default.replace({
							pathname: "/",
							query: _new_query
						});
					}
				}
			}
		}
	}, {
		key: "displayPosts",
		value: function displayPosts(posts) {
			var url = this.props.url;

			var query = url.query;

			var pages = 0;
			if (this.state.max_pages !== false) {
				pages = this.state.max_pages;
			} else {
				if (query.page) pages = parseInt(query.page);
			}

			var use_pages = pages + 1;

			var per_page = 20;
			var temp_page_array = [];
			for (var i = 0; i < use_pages; i++) {
				temp_page_array.push(posts.slice(i * per_page, (i + 1) * per_page));
			}
			var pages_obj = _react2.default.createElement("div", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 129
				}
			}, temp_page_array.map(function (posts, i) {
				return _react2.default.createElement("div", { key: "page_" + i, className: "posts-page", "data-page-num": i, __source: {
						fileName: _jsxFileName,
						lineNumber: 132
					}
				}, posts.map(function (post) {
					return _react2.default.createElement(_feed_post2.default, { key: post.posted, post: post, layout: "post", __source: {
							fileName: _jsxFileName,
							lineNumber: 134
						}
					});
				}));
			}));
			return pages_obj;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    feed_posts = _props.feed_posts,
			    url = _props.url;

			var query = url.query;

			var display_posts = feed_posts.slice(0);
			if (query.filter && (query.filter === "work" || query.filter === "inspiration")) {
				display_posts = display_posts.filter(function (p) {
					return p.type === query.filter;
				});
			}

			return _react2.default.createElement("div", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 157
				}
			}, _react2.default.createElement(_head2.default, {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 158
				}
			}, _react2.default.createElement("title", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 159
				}
			}, "Grant Custer \u2192 Feed")), _react2.default.createElement(_nav2.default, { url: url, __source: {
					fileName: _jsxFileName,
					lineNumber: 162
				}
			}), _react2.default.createElement("div", { className: "center mb3", __source: {
					fileName: _jsxFileName,
					lineNumber: 163
				}
			}, _react2.default.createElement("h1", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 164
				}
			}, _react2.default.createElement(_link2.default, { href: "/", __source: {
					fileName: _jsxFileName,
					lineNumber: 165
				}
			}, _react2.default.createElement("a", { className: "no-underline", __source: {
					fileName: _jsxFileName,
					lineNumber: 166
				}
			}, "Feed")))), _react2.default.createElement("div", { className: "flex justify-between px2 mb4", __source: {
					fileName: _jsxFileName,
					lineNumber: 170
				}
			}, _react2.default.createElement("div", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 171
				}
			}, query.filter && query.filter === "work" ? _react2.default.createElement(_link2.default, { href: "/", __source: {
					fileName: _jsxFileName,
					lineNumber: 173
				}
			}, _react2.default.createElement("a", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 173
				}
			}, "Show Inspiration")) : query.filter && query.filter === "inspiration" ? "↓ Filter: Inspiration" : _react2.default.createElement(_link2.default, {
				href: "/?filter=inspiration",
				title: "Show inspiration only",
				__source: {
					fileName: _jsxFileName,
					lineNumber: 176
				}
			}, _react2.default.createElement("a", { className: "no-underline hover-underline", __source: {
					fileName: _jsxFileName,
					lineNumber: 180
				}
			}, "\u2193 Inspiration"))), _react2.default.createElement("div", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 185
				}
			}, query.filter && query.filter === "inspiration" ? _react2.default.createElement(_link2.default, { href: "/", __source: {
					fileName: _jsxFileName,
					lineNumber: 187
				}
			}, _react2.default.createElement("a", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 187
				}
			}, "Show Work")) : query.filter && query.filter === "work" ? "Filter: Work ↓" : _react2.default.createElement(_link2.default, { href: "/?filter=work", title: "Show work only", __source: {
					fileName: _jsxFileName,
					lineNumber: 190
				}
			}, _react2.default.createElement("a", { className: "no-underline hover-underline", __source: {
					fileName: _jsxFileName,
					lineNumber: 191
				}
			}, "Work \u2193")))), _react2.default.createElement("div", {
				__source: {
					fileName: _jsxFileName,
					lineNumber: 197
				}
			}, this.displayPosts(display_posts)));
		}
	}]);

	return _class;
}(_react2.default.Component);

exports.default = _class;