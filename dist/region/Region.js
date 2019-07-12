"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _style = _interopRequireDefault(require("./style"));

var _reactContextmenu = require("react-contextmenu");

var Region =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Region, _Component);

  function Region(props) {
    (0, _classCallCheck2["default"])(this, Region);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Region).call(this, props));
  }

  (0, _createClass2["default"])(Region, [{
    key: "renderHandles",
    value: function renderHandles() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        "data-dir": "se",
        style: _style["default"].RegionHandleSE
      }), _react["default"].createElement("div", {
        "data-dir": "sw",
        style: _style["default"].RegionHandleSW
      }), _react["default"].createElement("div", {
        "data-dir": "nw",
        style: _style["default"].RegionHandleNW
      }), _react["default"].createElement("div", {
        "data-dir": "ne",
        style: _style["default"].RegionHandleNE
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var localStyle = {
        width: this.props.width + '%',
        height: this.props.height + '%',
        left: "".concat(this.props.x, "%"),
        top: "".concat(this.props.y, "%")
      };
      var dataRenderArgs = {
        data: this.props.data,
        isChanging: this.props.changing,
        index: this.props.index
      };
      return _react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
        id: "some_unique_identifier"
      }, _react["default"].createElement("div", {
        style: (0, _objectAssign["default"])({}, _style["default"].Region, localStyle, this.props.customStyle, this.props.data.regionStyle),
        onMouseDown: this.props.onCropStart,
        onTouchStart: this.props.onCropStart,
        "data-wrapper": "wrapper"
      }, this.props.handles ? this.renderHandles() : null, this.props.dataRenderer ? this.props.dataRenderer(dataRenderArgs) : null));
    }
  }]);
  return Region;
}(_react.Component);

Region.propTypes = {
  x: _propTypes.PropTypes.number.isRequired,
  y: _propTypes.PropTypes.number.isRequired,
  width: _propTypes.PropTypes.number.isRequired,
  height: _propTypes.PropTypes.number.isRequired,
  index: _propTypes.PropTypes.number.isRequired,
  onCropStart: _propTypes.PropTypes.func.isRequired,
  handles: _propTypes.PropTypes.bool,
  changing: _propTypes.PropTypes.bool,
  dataRenderer: _propTypes.PropTypes.func,
  data: _propTypes.PropTypes.object,
  customStyle: _propTypes.PropTypes.object
};
module.exports = Region;