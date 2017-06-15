"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _nav = require("../components/nav");

var _nav2 = _interopRequireDefault(_nav);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_React$Component) {
	(0, _inherits3.default)(_class, _React$Component);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this));

		_this.state = {
			category: "work",
			local_file: false,
			alt: "",
			from: "",
			download_url: "",
			tweet: false
		};
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "handleCategoryClick",
		value: function handleCategoryClick(value) {
			this.setState({ category: value });
		}
	}, {
		key: "handleFileChange",
		value: function handleFileChange(e) {
			var reader = new FileReader();
			var file = e.target.files[0];
			if (!file) file = false;
			this.setState({ local_file: file });
		}
	}, {
		key: "handleUrlChange",
		value: function handleUrlChange(e) {
			this.setState({ download_url: e.target.value });
		}
	}, {
		key: "handleAltChange",
		value: function handleAltChange(e) {
			this.setState({ alt: e.target.value });
		}
	}, {
		key: "handleFromChange",
		value: function handleFromChange(e) {
			this.setState({ from: e.target.value });
		}
	}, {
		key: "handleTweetChange",
		value: function handleTweetChange(e) {
			var target = e.target;
			var value = target.type === "checkbox" ? target.checked : target.value;
			this.setState((0, _defineProperty3.default)({}, target.name, value));
		}
	}, {
		key: "checkText",
		value: function checkText(string) {
			if (string) {
				var checked = string.trim();
				if (checked.length === 0) checked = false;
				return checked;
			} else {
				return false;
			}
		}
	}, {
		key: "handlePost",
		value: function handlePost(e) {
			var formData = new FormData();
			console.log(this.state.tweet);
			var post_object = {
				type: this.state.category,
				text: this.checkText(this.state.alt),
				src: this.checkText(this.state.from),
				tweet: this.state.tweet
			};
			(0, _keys2.default)(post_object).forEach(function (key) {
				if (post_object[key] !== false) {
					formData.append(key, post_object[key]);
				}
			});
			if (this.state.local_file !== false) {
				formData.append("image", this.state.local_file);
			} else {
				formData.append("download_url", this.checkText(this.state.download_url));
			}
			_axios2.default.post("/api/private/post", formData).then(function (response) {
				console.log(response);
			}).catch(function (error) {
				console.log(error);
			});
			e.preventDefault();
		}
	}, {
		key: "render",
		value: function render() {
			var url = this.props.url;

			return _react2.default.createElement("div", null, _react2.default.createElement(_nav2.default, { url: url }), _react2.default.createElement("div", { className: "center mb3" }, _react2.default.createElement("h1", null, "New Post")), _react2.default.createElement("form", null, _react2.default.createElement("div", { className: "measure-max mx-auto px2" }, _react2.default.createElement("div", null, _react2.default.createElement("div", null, "category"), _react2.default.createElement("div", null, _react2.default.createElement("label", null, _react2.default.createElement("input", {
				type: "radio",
				value: "work",
				onChange: this.handleCategoryClick.bind(this, "work"),
				checked: this.state.category === "work"
			}), "work"), _react2.default.createElement("label", null, _react2.default.createElement("input", {
				type: "radio",
				value: "inspiration",
				onChange: this.handleCategoryClick.bind(this, "inspiration"),
				checked: this.state.category === "inspiration"
			}), "inspiration"))), _react2.default.createElement("div", null, _react2.default.createElement("div", null, "Image Upload Options"), _react2.default.createElement("div", { className: "p1 border" }, _react2.default.createElement("div", null, _react2.default.createElement("input", {
				type: "file",
				onChange: this.handleFileChange.bind(this)
			})), _react2.default.createElement("div", null, "URL"), _react2.default.createElement("div", null, _react2.default.createElement("input", {
				type: "text",
				onChange: this.handleUrlChange.bind(this)
			})))), _react2.default.createElement("div", null, _react2.default.createElement("div", null, "alt/title"), _react2.default.createElement("div", null, _react2.default.createElement("textarea", { onChange: this.handleAltChange.bind(this) }))), _react2.default.createElement("div", null, _react2.default.createElement("div", null, "From"), _react2.default.createElement("div", null, _react2.default.createElement("input", {
				type: "text",
				onChange: this.handleFromChange.bind(this)
			}))), _react2.default.createElement("div", null, _react2.default.createElement("label", null, _react2.default.createElement("input", {
				name: "tweet",
				type: "checkbox",
				checked: this.state.tweet,
				onChange: this.handleTweetChange.bind(this)
			}), "Tweet")), _react2.default.createElement("div", null, _react2.default.createElement("input", {
				type: "submit",
				className: "p1 block mt2",
				onClick: this.handlePost.bind(this),
				value: "Post"
			})))));
		}
	}]);

	return _class;
}(_react2.default.Component);

exports.default = _class;