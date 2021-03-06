
/**
 * Interface de usuario, usuarioDTO
 */
export interface User {
  id: string;
  email: string;
  nome: string;
  dataNascimento: string;
  password: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  rate: number;
  dataAtualizacao: string;
  dataCadastro: string;
  ddd: number;
  telefone: number;
}

export class UserDTO implements User {
  id: string;
  email: string;
  nome: string;
  dataNascimento: string;
  password: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  rate: number;
  dataAtualizacao: string;
  dataCadastro: string;
  ddd: number;
  telefone: number;

};
