import { SEND_ACC_VERIFICATION_EMAIL } from './../shared/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  constructor(private http: HttpClient) {}
  sendVerifyAcc(data): Observable<any> {
    return this.http.post<any>(
      SEND_ACC_VERIFICATION_EMAIL,
      data
    );
  }

}
