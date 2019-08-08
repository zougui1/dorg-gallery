"use strict";

var mapDynamicDispatch = function mapDynamicDispatch(actionsContainer, actionList) {
  return function (dispatch) {
    var tempObject = {};
    var actions = [];

    if (typeof actionList === 'string') {
      actions = actionList.split(/\s/g);
    } else if (!Array.isArray(actionList)) console.warn(new Error("the second parameter of \"mapDynamicDispatch\" must be of type array or string, instead received \"".concat(actionList.constructor.name, "\"")));

    actions.forEach(function (action) {
      if (action.charAt(0) !== '') {
        if (actionsContainer[action]) tempObject[action] = function (arg) {
          return dispatch(actionsContainer[action](arg));
        };else console.warn(new Error("mapDynamicDispatch: the action \"".concat(action, "\" doesn't exists")));
      }
    });
    return tempObject;
  };
};

module.exports = mapDynamicDispatch;