import { AdvertiserPet } from './../../../models/advertiser-pet';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { User } from './../../../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
     * Busca usuario e pet pelo id
     */
  findUserAndPetById(anuncianteId: string, petId: string, clienteId: string): Observable<AdvertiserPet> {
    return this.http.get<AdvertiserPet>(`${environment.baseUrl}/findUserAndPetById/${anuncianteId}/${petId}/${clienteId}`);
  }

  /**
     * Busca todas as Cidades
     */
  findAllCities(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/getAllCities`);
  }

  /**
     * Registra um novo usuario na aplicação
     */
  registrar(user: User) {

    return this.http.post(`${environment.baseUrl}/registrar`,
      user,
      {
        headers: new HttpHeaders({
          'content-Type': 'application/json'
        })
      });
  }

  /**
     * atualiza os dados de um usuario na aplicação
     */
  update(user: User) {

    return this.http.post(`${environment.baseUrl}/update`,
      user,
      {
        headers: new HttpHeaders({
          'content-Type': 'application/json'
        })
      });
  }

  /**
     * Busca um usuario pelo email fornecido
     */
  findUserByEmail(email: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/findUserByEmail`
      ,
      email,
      {
        headers: new HttpHeaders({
          'content-Type': 'application/json'
        })
      });
  }

  /**
     * Busca um usuario pelo id fornecido
     */
  findUserById(userId: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/findUserById`
      ,
      userId,
      {
        headers: new HttpHeaders({
          'content-Type': 'application/json'
        })
      });
  }

  /**
     * Busca um usuario pelo email buscando pelo metodo findBy ID fornecido
     */
  findUser(email: string): Observable<User> {
    return this.findUserByEmail(email);
  }
}
