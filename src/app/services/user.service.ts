import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

updateUser(data): Observable<any> {
  return this.http.post<any>(`${API_URL}/api/account/update-user.php`, data);
}
}
