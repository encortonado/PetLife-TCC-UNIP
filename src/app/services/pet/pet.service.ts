import { Observable } from 'rxjs';
import { Pet } from './../../models/pet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(public http: HttpClient) { }

  savePet(pet: Pet) {

    console.log(pet);
    return this.http.post(`${environment.baseUrl}/savePet`
      , pet);
  }

  updatePet(pet: Pet) {

    return this.http.post(`${environment.baseUrl}/savePet`
      , pet);
  }

  findAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${environment.baseUrl}/getPets`);
  }

  findByUserId(userId: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${environment.baseUrl}/getPetByUserId/${userId}`);
  }

  deletePetById(id: string): Observable<string> {
    return this.http.get<string>(`${environment.baseUrl}/deletePet/${id}`);
  }
}
