import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MedicalaidService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}
  addMedicalaid(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/medicalaid/add-medicalaid.php`,data);
  }
  updateMedicalaid(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/medicalaid/update-medicalaid.php`,data);
  }
  getPatientMedicalAid(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/api/medicalaid/get-medicalaid.php?PatientId=${id}`
    );
  }
}
