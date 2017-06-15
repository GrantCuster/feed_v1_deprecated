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

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _remarkable = require("remarkable");

var _remarkable2 = _interopRequireDefault(_remarkable);

var _head = require("next/dist/lib/head.js");

var _head2 = _interopRequireDefault(_head);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

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
			    files = _props.files;

			var md = new _remarkable2.default();

			return _react2.default.createElement("div", null, _react2.default.createElement(_head2.default, null, _react2.default.createElement("title", null, "Grant Custer \u2192 Writing")), _react2.default.createElement(_nav2.default, { url: url }), _react2.default.createElement("div", { className: "center mb3" }, _react2.default.createElement("h1", null, "Writing")), _react2.default.createElement("div", { className: "measure-max mx-auto px2" }, "Coming soon."), files.map(function (f) {
				_react2.default.createElement("div", { className: "measure-max mx-auto px2 mb4", key: f.meta.filename }, _react2.default.createElement("div", { className: "sans-serif" }, new Date(f.meta.date).toLocaleString()), _react2.default.createElement("div", { className: "" }, _react2.default.createElement("h2", null, _react2.default.createElement(_link2.default, { href: "/writing_page?file_slug=" + f.meta.filename.slice(0, -3), as: "/writing/" + f.meta.filename.slice(0, -3) }, _react2.default.createElement("a", null, f.meta.title)))), _react2.default.createElement("div", { className: "" }, f.content.replace(/\n\n/g, " ¶ ").replace(" ¶ ", ""), " "));
			}));
		}
	}], [{
		key: "getInitialProps",
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
				var req = _ref.req,
				    query = _ref.query;
				var domain, res, files;
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								domain = void 0;

								req ? domain = "http://" + req.headers.host : domain = window.location.origin;
								_context.next = 4;
								return (0, _isomorphicUnfetch2.default)(domain + "/api/list_writings");

							case 4:
								res = _context.sent;
								_context.next = 7;
								return res.json();

							case 7:
								files = _context.sent;
								return _context.abrupt("return", { files: files });

							case 9:
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