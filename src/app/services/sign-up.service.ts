import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}
  signUp(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/account/sign-up.php`, data);
  }
  addStaff(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/account/add-user.php`, data);
  }

}
