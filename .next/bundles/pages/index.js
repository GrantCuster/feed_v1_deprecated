
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var slugDate = exports.slugDate = function slugDate(date_string) {
	var date = new Date(date_string);
	var slug_date = date.toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '');
	return slug_date;
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/grantcuster/Sites/feed-holder/feed/utils/utils-general.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/grantcuster/Sites/feed-holder/feed/utils/utils-general.js"); } } })();

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _from = __webpack_require__(239);

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = __webpack_require__(36);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = __webpack_require__(63);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(62);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(39);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(38);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _isomorphicUnfetch = __webpack_require__(568);

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _link = __webpack_require__(563);

var _link2 = _interopRequireDefault(_link);

var _utilsGeneral = __webpack_require__(564);

var _nav = __webpack_require__(570);

var _nav2 = _interopRequireDefault(_nav);

var _feed_post = __webpack_require__(569);

var _feed_post2 = _interopRequireDefault(_feed_post);

var _head = __webpack_require__(199);

var _head2 = _interopRequireDefault(_head);

var _index = __webpack_require__(81);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/grantcuster/Sites/feed-holder/feed/pages/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/grantcuster/Sites/feed-holder/feed/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(83)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(563);

var _link2 = _interopRequireDefault(_link);

var _utilsGeneral = __webpack_require__(564);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/grantcuster/Sites/feed-holder/feed/components/feed_post.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/grantcuster/Sites/feed-holder/feed/components/feed_post.js"); } } })();

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _link = __webpack_require__(563);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/grantcuster/Sites/feed-holder/feed/components/nav.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/grantcuster/Sites/feed-holder/feed/components/nav.js"); } } })();

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(565);


/***/ })

},[571]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3V0aWxzL3V0aWxzLWdlbmVyYWwuanM/MjVhYTZjNSIsIndlYnBhY2s6Ly8vLi9wYWdlcz8yNWFhNmM1Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvZmVlZF9wb3N0LmpzPzI1YWE2YzUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9uYXYuanM/MjVhYTZjNSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgc2x1Z0RhdGUgPSAoZGF0ZV9zdHJpbmcpID0+IHtcblx0Y29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVfc3RyaW5nKTtcblx0Y29uc3Qgc2x1Z19kYXRlID0gZGF0ZS50b0lTT1N0cmluZygpLnJlcGxhY2UoLy0vZywnJykucmVwbGFjZSgvOi9nLCcnKS5yZXBsYWNlKC9cXC4vZywnJyk7XG5cdHJldHVybiBzbHVnX2RhdGU7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdXRpbHMvdXRpbHMtZ2VuZXJhbC5qcyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBmZXRjaCBmcm9tIFwiaXNvbW9ycGhpYy11bmZldGNoXCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyBzbHVnRGF0ZSB9IGZyb20gXCIuLi91dGlscy91dGlscy1nZW5lcmFsLmpzXCI7XG5pbXBvcnQgTmF2IGZyb20gXCIuLi9jb21wb25lbnRzL25hdlwiO1xuaW1wb3J0IEZlZWRQb3N0IGZyb20gXCIuLi9jb21wb25lbnRzL2ZlZWRfcG9zdFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IFJvdXRlciBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzKHsgcmVxIH0pIHtcblx0XHRsZXQgZG9tYWluO1xuXHRcdHJlcVxuXHRcdFx0PyAoZG9tYWluID0gYGh0dHA6Ly8ke3JlcS5oZWFkZXJzLmhvc3R9YClcblx0XHRcdDogKGRvbWFpbiA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuXHRcdGlmIChyZXEpIHtcblx0XHRcdGNvbnNvbGUubG9nKCd0aGVyZSBpcyBhIHJlcScpO1xuXHRcdFx0Y29uc29sZS5sb2coZG9tYWluKTtcblx0XHRcdGNvbnNvbGUubG9nKHJlcS5oZWFkZXJzKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZldGNoKGAke2RvbWFpbn0vc3RhdGljL2ZlZWRfcG9zdHMuanNvbmApXG5cdFx0XHQudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRcdCAgICByZXR1cm4gcmVzLmpzb24oKTtcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oanNvbikge1xuXHRcdFx0ICAgIHJldHVybiB7IGZlZWRfcG9zdHM6IGpzb24gfTtcblx0XHRcdH0pO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0c2Nyb2xsUG9zaXRpb246IDAsXG5cdFx0XHRtYXhfcGFnZXM6IGZhbHNlXG5cdFx0fTtcblx0XHR0aGlzLmhhbmRsZUludGVydmFsID0gdGhpcy5oYW5kbGVJbnRlcnZhbC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gdGhpcy5oYW5kbGVSZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZChcblx0XHRcdHRoaXNcblx0XHQpO1xuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0Y29uc3QgSU5URVJWQUwgPSAxMDA7XG5cdFx0dGhpcy5pbnRlcnZhbElEID0gc2V0SW50ZXJ2YWwodGhpcy5oYW5kbGVJbnRlcnZhbCwgSU5URVJWQUwpO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSUQpO1xuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElEKTtcblx0XHR0aGlzLnJlcXVlc3RJRCA9IG51bGw7XG5cdFx0dGhpcy5pbnRlcnZhbElEID0gbnVsbDtcblx0fVxuXG5cdGdldFdpbmRvd1Njcm9sbFRvcCgpIHtcblx0XHRyZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG5cdH1cblxuXHRoYW5kbGVJbnRlcnZhbCgpIHtcblx0XHRjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJRCk7XG5cdFx0dGhpcy5yZXF1ZXN0SUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpO1xuXHR9XG5cblx0aGFuZGxlUmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkge1xuXHRcdGNvbnN0IHsgdXJsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHF1ZXJ5ID0gdXJsLnF1ZXJ5O1xuXHRcdGNvbnN0IHsgc2Nyb2xsUG9zaXRpb24gfSA9IHRoaXMuc3RhdGU7XG5cdFx0Y29uc3QgbmV3U2Nyb2xsUG9zaXRpb24gPSB0aGlzLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xuXHRcdGlmIChuZXdTY3JvbGxQb3NpdGlvbiAhPT0gc2Nyb2xsUG9zaXRpb24pIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBzY3JvbGxQb3NpdGlvbjogbmV3U2Nyb2xsUG9zaXRpb24gfSk7XG5cdFx0XHRsZXQgcG9zdHNfcGFnZSA9IDA7XG5cdFx0XHRpZiAocXVlcnkucGFnZSkgcG9zdHNfcGFnZSA9IHBhcnNlSW50KHF1ZXJ5LnBhZ2UpO1xuXHRcdFx0Y29uc3QgZG9jX2hlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuXHRcdFx0Y29uc3Qgc2NyZWVuX2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdGlmIChuZXdTY3JvbGxQb3NpdGlvbiA+IGRvY19oZWlnaHQgLSBzY3JlZW5faGVpZ2h0ICogNCkge1xuXHRcdFx0XHRsZXQgbmV3X3BhZ2VzID0gcG9zdHNfcGFnZSArIDE7XG5cdFx0XHRcdGlmIChuZXdfcGFnZXMgPiB0aGlzLnN0YXRlLm1heF9wYWdlcykge1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBtYXhfcGFnZXM6IG5ld19wYWdlcyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcG9zdF9wYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9zdHMtcGFnZVwiKTtcblx0XHRcdGNvbnN0IHRvcF9vZmZzZXRzID0gQXJyYXkuZnJvbShwb3N0X3BhZ2VzKVxuXHRcdFx0XHQubWFwKHBhZ2UgPT4gcGFnZS5vZmZzZXRUb3ApXG5cdFx0XHRcdC5yZXZlcnNlKCk7XG5cdFx0XHRsZXQgcG9zaXRpb25fcGFnZSA9IDA7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRvcF9vZmZzZXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBvZmZzZXQgPSB0b3Bfb2Zmc2V0c1tpXTtcblx0XHRcdFx0aWYgKG5ld1Njcm9sbFBvc2l0aW9uID4gb2Zmc2V0KSB7XG5cdFx0XHRcdFx0cG9zaXRpb25fcGFnZSA9IHRvcF9vZmZzZXRzLmxlbmd0aCAtIChpICsgMSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwb3N0c19wYWdlICE9PSBwb3NpdGlvbl9wYWdlKSB7XG5cdFx0XHRcdGlmIChwb3NpdGlvbl9wYWdlID09PSAwKSB7XG5cdFx0XHRcdFx0bGV0IG5ld19xdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5KTtcblx0XHRcdFx0XHRkZWxldGUgbmV3X3F1ZXJ5LnBhZ2U7XG5cdFx0XHRcdFx0Um91dGVyLnJlcGxhY2Uoe1xuXHRcdFx0XHRcdFx0cGF0aG5hbWU6IFwiL1wiLFxuXHRcdFx0XHRcdFx0cXVlcnk6IG5ld19xdWVyeVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxldCBuZXdfcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwgeyBwYWdlOiBwb3NpdGlvbl9wYWdlIH0pO1xuXHRcdFx0XHRcdFJvdXRlci5yZXBsYWNlKHtcblx0XHRcdFx0XHRcdHBhdGhuYW1lOiBcIi9cIixcblx0XHRcdFx0XHRcdHF1ZXJ5OiBuZXdfcXVlcnlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRpc3BsYXlQb3N0cyhwb3N0cykge1xuXHRcdGNvbnN0IHsgdXJsIH0gPSB0aGlzLnByb3BzO1xuXHRcdGNvbnN0IHF1ZXJ5ID0gdXJsLnF1ZXJ5O1xuXG5cdFx0bGV0IHBhZ2VzID0gMDtcblx0XHRpZiAodGhpcy5zdGF0ZS5tYXhfcGFnZXMgIT09IGZhbHNlKSB7XG5cdFx0XHRwYWdlcyA9IHRoaXMuc3RhdGUubWF4X3BhZ2VzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAocXVlcnkucGFnZSkgcGFnZXMgPSBwYXJzZUludChxdWVyeS5wYWdlKTtcblx0XHR9XG5cblx0XHRsZXQgdXNlX3BhZ2VzID0gcGFnZXMgKyAxO1xuXG5cdFx0bGV0IHBlcl9wYWdlID0gMjA7XG5cdFx0bGV0IHRlbXBfcGFnZV9hcnJheSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdXNlX3BhZ2VzOyBpKyspIHtcblx0XHRcdHRlbXBfcGFnZV9hcnJheS5wdXNoKHBvc3RzLnNsaWNlKGkgKiBwZXJfcGFnZSwgKGkgKyAxKSAqIHBlcl9wYWdlKSk7XG5cdFx0fVxuXHRcdGxldCBwYWdlc19vYmogPSAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7dGVtcF9wYWdlX2FycmF5Lm1hcCgocG9zdHMsIGkpID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PGRpdiBrZXk9e2BwYWdlXyR7aX1gfSBjbGFzc05hbWU9XCJwb3N0cy1wYWdlXCIgZGF0YS1wYWdlLW51bT17aX0+XG5cdFx0XHRcdFx0XHRcdHtwb3N0cy5tYXAocG9zdCA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxGZWVkUG9zdCBrZXk9e3Bvc3QucG9zdGVkfSBwb3N0PXtwb3N0fSBsYXlvdXQ9XCJwb3N0XCIgLz47XG5cdFx0XHRcdFx0XHRcdH0pfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHRcdHJldHVybiBwYWdlc19vYmo7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0Y29uc3QgeyBmZWVkX3Bvc3RzLCB1cmwgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgcXVlcnkgPSB1cmwucXVlcnk7XG5cblx0XHRsZXQgZGlzcGxheV9wb3N0cyA9IGZlZWRfcG9zdHMuc2xpY2UoMCk7XG5cdFx0aWYgKFxuXHRcdFx0cXVlcnkuZmlsdGVyICYmXG5cdFx0XHQocXVlcnkuZmlsdGVyID09PSBcIndvcmtcIiB8fCBxdWVyeS5maWx0ZXIgPT09IFwiaW5zcGlyYXRpb25cIilcblx0XHQpIHtcblx0XHRcdGRpc3BsYXlfcG9zdHMgPSBkaXNwbGF5X3Bvc3RzLmZpbHRlcihwID0+IHAudHlwZSA9PT0gcXVlcnkuZmlsdGVyKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PEhlYWQ+XG5cdFx0XHRcdFx0PHRpdGxlPkdyYW50IEN1c3RlciDihpIgRmVlZDwvdGl0bGU+XG5cdFx0XHRcdDwvSGVhZD5cblxuXHRcdFx0XHQ8TmF2IHVybD17dXJsfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNlbnRlciBtYjNcIj5cblx0XHRcdFx0XHQ8aDE+XG5cdFx0XHRcdFx0XHQ8TGluayBocmVmPVwiL1wiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJuby11bmRlcmxpbmVcIj5GZWVkPC9hPlxuXHRcdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHRcdDwvaDE+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHB4MiBtYjRcIj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0e3F1ZXJ5LmZpbHRlciAmJiBxdWVyeS5maWx0ZXIgPT09IFwid29ya1wiXG5cdFx0XHRcdFx0XHRcdD8gPExpbmsgaHJlZj1cIi9cIj48YT5TaG93IEluc3BpcmF0aW9uPC9hPjwvTGluaz5cblx0XHRcdFx0XHRcdFx0OiBxdWVyeS5maWx0ZXIgJiYgcXVlcnkuZmlsdGVyID09PSBcImluc3BpcmF0aW9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdD8gXCLihpMgRmlsdGVyOiBJbnNwaXJhdGlvblwiXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IDxMaW5rXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aHJlZj1cIi8/ZmlsdGVyPWluc3BpcmF0aW9uXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZT1cIlNob3cgaW5zcGlyYXRpb24gb25seVwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJuby11bmRlcmxpbmUgaG92ZXItdW5kZXJsaW5lXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHTihpMgSW5zcGlyYXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvTGluaz59XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHtxdWVyeS5maWx0ZXIgJiYgcXVlcnkuZmlsdGVyID09PSBcImluc3BpcmF0aW9uXCJcblx0XHRcdFx0XHRcdFx0PyA8TGluayBocmVmPVwiL1wiPjxhPlNob3cgV29yazwvYT48L0xpbms+XG5cdFx0XHRcdFx0XHRcdDogcXVlcnkuZmlsdGVyICYmIHF1ZXJ5LmZpbHRlciA9PT0gXCJ3b3JrXCJcblx0XHRcdFx0XHRcdFx0XHRcdD8gXCJGaWx0ZXI6IFdvcmsg4oaTXCJcblx0XHRcdFx0XHRcdFx0XHRcdDogPExpbmsgaHJlZj1cIi8/ZmlsdGVyPXdvcmtcIiB0aXRsZT1cIlNob3cgd29yayBvbmx5XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwibm8tdW5kZXJsaW5lIGhvdmVyLXVuZGVybGluZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0V29yayDihpNcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvTGluaz59XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHt0aGlzLmRpc3BsYXlQb3N0cyhkaXNwbGF5X3Bvc3RzKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHNsdWdEYXRlIH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxzLWdlbmVyYWwuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKHsgcG9zdCwgbGF5b3V0IH0pID0+IHtcblx0Y29uc3QgZGF0ZV9zbHVnID0gc2x1Z0RhdGUocG9zdC5wb3N0ZWQpO1xuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPXtgZmVlZC1wb3N0IHBvc3QtJHtwb3N0LnR5cGV9IG1iNGB9IGtleT17cG9zdC5wb3N0ZWR9PlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYjIgcHgyXCI+XG5cdFx0XHRcdHtsYXlvdXQgPT09IFwicG9zdFwiID8gKFxuXHRcdFx0XHRcdDxMaW5rXG5cdFx0XHRcdFx0XHRocmVmPXtgL2ZlZWRfcG9zdF9wYWdlP2RhdGVfc2x1Zz0ke2RhdGVfc2x1Z31gfVxuXHRcdFx0XHRcdFx0YXM9e2AvcG9zdC8ke2RhdGVfc2x1Z31gfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cIm5vLXVuZGVybGluZSBob3Zlci11bmRlcmxpbmVcIj5cblx0XHRcdFx0XHRcdFx0e25ldyBEYXRlKHBvc3QucG9zdGVkKS50b0xvY2FsZVN0cmluZygpfVxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdDwvTGluaz5cblx0XHRcdFx0KSA6IChcblx0XHRcdFx0XHRuZXcgRGF0ZShwb3N0LnBvc3RlZCkudG9Mb2NhbGVTdHJpbmcoKVxuXHRcdFx0XHQpfVxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8aW1nXG5cdFx0XHRcdHN0eWxlPXt7XG5cdFx0XHRcdFx0bWF4SGVpZ2h0OiAobGF5b3V0ID09PSBcInBvc3RcIiA/IFwiY2FsYyg4MHZoKVwiIDogXCJub25lXCIpLFxuXHRcdFx0XHRcdG1heFdpZHRoOiAobGF5b3V0ID09PSBcInBvc3RcIiA/IFwiY2FsYygxMDB2dyAtIDFyZW0pXCIgOiBcIjEwMCVcIilcblx0XHRcdFx0fX1cblx0XHRcdFx0c3JjPXtgJHtwb3N0LmltZ31gfVxuXHRcdFx0XHR0aXRsZT17cG9zdC50ZXh0fVxuXHRcdFx0XHRhbHQ9e3Bvc3QudGV4dH1cblx0XHRcdC8+XG5cdFx0XHR7cG9zdC5zcmNcblx0XHRcdFx0PyA8ZGl2IGNsYXNzTmFtZT1cIm10MiBweDJcIj5cblx0XHRcdFx0XHRcdDxhIGhyZWY9e3Bvc3Quc3JjfT57cG9zdC5zcmN9PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ6IG51bGx9XG5cdFx0PC9kaXY+XG5cdCk7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9mZWVkX3Bvc3QuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IHVybCB9KSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBtYjJcIj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicHgyIGJvbGRcIj5cblx0XHRcdFx0PExpbmsgcHJlZmV0Y2ggaHJlZj1cIi9cIj5cblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJuby11bmRlcmxpbmUgcHkyIGJsb2NrXCI+R3JhbnQgQ3VzdGVyPC9hPlxuXHRcdFx0XHQ8L0xpbms+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBweDFcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJweDFcIj5cblx0XHRcdFx0XHQ8TGluayBwcmVmZXRjaCBocmVmPVwiL1wiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtgJHt1cmwucGF0aG5hbWUgPT09IFwiL1wiID8gXCJsaW5rLWFjdGl2ZVwiIDogXCJcIn0gcHkyIGJsb2NrYH0+RmVlZDwvYT5cblx0XHRcdFx0XHQ8L0xpbms+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInB4MVwiPlxuXHRcdFx0XHRcdDxMaW5rIHByZWZldGNoIGhyZWY9XCIvaW5mb1wiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPXtgJHt1cmwucGF0aG5hbWUgPT09IFwiL2luZm9cIiA/IFwibGluay1hY3RpdmVcIiA6IFwiXCJ9IHB5MiBibG9ja2B9PkluZm88L2E+XG5cdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJweDFcIj5cblx0XHRcdFx0XHQ8TGluayBwcmVmZXRjaCBocmVmPVwiL3dyaXRpbmdcIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT17YCR7dXJsLnBhdGhuYW1lID09PSBcIi93cml0aW5nXCIgPyBcImxpbmstYWN0aXZlXCIgOiBcIlwifSBweTIgYmxvY2tgfT5Xcml0aW5nPC9hPlxuXHRcdFx0XHRcdDwvTGluaz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicHgxXCI+XG5cdFx0XHRcdFx0PExpbmsgcHJlZmV0Y2ggaHJlZj1cIi9taXNjXCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9e2Ake3VybC5wYXRobmFtZSA9PT0gXCIvbWlzY1wiID8gXCJsaW5rLWFjdGl2ZVwiIDogXCJcIn0gcHkyIGJsb2NrYH0+TWlzYzwvYT5cblx0XHRcdFx0XHQ8L0xpbms+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInB4MVwiPlxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cInB5MiBibG9ja1wiIGhyZWY9XCJodHRwOi8vdHdpdHRlci5jb20vZ3JhbnRjdXN0ZXJcIj5Ud2l0dGVy4oaSPC9hPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbmF2LmpzIl0sIm1hcHBpbmdzIjoiO0E7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFKQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUVBO0FBRkE7QUFJQTtBQUpBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBT0E7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBRUE7QUFIQTtBQUdBO0FBQ0E7QUFHQTs7Ozs7QUFHQTtBQUFBO0FBQ0E7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFBQTs7OztBQUlBO0FBQUE7QUFDQTs7OztBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFIQTtBQUpBO0FBUUE7QUFDQTtBQUVBO0FBRUE7QUFIQTtBQUlBO0FBQ0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUlBO0FBR0E7QUFDQTs7OztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBQUE7O0FBRkE7QUFJQTtBQUpBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFLQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFNQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7Ozs7QUEzTEE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFFQTtBQUNBOzs7OztBQURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUFBOztBQUZBO0FBSUE7QUFKQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7O0FBU0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBOztBQVBBO0FBU0E7QUFUQTtBQUNBO0FBU0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQTdCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBOzs7QUFFQTtBQUNBOzs7Ozs7O0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQW5DQTtBQUNBOzs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        