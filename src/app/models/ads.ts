/**
 * Interface de anuncio, Anuncio
 */
export interface Ads {
  id: string;
  titulo: string;
  descricao: string;
  userId: string;
  userName: string;
  preco: string;
  dataCadastro: string;
  dataCadastroFormatted: string;
  dataAtualizacao: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
  domingo: string;
  horario1: string;
  horario2: string;
  horario3: string;
  horario1Disp: string;
  horario2Disp: string;
  horario3Disp: string;
  isActive: string;
  expirationTime: string;
}

export class AdsDTO implements Ads {
  id: string;
  titulo: string;
  descricao: string;
  userId: string;
  userName: string;
  preco: string;
  dataCadastro: string;
  dataCadastroFormatted: string;
  dataAtualizacao: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  sabado: string;
  domingo: string;
  horario1: string;
  horario2: string;
  horario3: string;
  horario1Disp: string;
  horario2Disp: string;
  horario3Disp: string;
  isActive: string;
  expirationTime: string;

}
