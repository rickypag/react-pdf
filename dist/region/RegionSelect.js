"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _objectAssign = _interopRequireDefault(require("object-assign"));

var _Region = _interopRequireDefault(require("./Region"));

var _style = _interopRequireDefault(require("./style"));

var RegionSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RegionSelect, _Component);

  function RegionSelect(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, RegionSelect);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RegionSelect).call(this, props));
    _this.onComponentMouseTouchDown = _this.onComponentMouseTouchDown.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDocMouseTouchMove = _this.onDocMouseTouchMove.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDocMouseTouchEnd = _this.onDocMouseTouchEnd.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onRegionMoveStart = _this.onRegionMoveStart.bind((0, _assertThisInitialized2["default"])(_this));
    _this.regionCounter = 0;
    _this.actualWidth = 0;
    _this.actualHeight = 0;
    return _this;
  }

  (0, _createClass2["default"])(RegionSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousemove', this.onDocMouseTouchMove);
      document.addEventListener('touchmove', this.onDocMouseTouchMove);
      document.addEventListener('mouseup', this.onDocMouseTouchEnd);
      document.addEventListener('touchend', this.onDocMouseTouchEnd);
      document.addEventListener('touchcancel', this.onDocMouseTouchEnd);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousemove', this.onDocMouseTouchMove);
      document.removeEventListener('touchmove', this.onDocMouseTouchMove);
      document.removeEventListener('mouseup', this.onDocMouseTouchEnd);
      document.removeEventListener('touchend', this.onDocMouseTouchEnd);
      document.removeEventListener('touchcancel', this.onDocMouseTouchEnd);
    }
  }, {
    key: "getClientPos",
    value: function getClientPos(e) {
      var pageX, pageY;

      if (e.touches) {
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }

      return {
        x: pageX,
        y: pageY
      };
    }
  }, {
    key: "onDocMouseTouchMove",
    value: function onDocMouseTouchMove(event) {
      if (!this.isChanging) {
        return;
      }

      var index = this.regionChangeIndex;
      var updatingRegion = this.props.regions[index];
      var clientPos = this.getClientPos(event);
      var regionChangeData = this.regionChangeData;
      var x, y, width, height;

      if (!regionChangeData.isMove) {
        var x1Pc, y1Pc, x2Pc, y2Pc;
        x1Pc = (regionChangeData.clientPosXStart - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth * 100;
        y1Pc = (regionChangeData.clientPosYStart - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight * 100;
        x2Pc = (clientPos.x - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth * 100;
        y2Pc = (clientPos.y - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight * 100;
        x = Math.min(x1Pc, x2Pc);
        y = Math.min(y1Pc, y2Pc);
        width = Math.abs(x1Pc - x2Pc);
        height = Math.abs(y1Pc - y2Pc);

        if (this.props.constraint) {
          if (x2Pc >= 100) {
            x = x1Pc;
            width = 100 - x1Pc;
          }

          if (y2Pc >= 100) {
            y = y1Pc;
            height = 100 - y1Pc;
          }

          if (x2Pc <= 0) {
            x = 0;
            width = x1Pc;
          }

          if (y2Pc <= 0) {
            y = 0;
            height = y1Pc;
          }
        }
      } else {
        x = (clientPos.x + regionChangeData.clientPosXOffset - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth * 100;
        y = (clientPos.y + regionChangeData.clientPosYOffset - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight * 100;
        width = updatingRegion.width;
        height = updatingRegion.height;

        if (this.props.constraint) {
          if (x + width >= 100) {
            x = Math.round(100 - width);
          }

          if (y + height >= 100) {
            y = Math.round(100 - height);
          }

          if (x <= 0) {
            x = 0;
          }

          if (y <= 0) {
            y = 0;
          }
        }
      }

      var rect = {
        x: x,
        y: y,
        width: width,
        height: height,
        isChanging: true
      };
      this.props.onChange([].concat((0, _toConsumableArray2["default"])(this.props.regions.slice(0, index)), [(0, _objectAssign["default"])({}, updatingRegion, rect)], (0, _toConsumableArray2["default"])(this.props.regions.slice(index + 1))));
    }
  }, {
    key: "onDocMouseTouchEnd",
    value: function onDocMouseTouchEnd() {
      if (this.isChanging) {
        this.isChanging = false;
        var index = this.regionChangeIndex;
        var updatingRegion = this.props.regions[index];
        var changes = {
          "new": false,
          isChanging: false
        };
        this.regionChangeIndex = null;
        this.regionChangeData = null;
        this.props.onChange([].concat((0, _toConsumableArray2["default"])(this.props.regions.slice(0, index)), [(0, _objectAssign["default"])({}, updatingRegion, changes)], (0, _toConsumableArray2["default"])(this.props.regions.slice(index + 1))));
      }
    }
  }, {
    key: "onComponentMouseTouchDown",
    value: function onComponentMouseTouchDown(event) {
      if (event.button != 0 || event.target.dataset.wrapper || event.target.dataset.dir || isSubElement(event.target, function (el) {
        return el.dataset && el.dataset.wrapper;
      })) {
        return;
      }

      event.preventDefault();
      var clientPos = this.getClientPos(event);
      var imageOffset = this.getElementOffset(this.refs.image);
      var xPc = (clientPos.x - imageOffset.left) / this.refs.image.offsetWidth * 100;
      var yPc = (clientPos.y - imageOffset.top) / this.refs.image.offsetHeight * 100;
      this.isChanging = true;
      var rect = {
        x: xPc,
        y: yPc,
        width: 0,
        height: 0,
        "new": true,
        data: {
          index: this.regionCounter
        },
        isChanging: true
      };
      this.regionCounter += 1;
      this.regionChangeData = {
        imageOffsetLeft: imageOffset.left,
        imageOffsetTop: imageOffset.top,
        clientPosXStart: clientPos.x,
        clientPosYStart: clientPos.y,
        imageWidth: this.refs.image.offsetWidth,
        imageHeight: this.refs.image.offsetHeight,
        isMove: false
      };

      if (this.props.regions.length < this.props.maxRegions) {
        this.props.onChange(this.props.regions.concat(rect));
        this.regionChangeIndex = this.props.regions.length;
      } else {
        this.props.onChange([].concat((0, _toConsumableArray2["default"])(this.props.regions.slice(0, this.props.maxRegions - 1)), [rect]));
        this.regionChangeIndex = this.props.maxRegions - 1;
      }
    }
  }, {
    key: "getElementOffset",
    value: function getElementOffset(el) {
      var rect = el.getBoundingClientRect();
      var docEl = document.documentElement;
      var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
      var rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
      return {
        top: rectTop,
        left: rectLeft
      };
    }
  }, {
    key: "onRegionMoveStart",
    value: function onRegionMoveStart(event, index) {
      if (
      /*!event.target.dataset.wrapper &&*/
      !event.target.dataset.dir) {
        return;
      }

      event.preventDefault();
      var clientPos = this.getClientPos(event);
      var imageOffset = this.getElementOffset(this.refs.image);
      var clientPosXStart, clientPosYStart;
      var currentRegion = this.props.regions[index];
      var regionLeft = currentRegion.x / 100 * this.refs.image.offsetWidth + imageOffset.left;
      var regionTop = currentRegion.y / 100 * this.refs.image.offsetHeight + imageOffset.top;
      var regionWidth = currentRegion.width / 100 * this.refs.image.offsetWidth;
      var regionHeight = currentRegion.height / 100 * this.refs.image.offsetHeight;
      var clientPosDiffX = regionLeft - clientPos.x;
      var clientPosDiffY = regionTop - clientPos.y;
      /*console.log(regionLeft)
      console.log(regionTop)
      console.log(regionWidth)
      console.log(regionHeight)*/

      var resizeDir = event.target.dataset.dir;

      if (resizeDir) {
        if (resizeDir === 'se') {
          clientPosXStart = regionLeft;
          clientPosYStart = regionTop;
        } else if (resizeDir === 'sw') {
          clientPosXStart = regionLeft + regionWidth;
          clientPosYStart = regionTop;
        } else if (resizeDir === 'nw') {
          clientPosXStart = regionLeft + regionWidth;
          clientPosYStart = regionTop + regionHeight;
        } else if (resizeDir === 'ne') {
          clientPosXStart = regionLeft;
          clientPosYStart = regionTop + regionHeight;
        }
      } else {
        clientPosXStart = clientPos.x;
        clientPosYStart = clientPos.y;
      }

      this.isChanging = true;
      this.regionChangeData = {
        imageOffsetLeft: imageOffset.left,
        imageOffsetTop: imageOffset.top,
        clientPosXStart: clientPosXStart,
        clientPosYStart: clientPosYStart,
        clientPosXOffset: clientPosDiffX,
        clientPosYOffset: clientPosDiffY,
        imageWidth: this.refs.image.offsetWidth,
        imageHeight: this.refs.image.offsetHeight,
        isMove: resizeDir ? false : true,
        resizeDir: resizeDir
      };
      this.regionChangeIndex = index;
    }
  }, {
    key: "renderRect",
    value: function renderRect(rect, index) {
      var _this2 = this;

      return _react["default"].createElement(_Region["default"], {
        pageJSON: this.props.pageJSON,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        imageWidth: this.refs.image.offsetWidth,
        imageHeight: this.refs.image.offsetHeight,
        imageOffset: this.getElementOffset(this.refs.image),
        handles: !rect["new"],
        data: rect.data,
        key: index,
        index: index,
        customStyle: this.props.regionStyle,
        dataRenderer: this.props.regionRenderer,
        onCropStart: function onCropStart(event) {
          return _this2.onRegionMoveStart(event, index);
        },
        changing: index === this.regionChangeIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      var regions = this.props.regions;
      return _react["default"].createElement("div", {
        ref: "image",
        style: (0, _objectAssign["default"])({}, _style["default"].RegionSelect, this.props.style, {
          position: 'absolute'
        }, {
          left: 0
        }),
        className: this.props.className,
        onTouchStart: this.onComponentMouseTouchDown,
        onMouseDown: this.onComponentMouseTouchDown
      }, regions.map(this.renderRect.bind(this)), this.props.debug ? _react["default"].createElement("table", {
        style: {
          position: 'absolute',
          right: 0,
          top: 0
        }
      }, _react["default"].createElement("tbody", null, regions.map(function (rect, index) {
        return _react["default"].createElement("tr", {
          key: index
        }, _react["default"].createElement("td", null, "x: ", Math.round(rect.x, 1)), _react["default"].createElement("td", null, "y: ", Math.round(rect.y, 1)), _react["default"].createElement("td", null, "width: ", Math.round(rect.width, 1)), _react["default"].createElement("td", null, "height: ", Math.round(rect.height, 1)));
      }))) : null, this.props.children);
    }
  }]);
  return RegionSelect;
}(_react.Component);

RegionSelect.propTypes = {
  constraint: _propTypes.PropTypes.bool,
  regions: _propTypes.PropTypes.array,
  children: _propTypes.PropTypes.any,
  onChange: _propTypes.PropTypes.func.isRequired,
  regionRenderer: _propTypes.PropTypes.func,
  maxRegions: _propTypes.PropTypes.number,
  debug: _propTypes.PropTypes.bool,
  className: _propTypes.PropTypes.string,
  style: _propTypes.PropTypes.object,
  regionStyle: _propTypes.PropTypes.object
};
RegionSelect.defaultProps = {
  maxRegions: Infinity,
  debug: false,
  regions: [],
  constraint: false
};

function isSubElement(el, check) {
  if (el === null) {
    return false;
  } else if (check(el)) {
    return true;
  } else {
    return isSubElement(el.parentNode, check);
  }
} // support both es6 modules and common js


module.exports = RegionSelect;
module.exports["default"] = RegionSelect;