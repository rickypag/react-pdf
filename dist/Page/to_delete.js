"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _RegionSelect = _interopRequireDefault(require("../region/RegionSelect"));

var Overlay =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Overlay, _Component);

  function Overlay(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Overlay);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Overlay).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onDocumentLoadSuccess", function (_ref) {
      var numPages = _ref.numPages;

      _this.setState({
        numPages: numPages
      });
    });
    console.log("w: " + JSON.stringify(props.style));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      regions: [],
      numPages: null,
      pageNumber: 1,
      style: props.style
    };
    return _this;
  }

  (0, _createClass2["default"])(Overlay, [{
    key: "onChange",
    value: function onChange(regions) {
      this.setState({
        regions: regions
      });
    }
  }, {
    key: "render",
    value: function render() {
      var regionStyle = {
        background: 'rgba(255, 0, 0, 0)',
        'position': 'absolute',
        //'width': 1000000,
        'z-index': 1000000
      };
      var _this$state = this.state,
          pageNumber = _this$state.pageNumber,
          numPages = _this$state.numPages,
          width = _this$state.width,
          height = _this$state.height;
      return _react["default"].createElement(_RegionSelect["default"], {
        maxRegions: 1,
        regions: this.state.regions,
        regionStyle: regionStyle,
        constraint: true,
        onChange: this.onChange,
        style: {
          border: '1px solid black',
          position: 'absolute'
        }
      }, _react["default"].createElement("div", {
        style: this.state.style
      }, _react["default"].createElement("img", {
        src: "prova.jpeg"
      })));
    }
  }]);
  return Overlay;
}(_react.Component);

exports["default"] = Overlay;