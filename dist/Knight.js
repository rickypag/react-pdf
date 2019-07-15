"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

function Knight() {
  var _useDrag = (0, _reactDnd.useDrag)({
    item: {
      type: 'knight'
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
    style: {
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move'
    }
  }, "\u2658");
}

var _default = Knight;
exports["default"] = _default;