import React from 'react';
import TextField from './TextField';
import Select from './Select';
import Range from './Range';

const Field = props => {
  let { elementType, name } = props;
  elementType = elementType || 'text';

  const textField = () => {
    let { name, label, field, placeholder } = props;
    placeholder = placeholder || label;
    const htmlAttributes = {...props};
    delete htmlAttributes.elementType;
    delete htmlAttributes.rangeField;
    delete htmlAttributes.selectField;

    return <TextField {...htmlAttributes} placeholder={field ? placeholder : ''} id={name} className={name} />;
  }

  const displayMessage = () => {
    const { validation, name } = props;
    return (
      <React.Fragment>
        <br />
        { validation && validation[name] && <span className="help-block">{validation[name].message}</span> }
        <br />
      </React.Fragment>
    );
  }

  return (
    <span>
      { elementType === 'text' && textField() }
      { elementType === 'select' && <Select {...props} id={name} className={name} /> }
      { elementType === 'range' && <Range {...props} /> }
      { displayMessage() }
    </span>
  );
}

export default Field;
