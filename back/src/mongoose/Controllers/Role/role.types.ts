import { RoleModel } from '../../Models/Role/role.types';
import { Document, Query as MQuery } from 'mongoose';
import { ArrayQuery, NullableQuery } from '../controller.types';

// methods type
export type Add = (name: string) => Promise<Document & RoleModel>;
export type FindByName = (name: string) => NullableQuery;
export type GetAll = () => ArrayQuery;

export interface IRoleController {
  add: Add;
  findByName: FindByName;
  getAll: GetAll;
}
