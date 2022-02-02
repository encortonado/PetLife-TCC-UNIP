import { Week } from './../../../models/week';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor(public http: HttpClient) {

  }

  getCurrentWeek(): Observable<Week> {
    return this.http.get<Week>(`${environment.baseUrl}/getCurrentWeek`);
  }

}
