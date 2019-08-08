const mapDynamicState = stateList => state => {
  if(!state) return false;
  if(!stateList) {
    console.warn('mapDynamicState: didn\'t received the wanted props from the state');
    return {};
  }

  const tempState = {};

  if(typeof stateList === 'string') {
    const stateParts = stateList.split(':').map(str => str.trim());
    if(stateParts.length < 2) {
      console.error(new Error(`mapDynamicState: should be used with "reducerName: propName", instead received:\n"${stateList}"`));
      return false;
    }
    const [reducerName, propsStr] = stateParts;
    const props = propsStr.split(/\s/);

    props.forEach(prop => {
      if(state[`${reducerName}Reducer`]) tempState[prop] = state[`${reducerName}Reducer`][prop];
      else console.warn(`mapDynamicState: There is no props called "${reducerName}Reducer" in the state`);
    });
  } else if(stateList.constructor.name === 'Object') {
    for (const reducerName in stateList) {
      if (stateList.hasOwnProperty(reducerName)) {
        let propsTemp = stateList[reducerName];
        let props = [];

        if(Array.isArray(propsTemp)) {
          propsTemp = propsTemp.map(str => str.trim());
          const dirtyArr = propsTemp.map(str => str.split(/\s/));
          dirtyArr.forEach(str => {
            if(typeof str === 'string') props.push(str);
            else if(Array.isArray(str)) str.forEach(str => props.push(str));
          });
        } else if(typeof propsTemp === 'string') {
          propsTemp = propsTemp.trim();
          props = propsTemp.split(/\s/);
        } else {
          console.error(new Error(`mapDynamicState: The element in an object in mapDynamicState must be of type Array or String, instead received the type "${propsTemp.constructor.name}"`));
        }
        props.forEach(prop => {
          if(state[`${reducerName}Reducer`]) tempState[prop] = state[`${reducerName}Reducer`][prop];
          else console.warn(`mapDynamicState: There is no props called "${reducerName}Reducer" in the state`);
        });
      }
    }
  } else {
    console.error(new Error(`mapDynamicState: The element in mapDynamicState must be of type Object or String, instead received the type "${stateList.constructor.name}"`));
  }
  return tempState;
}

module.exports = mapDynamicState;
