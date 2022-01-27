import { Observable } from 'rxjs';
import { Address } from './../../models/address';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  resultado: Address;
  endereco: Address;
  constructor(private http: HttpClient) { }

  buscar(cep: string): Observable<Address> {
    return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
