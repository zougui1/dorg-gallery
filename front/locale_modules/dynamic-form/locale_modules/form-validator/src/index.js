import validator from 'validator';

class FormValidator {
  constructor(validations) {
    this.validations = validations;
  }

  validate(state) {
    let validation = this.valid();

    this.validations.forEach(rule => {

      if (!validation[rule.field].isInvalid) {
        const fieldValue = state[rule.field];
        let args = rule.args || [];
        let validationMethod;

        if(typeof rule.method === 'string') validationMethod = validator[rule.method];
        else {
          validationMethod = rule.method(state);
        }

        if(validationMethod(fieldValue, ...args) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message }
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  valid() {
    const validation = {}

    this.validations.map(rule => (
      validation[rule.field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation };
  }
}

export default FormValidator;
