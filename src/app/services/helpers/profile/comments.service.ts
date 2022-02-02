import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../../../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http: HttpClient) { }

  findByUserId(userId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.baseUrl}/getComentariosByUserId/${userId}`);
  }
}
