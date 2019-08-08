const mapDynamicDispatch = (actionsContainer, actionList) => dispatch => {
  const tempObject = {};
  let actions = [];
  if(typeof actionList === 'string') {
    actions = actionList.split(/\s/g);
  } else if(!Array.isArray(actionList))
    console.warn(new Error(`the second parameter of "mapDynamicDispatch" must be of type array or string, instead received "${actionList.constructor.name}"`));
  actions.forEach(action => {
    if(action.charAt(0) !== '') {
      if(actionsContainer[action]) tempObject[action] = arg => dispatch(actionsContainer[action](arg));
      else console.warn(new Error(`mapDynamicDispatch: the action "${action}" doesn't exists`));
    }
  });
  return tempObject;
}

module.exports = mapDynamicDispatch;
