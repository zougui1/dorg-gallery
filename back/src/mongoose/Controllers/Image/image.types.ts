import { ImageModel } from '../../Models/Image/image.types';
import { TagModel } from '../../Models/Tag/tag.types';
import { Document, Query as MQuery } from 'mongoose';
import { UserModel } from '../../Models/User/user.types';
import { NullableQuery, ArrayQuery } from '../controller.types';

export namespace SearchOptions {
  export interface User {
    slug: string;
  }

  export interface Match {
    user: User;
    userData: any;
  }

  export enum HaveOverlays {
    '*' = '*',
    'text' = 'text',
    'draw' = 'draw',
  }

  export enum Rating {
    general,
    suggestive,
    nsfw,
  }

  export enum Criteria {
    date,
    relevancy
  }

  export interface Sort {
    criteria: Criteria;
    order: number;
  }
}


export interface ISearchOptions {
  search: string[];
  match: SearchOptions.Match;
  haveOverlays: SearchOptions.HaveOverlays[];
  rating: SearchOptions.Rating;
  sort: SearchOptions.Sort;
}

export type ImageQuery = (tags: TagModel[] | string[], user: UserModel, searchOptions: ISearchOptions) => any;

// methods type
export type Add = (imageModel: ImageModel) => Promise<Document & ImageModel>;
export type GetByPage = (tags: TagModel[] | string[], page: number, user: UserModel, searchOptions: ISearchOptions) => ArrayQuery;
export type GetById = (id: string) => NullableQuery;
export type GetCount = (tags: TagModel[] | string[], user: UserModel, searchOptions: ISearchOptions) => Promise<number>;

export interface IImageController {
  add: Add;
  getByPage: GetByPage;
  getById: GetById;
  getCount: GetCount;
}
