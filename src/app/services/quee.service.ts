import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QueeService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}
  addQuee(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/quee/add-quee.php`,data);
  }
  updateQuee(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/quee/update-que.php`,data);
  }
  getQuees(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/quee/get-quee.php`);
  }


}
