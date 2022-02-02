import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { environment } from 'src/environments/environment';
import { EndServiceDTO } from 'src/app/models/end-service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(public http: HttpClient) { }

  save(agenda: Schedule) {
    return this.http.post(`${environment.baseUrl}/saveAgenda`
      , agenda);
  }

  findByClienteId(clienteId: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${environment.baseUrl}/getAgendaByUserId/${clienteId}`);
  }

  findByAnuncianteId(clienteId: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${environment.baseUrl}/getAgendaByAnuncianteId/${clienteId}`);
  }

  finalizarAnuncio(service: EndServiceDTO) {
    return this.http.post(`${environment.baseUrl}/finalizarAnuncio`
      , service);
  }

}
