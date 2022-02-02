export interface EndService {
  agendaId: string;
  anuncianteId: string;
  comentario: string;
  userReported: string;
  userReporter: string;
}

export class EndServiceDTO implements EndService {
  agendaId: string;
  anuncianteId: string;
  comentario: string;
  userReported: string;
  userReporter: string;
}
