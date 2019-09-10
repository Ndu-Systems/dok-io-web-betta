import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticesService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}


  addPractice(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/practice/add-practice.php`,data);
  }

  getPractices(userId): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/practice/get-practice.php?UserId=${userId}`);
  }

}
