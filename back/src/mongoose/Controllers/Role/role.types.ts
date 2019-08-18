import { RoleModel } from '../../Models/Role/role.types';
import { Document, Query as MQuery } from 'mongoose';
import { ArrayQuery } from '../controller.types';

// methods type
export type Add = (name: string) => Promise<Document & RoleModel>;
export type GetAll = (name: string) => ArrayQuery;

export interface IRoleController {
  add: Add;
  getAll: GetAll;
}
