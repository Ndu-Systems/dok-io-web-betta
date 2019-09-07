import { API_URL } from "src/app/shared";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { NotesComponent } from "../dashboard/Patient/notes/notes.component";

@Injectable({
  providedIn: "root"
})
export class PatientService {
 
  notes = new BehaviorSubject<string>('');
  castNotes = this.notes.asObservable();

  constructor(private http: HttpClient) {}

  castNextNotePatientId(id:string) {
    this.notes.next(id);
  }

  getPatients(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/patient/get-active-patients.php?docId=${id}`);
  }
  getArchived(): Observable<any> {
    return this.http.get<any>(`${API_URL}/api/patient/get-archived-patients.php`);
  }
  getPatient(id: string): Observable<any> {
    return this.http.get<any>(
      `${API_URL}/api/patient/get-patient.php?PatientId=${id}`
    );
  }
  addPatient(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/patient/add-patient.php`, data);
  }
  updatePatient(data): Observable<any> {
    return this.http.post<any>(
      `${API_URL}/api/patient/update-patient.php`,
      data
    );
  }
  addPatientNotes(data): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/notes/add-notes.php`, data);
  }
  getPatientNotes(id: string): Observable<any> {
    return this.http.get<any>(
      `${API_URL}/api/notes/get-notes.php?PatientId=${id}`
    );
  }
}
