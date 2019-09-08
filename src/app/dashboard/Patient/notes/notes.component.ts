import { PatientService } from 'src/app/services';
import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"]
})
export class NotesComponent implements OnInit {
  @Input() Name;
  showAddNotes: boolean;
  notes$:Observable<Array<any>>;
  PatientId: string;
  p;
  searchText;
  constructor(private patientService:PatientService) {}

  ngOnInit() {
    this.patientService.castNotes.subscribe(r=>{
      this.PatientId = r;
      this.notes$  =  this.patientService.getPatientNotes(this.PatientId);
    })
  }
  closeModal(e: boolean) {
    this.notes$  =  this.patientService.getPatientNotes(this.PatientId);
    this.showAddNotes = e;
  }
  showModal(){
    this.showAddNotes= true;
  }
}
