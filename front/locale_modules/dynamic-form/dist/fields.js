"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fields = void 0;
var fields = {
  username: {
    name: 'username',
    label: 'Username',
    validations: ['required', 'length:3-40']
  },
  password: {
    name: 'password',
    label: 'Password',
    type: 'password',
    validations: ['required', 'length:8-100']
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Password confirmation',
    type: 'password',
    validations: ['required', 'passwordMatch']
  },
  email: {
    name: 'email',
    label: 'Email',
    validations: ['email']
  }
};
exports.fields = fields;