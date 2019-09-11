"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _2 = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rConnect;
var error;
/**
 * require react-redux synchronously
 * doesn't throw an error if it doesn't exists
 * only throw it if the `connect` function is executed without react-redux installed
 */

try {
  var reactRedux = require('react-redux');

  if (reactRedux) {
    rConnect = reactRedux.connect;
  }
} catch (e) {
  error = e;
}
/**
 *
 * @param {String | Object | Function | undefined} mapper
 * @param {Function} dynamicMapper
 * @returns {Function | undefined}
 */


var getMap = function getMap(map, mapper) {
  if (_lodash.default.isFunction(map)) {
    return map;
  } else if (_lodash.default.isString(map) || _lodash.default.isObject(map)) {
    return mapper(map);
  }

  return null;
};
/**
 * use direct string and object to transform them with the dynamic mappers and make them consumable for the for the `connect` function of *react-redux*
 * @param {String | Object | Function | undefined} _mapStateToProps
 * @param {String | Object | Function | undefined} _mapDispatchToProps
 * @returns {Object}
 */


var connect = function connect(_mapStateToProps, _mapDispatchToProps) {
  if (!rConnect) {
    throw error;
  }

  var mapStateToProps = getMap(_mapStateToProps, _2.mapDynamicState);
  var mapDispatchToProps = getMap(_mapDispatchToProps, _2.mapDynamicDispatch);
  return rConnect(mapStateToProps, mapDispatchToProps);
};

exports.connect = connect;