import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class QueeService {

  constructor(private http: HttpClient) {}
  addQuee(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/quee/add-quee.php`,data);
  }
  updateQuee(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/quee/update-que.php`,data);
  }
  getQuees(): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/quee/get-quee.php`);
  }


}
