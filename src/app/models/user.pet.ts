import { Pet } from '../models/pet';
import { UsuarioDTO } from './usuario.dto';

export class AnunciantePet {
    pet: Pet;
    anunciante: UsuarioDTO;
    cliente: UsuarioDTO;
}