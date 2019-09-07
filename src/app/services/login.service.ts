 import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { API_URL, CURRENT_USER } from "src/app/shared";
import { map } from "rxjs/operators";
import { User } from "src/app/models";
@Injectable({
  providedIn: "root"
})
export class LoginService {
  url = API_URL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(CURRENT_USER))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public loginUser(Email: string, Password: string): Observable<any> {
    const data = {
      email: Email,
      password: Password
    };
    const reqheaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient
      .post<any>(this.url + "/api/login/login-user.php", JSON.stringify(data), {
        headers: reqheaders
      })
      .pipe(
        map(user => {
          if (user && user.Role) {
            localStorage.setItem(CURRENT_USER, JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(CURRENT_USER);
    this.currentUserSubject.next(null);
  }
  public get getUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER));
  }
  setUser(val) {
    this.currentUserSubject.next(val);
  }
  getFullUserDetails(UserId) {
    return this.httpClient.get<any>(
      `${this.url}/api/account/get-user.php?UserId=${UserId}`
    );
  }

  getUserByParentId(UserId) {
    return this.httpClient.get<any>(
      `${this.url}/api/account/get-user-by-parent-id.php?UserId=${UserId}`
    );
  }
}
