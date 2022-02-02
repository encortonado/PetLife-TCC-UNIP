import { PetImageDTO } from './../../../models/pet-image';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserImage, UserImageDTO } from './../../../models/user-image';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public http: HttpClient) { }

  saveImage(userImage: UserImageDTO) {

    return this.http.post(`${environment.baseUrl}/saveUserImage`
      , userImage);
  }

  findByUserId(userId: string): Observable<UserImage> {
    return this.http.get<UserImage>(`${environment.baseUrl}/getUserImageByUserId/${userId}`);
  }

  savePetImage(petImage: PetImageDTO) {

    return this.http.post(`${environment.baseUrl}/savePetImage`
      , petImage);
  }

  findByPetId(petId: string): Observable<PetImageDTO> {
    return this.http.get<PetImageDTO>(`${environment.baseUrl}/getPetImageByPetId/${petId}`);
  }
}
