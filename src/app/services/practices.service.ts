import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {

  constructor(private http: HttpClient) {}


  addPractice(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/practice/add-practice.php`,data);
  }

  getPractices(userId): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/practice/get-practice.php?UserId=${userId}`);
  }

}
