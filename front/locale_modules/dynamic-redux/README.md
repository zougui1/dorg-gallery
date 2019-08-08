mapDynamicState return an object from redux state (or any state, by providing an object into a second function argument example: `mapDynamicState('reducerName: props')(myStateObject);`)

note that if you use `mapDynamicState` your reducer must end by "Reducer" example, an "auth" reducer must be named "authReducer"

examples of use
```js
// if you wants one or several props from one reducer, you can use a simple string
const mapStateToProps = mapDynamicState('reducerName: prop1 prop2 prop3');

// if you want one and/or several props from one and/or several reducers, you can use an object, containing either a string or an array
const mapStateToProps = mapDynamicState({
  reducer1: 'prop1 prop2 prop3',
  reducer2: ['prop1', 'prop2', 'prop3 prop4']
});
```
