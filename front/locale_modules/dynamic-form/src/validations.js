import { equals, isInRange } from './utils';

export const validations = {
  required: {
    method: 'isEmpty',
    validWhen: false,
    message: '<label> is required.'
  },
  length: {
    method: 'isLength',
    args: [{ min: '<min>', max: '<max>' }],
    validWhen: true,
    message: '<label> must have between <min> and <max> characters.'
  },
  passwordMatch: {
    method: equals,
    args: [{field: 'password'}],
    validWhen: true,
    message: 'Both passwords doesn\'t match.'
  },
  equals: {
    method: equals,
    validWhen: true,
    args: [{field: '<match>'}],
    message: '<label> and <match> <not> match.'
  },
  email: {
    method: 'isEmail',
    validWhen: true,
    message: 'You must provide a valid email address.'
  },
  range: {
    method: isInRange,
    validWhen: true,
    args: [{min: '<min>', max: '<max>'}],
    message: '<label> must be between <min> and <max>'
  }
}
