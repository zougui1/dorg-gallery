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
  }

  export enum HaveOverlays {
    '*',
    text,
    draw,
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

  export enum Order {
    ASC,
    DESC
  }

  export interface Sort {
    criteria: Criteria;
    order: Order;
  }
}


export interface ISearchOptions {
  search: string[];
  match: SearchOptions.Match;
  haveOverlays: SearchOptions.HaveOverlays[];
  rating: SearchOptions.Rating;
  sort: SearchOptions.Sort;
}

// methods type
export type Add = (imageModel: ImageModel) => Promise<Document & ImageModel>;
export type GetByPage = (tags: TagModel[] | string[], page: number, user: UserModel, searchOptions: ISearchOptions) => ArrayQuery;
export type GetById = (id: string) => NullableQuery;
export type GetCount = (user: UserModel, tags: TagModel[] | string[]) => MQuery<number>;

export interface IImageController {
  add: Add;
  getByPage: GetByPage;
  getById: GetById;
  getCount: GetCount;
}
