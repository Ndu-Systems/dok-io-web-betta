import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}
  addEmergencyContact(data): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/api/contactperson/add-contactperson.php`,
      data
    );
  }
  updateEmergencyContact(data): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/api/contactperson/update-contactperson.php`,
      data
    );
  }
  getPatientEmegencyContatct(PatientId): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/api/contactperson/get-contactperson.php?PatientId=${PatientId}`
    );
  }
}
