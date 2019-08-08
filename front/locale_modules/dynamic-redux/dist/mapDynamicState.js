"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var mapDynamicState = function mapDynamicState(stateList) {
  return function (state) {
    if (!state) return false;

    if (!stateList) {
      console.warn('mapDynamicState: didn\'t received the wanted props from the state');
      return {};
    }

    var tempState = {};

    if (typeof stateList === 'string') {
      var stateParts = stateList.split(':').map(function (str) {
        return str.trim();
      });

      if (stateParts.length < 2) {
        console.error(new Error("mapDynamicState: should be used with \"reducerName: propName\", instead received:\n\"".concat(stateList, "\"")));
        return false;
      }

      var _stateParts = _slicedToArray(stateParts, 2),
          reducerName = _stateParts[0],
          propsStr = _stateParts[1];

      var props = propsStr.split(/\s/);
      props.forEach(function (prop) {
        if (state["".concat(reducerName, "Reducer")]) tempState[prop] = state["".concat(reducerName, "Reducer")][prop];else console.warn("mapDynamicState: There is no props called \"".concat(reducerName, "Reducer\" in the state"));
      });
    } else if (stateList.constructor.name === 'Object') {
      var _loop = function _loop(_reducerName) {
        if (stateList.hasOwnProperty(_reducerName)) {
          var propsTemp = stateList[_reducerName];
          var _props = [];

          if (Array.isArray(propsTemp)) {
            propsTemp = propsTemp.map(function (str) {
              return str.trim();
            });
            var dirtyArr = propsTemp.map(function (str) {
              return str.split(/\s/);
            });
            dirtyArr.forEach(function (str) {
              if (typeof str === 'string') _props.push(str);else if (Array.isArray(str)) str.forEach(function (str) {
                return _props.push(str);
              });
            });
          } else if (typeof propsTemp === 'string') {
            propsTemp = propsTemp.trim();
            _props = propsTemp.split(/\s/);
          } else {
            console.error(new Error("mapDynamicState: The element in an object in mapDynamicState must be of type Array or String, instead received the type \"".concat(propsTemp.constructor.name, "\"")));
          }

          _props.forEach(function (prop) {
            if (state["".concat(_reducerName, "Reducer")]) tempState[prop] = state["".concat(_reducerName, "Reducer")][prop];else console.warn("mapDynamicState: There is no props called \"".concat(_reducerName, "Reducer\" in the state"));
          });
        }
      };

      for (var _reducerName in stateList) {
        _loop(_reducerName);
      }
    } else {
      console.error(new Error("mapDynamicState: The element in mapDynamicState must be of type Object or String, instead received the type \"".concat(stateList.constructor.name, "\"")));
    }

    return tempState;
  };
};

module.exports = mapDynamicState;