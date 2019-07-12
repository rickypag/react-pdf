"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PageCanvas;
exports.PageCanvasInternal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PageContext = _interopRequireDefault(require("../PageContext"));

var _Overlay = _interopRequireDefault(require("./Overlay"));

var _RegionSelect = _interopRequireDefault(require("../region/RegionSelect"));

var _reactContextmenu = require("react-contextmenu");

require("../react-contextmenu.css");

var _utils = require("../shared/utils");

var _propTypes2 = require("../shared/propTypes");

var PageCanvasInternal =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(PageCanvasInternal, _PureComponent);

  function PageCanvasInternal(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PageCanvasInternal);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PageCanvasInternal).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onRenderSuccess", function () {
      _this.renderer = null;
      var _this$props = _this.props,
          onRenderSuccess = _this$props.onRenderSuccess,
          page = _this$props.page,
          scale = _this$props.scale;
      (0, _utils.callIfDefined)(onRenderSuccess, (0, _utils.makePageCallback)(page, scale));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onRenderError", function (error) {
      if ((0, _utils.isCancelException)(error)) {
        return;
      }

      (0, _utils.errorOnDev)(error);
      var onRenderError = _this.props.onRenderError;
      (0, _utils.callIfDefined)(onRenderError, error);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "drawPageOnCanvas", function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          canvas = _assertThisInitialize.canvasLayer;

      if (!canvas) {
        return null;
      }

      var _assertThisInitialize2 = (0, _assertThisInitialized2["default"])(_this),
          renderViewport = _assertThisInitialize2.renderViewport,
          viewport = _assertThisInitialize2.viewport;

      var _this$props2 = _this.props,
          page = _this$props2.page,
          renderInteractiveForms = _this$props2.renderInteractiveForms;
      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;
      var w = Math.floor(viewport.width);
      var h = Math.floor(viewport.height);
      canvas.style.width = "".concat(w, "px");
      canvas.style.height = "".concat(h, "px");

      _this.setState({
        height: h,
        width: w
      });

      _this.setParentDimensions(h, w);

      var renderContext = {
        get canvasContext() {
          return canvas.getContext('2d');
        },

        viewport: renderViewport,
        renderInteractiveForms: renderInteractiveForms
      }; // If another render is in progress, let's cancel it

      _this.cancelRenderingTask();

      _this.renderer = page.render(renderContext);
      return _this.renderer.promise.then(_this.onRenderSuccess)["catch"](_this.onRenderError);
    });
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2["default"])(_this));
    _this.setParentDimensions = props.setDimensions;
    _this.state = {
      regions: [],
      numPages: null,
      pageNumber: 1,
      display: props.display
    };
    return _this;
  }

  (0, _createClass2["default"])(PageCanvasInternal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawPageOnCanvas();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          page = _this$props3.page,
          renderInteractiveForms = _this$props3.renderInteractiveForms;

      if (renderInteractiveForms !== prevProps.renderInteractiveForms) {
        // Ensures the canvas will be re-rendered from scratch. Otherwise all form data will stay.
        page.cleanup();
        this.drawPageOnCanvas();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelRenderingTask();
      /**
       * Zeroing the width and height cause most browsers to release graphics
       * resources immediately, which can greatly reduce memory consumption.
       */

      if (this.canvasLayer) {
        this.canvasLayer.width = 0;
        this.canvasLayer.height = 0;
        this.canvasLayer = null;
      }
    }
  }, {
    key: "cancelRenderingTask",
    value: function cancelRenderingTask() {
      /* eslint-disable no-underscore-dangle */
      if (this.renderer && this.renderer._internalRenderTask.running) {
        this.renderer._internalRenderTask.cancel();
      }
      /* eslint-enable no-underscore-dangle */

    }
    /**
     * Called when a page is rendered successfully.
     */

  }, {
    key: "onChange",
    value: function onChange(regions) {
      this.setState({
        regions: regions
      });
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
      var _this3 = this;

      var regionStyle = {
        background: 'rgba(255, 0, 0, 0)',
        'position': 'absolute'
      };
      var display = this.props.display;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("canvas", {
        className: "react-pdf__Page__canvas",
        style: {
          display: 'inline',
          userSelect: 'none'
        },
        ref: function ref(_ref) {
          _this3.canvasLayer = _ref;
        }
      }), _react["default"].createElement(_RegionSelect["default"], {
        maxRegions: 1,
        regions: this.state.regions,
        regionStyle: regionStyle,
        constraint: true,
        onChange: this.onChange,
        regionRenderer: this.regionRenderer,
        style: {
          border: '1px solid black',
          position: 'absolute',
          display: "".concat(display),
          width: "".concat(this.state.width, "px"),
          height: "".concat(this.state.height, "px")
        }
      }, _react["default"].createElement("img", {
        src: "prova.jpega",
        width: "".concat(this.state.width, "px"),
        height: "".concat(this.state.height, "px"),
        style: {}
      })), _react["default"].createElement(_reactContextmenu.ContextMenu, {
        id: "some_unique_identifier"
      }, _react["default"].createElement(_reactContextmenu.MenuItem, {
        style: {
          'background-color': 'red'
        },
        data: {
          foo: 'bar'
        },
        onClick: this.handleClick
      }, "ContextMenu Item 1"), _react["default"].createElement(_reactContextmenu.MenuItem, {
        data: {
          foo: 'bar'
        },
        onClick: this.handleClick
      }, "ContextMenu Item 2"), _react["default"].createElement(_reactContextmenu.MenuItem, {
        divider: true
      }), _react["default"].createElement(_reactContextmenu.MenuItem, {
        data: {
          foo: 'bar'
        },
        onClick: this.handleClick
      }, "ContextMenu Item 3")));
    }
  }, {
    key: "renderViewport",
    get: function get() {
      var _this$props4 = this.props,
          page = _this$props4.page,
          rotate = _this$props4.rotate,
          scale = _this$props4.scale;
      var pixelRatio = (0, _utils.getPixelRatio)();
      return page.getViewport({
        scale: scale * pixelRatio,
        rotation: rotate
      });
    }
  }, {
    key: "viewport",
    get: function get() {
      var _this$props5 = this.props,
          page = _this$props5.page,
          rotate = _this$props5.rotate,
          scale = _this$props5.scale;
      return page.getViewport({
        scale: scale,
        rotation: rotate
      });
    }
  }]);
  return PageCanvasInternal;
}(_react.PureComponent);

exports.PageCanvasInternal = PageCanvasInternal;
PageCanvasInternal.propTypes = {
  onRenderError: _propTypes["default"].func,
  onRenderSuccess: _propTypes["default"].func,
  page: _propTypes2.isPage.isRequired,
  renderInteractiveForms: _propTypes["default"].bool,
  rotate: _propTypes2.isRotate,
  scale: _propTypes["default"].number
};

function PageCanvas(props) {
  return _react["default"].createElement(_PageContext["default"].Consumer, null, function (context) {
    return _react["default"].createElement(PageCanvasInternal, (0, _extends2["default"])({}, context, props));
  });
}