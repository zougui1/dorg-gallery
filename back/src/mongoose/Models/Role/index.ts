import mongoose from 'mongoose';
import { RoleModel } from './role.types';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 25,
    trim: true,
    lowercase: true,
  }
});

roleSchema.virtual('value').get(function () {
  // @ts-ignore
  const self: RoleModel = this;
  return 'ROLE_' + self.name.toUpperCase();
});

const Role = mongoose.model('Role', roleSchema);

export {
  roleSchema,
  Role,
};
