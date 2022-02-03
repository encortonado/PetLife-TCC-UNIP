import { environment } from './../../../../environments/environment';
import { EndServiceDTO } from './../../../models/end-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuportService {

  constructor(public http: HttpClient) {

  }

  relatarProblema(service: EndServiceDTO) {
      return this.http.post(`${environment.baseUrl}/relatarProblema`
          , service);
  }

}
