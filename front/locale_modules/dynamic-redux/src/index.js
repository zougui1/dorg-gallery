exports.mapDynamicState = require('./mapDynamicState');
exports.mapDynamicState2 = require('./mapDynamicState-V2');
exports.mapDynamicDispatch = require('./mapDynamicDispatch');
exports.createStore = require('./createStore');
exports.DynamicState = require('./DynamicState');
exports.DynamicState2 = require('./DynamicState-V2');

const mapDynamicState = require('./mapDynamicState');
const mapDynamicState2 = require('./mapDynamicState-V2');
const DynamicState = require('./DynamicState');
const DynamicState2 = require('./DynamicState-V2');

const testState = new DynamicState({
  myProperty: 'value',
  myProperty1: 'value',
  myProperty2: 'value',
  myProperty3: 'value',
  myProperty4: 'value',
  myProperty5: 'value',
});

testState.createReducer({
  setMyProperty: 'SET_MY_PROPERTY',
  setMyProperty1: 'SET_MY_PROPERTY_1',
  setMyProperty2: 'SET_MY_PROPERTY_2',
  setMyProperty3: 'SET_MY_PROPERTY_3',
  setMyProperty4: 'SET_MY_PROPERTY_4',
  setMyProperty5: 'SET_MY_PROPERTY_5',
});

const testState2 = new DynamicState2('test', {
  myProperty: ['ty'],
  myProperty1: 'value',
  myProperty2: 'value',
  myProperty3: 'value',
  myProperty4: 'value',
  myProperty5: 'value',
});

testState2.createReducer({
  myProperty: ['set', 'push'],
  myProperty1: 'set',
  myProperty2: 'set',
  myProperty3: 'set',
  myProperty4: 'set',
  myProperty5: 'set',
});

//console.log(testState2.actions);
console.log(testState2.actions.myProperty.push('new value'));

const state = {
  testReducer: testState2.initialState
};

const i = 10;

let iterations = i;
let iterations2 = i;

const getProps = 'test: myProperty myProperty2';

console.time('V1');
while (iterations--) {
  //mapDynamicState(getProps)(state);
  testState.actions.setMyProperty('new value');
}
console.timeEnd('V1');

console.time('V2');
while (iterations2--) {
  //mapDynamicState2(getProps)(state);
  testState2.actions.myProperty.set('new value');
}
console.timeEnd('V2');
