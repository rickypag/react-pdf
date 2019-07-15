"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _style = _interopRequireDefault(require("./style"));

var _reactContextmenu = require("react-contextmenu");

//import Selection from './Selection'
var Region =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Region, _Component);

  function Region(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Region);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Region).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onDragStart", function (e, id, x, y, w, h) {
      //e.preventDefault();
      //console.log("dragging: " + x + " " + y);
      var di = new Image();
      di.src = "image/png";
      e.dataTransfer.setDragImage(di, 10, 10); // Run in firefox
      //e.dataTransfer.setData("text/plain", this.id);

      e.dataTransfer.setData("id", id);
      e.dataTransfer.setData("x", x);
      e.dataTransfer.setData("y", y);
      e.dataTransfer.setData("w", w);
      e.dataTransfer.setData("h", h);
    });
    return _this;
  }

  (0, _createClass2["default"])(Region, [{
    key: "renderHandles",
    value: function renderHandles() {
      return _react["default"].createElement("div", {
        onMouseDown: this.props.onCropStart,
        onTouchStart: this.props.onCropStart
      }, _react["default"].createElement("div", {
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
      var _this2 = this;

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
      /*console.log(this.props.pageId);
      console.log(this.props.x / 100 * this.props.imageWidth)// - this.props.imageOffset.left;
      console.log(this.props.y / 100 * this.props.imageHeight)// - this.props.imageOffset.top;
      console.log(this.props.width / 100 * this.props.imageWidth);
      console.log(this.props.height / 100 * this.props.imageHeight);*/

      var page = this.props.pageJSON;
      var startX = page.x ? page.x : 0;
      var startY = page.y ? page.y : 0;
      var x = this.props.x / 100 * this.props.imageWidth + startX; // - this.props.imageOffset.left;

      var y = this.props.y / 100 * this.props.imageHeight + startY; // - this.props.imageOffset.top;

      var w = this.props.width / 100 * this.props.imageWidth;
      var h = this.props.height / 100 * this.props.imageHeight;
      console.log(x);
      console.log(y);
      console.log(page.pageid);
      return _react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
        id: "some_unique_identifier"
      }, _react["default"].createElement("div", {
        draggable: true,
        onDragStart: function onDragStart(e) {
          return _this2.onDragStart(e, page.pageid, x, y, w, h);
        },
        style: (0, _objectAssign["default"])({}, _style["default"].Region, localStyle, this.props.customStyle, this.props.data.regionStyle) //onMouseDown={this.props.onCropStart}
        //onTouchStart={this.props.onCropStart}
        ,
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