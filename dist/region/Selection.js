"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

function Selection(_ref) {
  var style = _ref.style,
      onMouseDown = _ref.onMouseDown,
      onTouchStart = _ref.onTouchStart,
      children = _ref.children;

  var _useDrag = (0, _reactDnd.useDrag)({
    item: {
      type: 'selection'
    },
    collect: function collect(monitor) {
      return {
        isDragging: !!monitor.isDragging()
      };
    }
  }),
      _useDrag2 = (0, _slicedToArray2["default"])(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  return _react["default"].createElement("div", {
    ref: drag,
    style: style,
    onMouseDown: onMouseDown,
    onTouchStart: onTouchStart,
    "data-wrapper": "wrapper"
  }, children);
}

var _default = Selection;
exports["default"] = _default;