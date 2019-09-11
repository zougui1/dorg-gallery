import React from 'react';
import FormValidator from 'form-validator';
import Field from './Field';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import { fields } from './fields';
import { validations } from './validations';
import { deepReplace, copyNestedObject } from './utils';

class Form extends React.Component {

  // retrieve the pre-defined validations
  static validations = (label, validationsArr) => {
    // temp object for validations
    const validationsObj = {};
    validationsArr.forEach(validationAndArg => {
      // after ":" it's considered as arguments
      let [validation, args] = validationAndArg.split(':');

      let not = false;
      if(validation.charAt(0) === '!') {
        validation = validation.substring(1);
        not = true;
      }

      // get the validation object of the wanted one
      // we do NOT want a reference of the object
      // spread operator partially solve the problem by copying the object
      // but it still get a reference of the objects and arrays it contains and we don't want that
      validationsObj[validation] = copyNestedObject(validations[validation]);
      if(not) validationsObj[validation].validWhen = !validationsObj[validation].validWhen;

      for (const key in validationsObj[validation]) {
        if (validationsObj[validation].hasOwnProperty(key) && key !== 'method') {
          // a range over 2 numbers
          const validationRange = args ? args.split('-') : [];
          // the value after "$" is the input's name
          // it's used to match the value of the input that has the "match" rule
          // and the value of the targeted input
          const match = args ? args.split('$')[1] : '';

          // there's some texts that need to be replaced
          validationsObj[validation] = deepReplace(validationsObj[validation], /<.+>/, {
            label,
            min: validationRange[0],
            max: validationRange[1],
            match,
            not: (not ? 'should' : 'does') + 'n\'t',
          });
        }
      }
    });
    return validationsObj;
  }

  constructor(props) {
    super(props);
    this.getFields(props);

    let fieldsName = {};
    this.fields.forEach(field => fieldsName[field.name] = field.value || '');
    this.state = {
      ...fieldsName,
      validation: this.validator.valid()
    }
  }

  // get the pre-defined fields, and modify them if specified
  getFields = props => {
    this.fields = [];
    let _validations = [];

    props && props.fields && props.fields.forEach(field => {
      let currentField;
      // get a pre-defined field without modifying it
      if(typeof field === 'string') currentField = fields[field];
      // get a pre-defined field and the modify the defined properties
      else if(field.constructor.name === 'Object') currentField = { ...fields[field.name], ...field };
      else currentField = {};
      if(!currentField) return console.error(new Error(`"${field}" is not a pre-defined field`));
      currentField.label = currentField.label || currentField.name;

      // get the pre-defined validations
      if(currentField && Array.isArray(currentField.validations)) {
        currentField.validations = { ...Form.validations(currentField.label, currentField.validations) };
      } else currentField.validations = {};

      // get the defined validations, if there is
      if(field.validations && field.validations.constructor.name === 'Object') {
        currentField = {
          ...currentField,
          ...field,
          validations: {
            ...currentField.validations,
            ...field.validations,
          }
        }
      }

      this.fields.push(currentField);
      // the validations shall be apart from the fields, and in an array
      for (const key in currentField.validations) {
        if (currentField.validations.hasOwnProperty(key)) {
          const validation = currentField.validations[key];
          validation.field = currentField.name;
          _validations.push(validation);
        }
      }
    });

    this.validator = new FormValidator(_validations);
    this.submitted = false;
  }

  handleChange = fieldOnChange => (e, value, name) => {
    e.preventDefault();
    // let the user to get the event
    const { onChange } = this.props;
    if(fieldOnChange) fieldOnChange(e, value, name)
    else if(onChange) onChange(e, value, name);

    this.setState({ [name || e.target.name]: value || e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    // user action for when the form is valid
    if(validation.isValid) this.props.onSubmit(this.state, e);
  }

  render() {
    const {
      submitText,
      redirection,
      title,
      field: _field,
      errorMessage,
      redirect,
      children,
      rangeField,
      selectField,
      onFocus,
      onBlur,
    } = this.props;

    let validation = this.submitted
                     ? this.validator.validate(this.state)
                     : this.state.validation;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{ title }</h1>
        {this.fields.map(field => (
          <Field
            key={field.name}
            value={this.state[field.name]}
            name={field.name}
            label={field.label}
            type={field.type || 'text'}
            validation={validation}
            onFocus={field.onFocus || onFocus}
            onBlur={field.onBlur || onBlur}
            onChange={this.handleChange(field.onChange)}
            field={field.field || _field}
            placeholder={field.placeholder}
            elementType={field.elementType}
            options={field.options}
            min={field.min}
            max={field.max}
            step={field.step}
            rangeField={field.field || rangeField}
            selectField={field.field || selectField}
            minLength={field.minlength}
            maxLength={field.maxlength}
          />
        ))}

        <Button variant="contained" color="primary" type="submit">{ submitText || 'Submit' }</Button>
        <br />
        <span className="externalError">{ errorMessage }</span>
        {redirect && redirection && <Redirect to={redirection} />}
        {children}
      </form>
    );
  }

}

export default Form;
