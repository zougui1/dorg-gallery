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

enum Property {
  general,
  nsfw
};

export interface ImageModel extends CoreModel {
  link: string;
  thumb: string;
  canvas: Canvas;
  tags: TagModel[];
  property: Property;
  artist: Artist;
  characterName: string;
  user: UserModel;
  description: string;
}
