import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URL } from "../shared";

@Injectable({
  providedIn: "root"
})
export class SignUpService {
  constructor(private http: HttpClient) {}
  signUp(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/account/sign-up.php`, data);
  }
  addStaff(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/account/add-user.php`, data);
  }

}
