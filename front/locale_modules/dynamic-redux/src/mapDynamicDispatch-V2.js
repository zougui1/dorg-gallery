import _ from 'lodash';

const mapDynamicDispatch = (actionsContainer, actionList) => dispatch => {
  if (!_.isObject(actionsContainer)) {
    throw new Error(`The actions must be an object. Got "${actionsContainer}"`);
  }

  const tempActions = {};
  let actions = [];

  if (_.isString(actionList)) {
    actions = actionList
  }

}
