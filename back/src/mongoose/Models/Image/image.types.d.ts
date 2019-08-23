import { TagModel } from '../Tag/tag.types';
import { UserModel } from '../User/user.types';
import { CoreModel } from '../model.types';

interface Canvas {
  text: string;
  draw: string;
}

interface Artist {
  name: string;
  link: string;
}

declare enum Rate {
  general,
  suggestive,
  nsfw
}

export interface ImageModel extends CoreModel {
  link: string;
  thumb: string;
  canvas: Canvas;
  tags: TagModel[];
  rate: Rate;
  artist: Artist;
  characterName: string;
  user: UserModel;
  description: string;
  createdOn: Date;
}
