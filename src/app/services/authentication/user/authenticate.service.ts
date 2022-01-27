import { environment } from './../../../../environments/environment';
import { AuthenticateResponse } from './../../../models/authenticate-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authenticate } from '../../../models/authenticate';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(public http: HttpClient) { }

  autenticar(auth: Authenticate) {
    return this.http.post<AuthenticateResponse[]>(`${environment.baseUrl}/authentication/login`,
      auth,
      {
        headers: new HttpHeaders({
          'content-type': 'application/json'
        })
      });
  }
}
