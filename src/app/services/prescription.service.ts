import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  getPatientPrescriptions(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/prescription/get-patient-prescriptions.php?PatientId=${id}`);
  }
  getPrescriptionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/prescription/get-prescription-byId.php?PrescriptionId=${id}`);
  }
  getMedications(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/api/medication/get-medications.php`);
  }
  addMedication(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/medication/add-medication.php`,data);
  }
  addMedicationRange(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/medication/add-medication-range.php`,data);
  }
  addPrescription(data): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/api/prescription/add-prescription-for-patient.php`,data);
  }
}
