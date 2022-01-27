import { Pet } from './pet';
import { User } from './user';

export interface AdvertiserPet {
  pet: Pet;
  anunciante: User;
  cliente: User;
}
