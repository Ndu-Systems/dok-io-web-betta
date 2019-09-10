import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  updateUser(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/account/update-user.php`, data);
  }
}
