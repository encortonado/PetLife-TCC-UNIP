export interface Schedule {
  id: string;
  clienteId: string;
  anuncianteId: string;
  anuncioId: string;
  userNameAnuncio: string;
  userNameCliente: string;
  petId: string;
  dataCadastro: string;
  data: string;
  horario: string;
  preco: string;
  formaPagamento: string;
  isActive: string;
  serviceName: string;
}

export class ScheduleDTO implements Schedule {
  id: string;
  clienteId: string;
  anuncianteId: string;
  anuncioId: string;
  userNameAnuncio: string;
  userNameCliente: string;
  petId: string;
  dataCadastro: string;
  data: string;
  horario: string;
  preco: string;
  formaPagamento: string;
  isActive: string;
  serviceName: string;

}
