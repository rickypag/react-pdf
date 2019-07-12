"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _reactRegionSelect = _interopRequireDefault(require("react-region-select"));

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
    _this.regionRenderer = _this.regionRenderer.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.state = {
      regions: [],
      numPages: null,
      pageNumber: 1,
      height: _this.props.height,
      width: _this.props.width
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
    key: "changeRegionData",
    value: function changeRegionData(index, event) {
      var region = this.state.regions[index];
      var color;

      switch (event.target.value) {
        case '1':
          color = 'rgba(0, 255, 0, 0.5)';
          break;

        case '2':
          color = 'rgba(0, 0, 255, 0.5)';
          break;

        case '3':
          color = 'rgba(255, 0, 0, 0.5)';
          break;

        default:
          color = 'rgba(0, 0, 0, 0.5)';
      }

      region.data.regionStyle = {
        background: color
      };
      this.onChange([].concat((0, _toConsumableArray2["default"])(this.state.regions.slice(0, index)), [(0, _objectAssign["default"])({}, region, {
        data: (0, _objectAssign["default"])({}, region.data, {
          dataType: event.target.value
        })
      })], (0, _toConsumableArray2["default"])(this.state.regions.slice(index + 1))));
    }
  }, {
    key: "regionRenderer",
    value: function regionRenderer(regionProps) {
      var _this2 = this;

      if (!regionProps.isChanging) {
        return _react["default"].createElement("div", {
          style: {
            position: 'absolute',
            right: 0,
            bottom: '-1.5em'
          }
        }, _react["default"].createElement("select", {
          onChange: function onChange(event) {
            return _this2.changeRegionData(regionProps.index, event);
          },
          value: regionProps.data.dataType
        }, _react["default"].createElement("option", {
          value: "1"
        }, "Green"), _react["default"].createElement("option", {
          value: "2"
        }, "Blue"), _react["default"].createElement("option", {
          value: "3"
        }, "Red")));
      }
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
          numPages = _this$state.numPages;
      return _react["default"].createElement(_reactRegionSelect["default"], {
        maxRegions: 1,
        regions: this.state.regions,
        regionStyle: regionStyle,
        constraint: true,
        onChange: this.onChange,
        regionRenderer: this.regionRenderer,
        style: {
          border: '1px solid black',
          'width': '500',
          position: 'absolute'
        }
      }, _react["default"].createElement("canvas", {
        style: {
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          width: "".concat(this.state.width, "px"),
          height: "".concat(this.state.height, "px")
        }
      }));
    }
  }]);
  return Overlay;
}(_react.Component);

exports["default"] = Overlay;