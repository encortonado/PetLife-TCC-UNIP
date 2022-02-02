export interface Comment {
  id: string;
  userId: string;
  comentario: string;
  dataCadastro: string;
  clientName: string;
}

export class ComentarioDTO implements Comment {
  id: string;
  userId: string;
  comentario: string;
  dataCadastro: string;
  clientName: string;
}
