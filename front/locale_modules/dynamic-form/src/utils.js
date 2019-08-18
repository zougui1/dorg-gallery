export const equals = state => (confirmation, options) => state[options.field] === confirmation;

export const replace = (string, replaces) => {
  for (const key in replaces) {
    if (replaces.hasOwnProperty(key)) {
      const replace = replaces[key];
      if(replace) string = string.replace(new RegExp(`<${key}>`, 'g'), replace);
    }
  }
  return string;
}

export const deepReplace = (element, regex, replaces) => {
  if(typeof element === 'string' && regex.test(element)) element = replace(element, replaces);
  else if(Array.isArray(element)) element = element.map(element => deepReplace(element, regex, replaces));
  else if(typeof element === 'object') {
    for (const key in element) {
      if (element.hasOwnProperty(key)) element[key] = deepReplace(element[key], regex, replaces);
    }
  }
  return element;
}

// copy nested objects and arrays if we don't want their reference
export const copyNestedObject = (element) => {
  let outputObject = {};
  if(Array.isArray(element)) outputObject = element.map(element => copyNestedObject(element));
  else if(typeof element === 'object') {
    for (const key in element) {
      if (element.hasOwnProperty(key)) outputObject[key] = copyNestedObject(element[key]);
    }
  }
  else outputObject = element;
  return outputObject;
}

export const isInRange = () => (value, options) => {
  value = Number(value);
  let { min, max } = options;
  min = Number(options.min);
  max = Number(options.max);
  let condition = true;
  console.log(options.message())

  if(options.min === '_') condition = condition && true;
  else if(isNaN(min)) condition = condition && false;
  else if(value < min) condition = condition && false;
  else condition = condition && true;

  if(options.max === '_') condition = condition && true;
  else if(isNaN(max)) condition = condition && false;
  else if(value > max) condition = condition && false;
  else condition = condition && true;

  if(isNaN(value)) condition = false;

  return condition;
}
