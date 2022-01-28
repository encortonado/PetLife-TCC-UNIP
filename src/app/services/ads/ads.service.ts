import { Observable } from 'rxjs';
import { Ads } from './../../models/ads';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient) { }

  novoAnuncio(anuncio: Ads) {

    return this.http.post(`${environment.baseUrl}/novoAnuncio`
      , anuncio);
  }

  atualizarAnuncio(anuncio: Ads) {

    return this.http.post(`${environment.baseUrl}/updateAnuncio`
      , anuncio);
  }

  findAll(): Observable<Ads[]> {
    return this.http.get<Ads[]>(`${environment.baseUrl}/getAnuncios`);
  }

  findAllWithParameters(cidade: string, servico: string): Observable<Ads[]> {

    let params = new HttpParams();
    params = params.append('cidade', cidade);
    params = params.append('servico', servico);

    return this.http.get<Ads[]>(`${environment.baseUrl}/getAnunciosByCityAndService`, { params });
  }

  findByUserId(userId: string): Observable<Ads[]> {
    return this.http.get<Ads[]>(`${environment.baseUrl}/getAnunciosByUserId/${userId}`);
  }

  deleteAnuncioById(id: string): Observable<string> {
    return this.http.get<string>(`${environment.baseUrl}/deleteAnuncio/${id}`);
  }

}
