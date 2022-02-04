import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PetImage } from '../../models/pet.image';
import { UserImage } from '../../models/user.image';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public http: HttpClient) {

  }

  saveImage(userImage: UserImage) {

    return this.http.post(`${environment.baseUrl}/saveUserImage`
      , userImage);
  }

  findByUserId(userId: string): Observable<UserImage> {
    return this.http.get<UserImage>(`${environment.baseUrl}/getUserImageByUserId/${userId}`);
  }

  savePetImage(petImage: PetImage) {

    return this.http.post(`${environment.baseUrl}/savePetImage`
      , petImage);
  }

  findByPetId(petId: string): Observable<PetImage> {
    return this.http.get<PetImage>(`${environment.baseUrl}/getPetImageByPetId/${petId}`);
  }

}